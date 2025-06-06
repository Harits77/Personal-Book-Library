"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type GoogleBook = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: { thumbnail?: string };
    previewLink?: string;
  };
};

type SavedBook = {
  id: string;
  title: string;
  author: string;
  thumbnail?: string;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GoogleBook[]>([]);
  const [library, setLibrary] = useState<SavedBook[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingLibrary, setLoadingLibrary] = useState(false);
  const [errorSearch, setErrorSearch] = useState("");
  const [errorLibrary, setErrorLibrary] = useState("");
  const router = useRouter();

  const searchBooks = async () => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setLoadingSearch(true);
    setErrorSearch("");
    try {
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      setSearchResults(res.data.items || []);
    } catch (err) {
      console.error("Search error:", err);
      setErrorSearch("Failed to fetch search results. Please try again.");
      setSearchResults([]);
    } finally {
      setLoadingSearch(false);
    }
  };

  const fetchLibrary = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/");
      return;
    }
    setLoadingLibrary(true);
    setErrorLibrary("");
    try {
      const res = await axios.get(`http://localhost:7081/api/library/${userId}`);
      setLibrary(res.data);
    } catch (err) {
      console.error("Library fetch error:", err);
      setErrorLibrary("Failed to load your library. Please try again.");
      setLibrary([]);
    } finally {
      setLoadingLibrary(false);
    }
  };

  const saveBook = async (book: GoogleBook) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in to save books.");
      router.push("/"); // Suggest redirecting to login more clearly
      return;
    }

    const data = {
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors?.[0] || "Unknown",
      thumbnail: book.volumeInfo.imageLinks?.thumbnail || "",
    };

    try {
      await axios.post(`http://localhost:7081/api/library/${userId}`, data);
      await fetchLibrary(); // Refresh library after saving
    } catch (err) {
      console.error("Save book error:", err);
      alert("Failed to save book. It might already be in your library.");
    }
  };

  const deleteBook = async (id: string) => {
    try {
      await axios.delete(`http://localhost:7081/api/library/${id}`);
      await fetchLibrary(); // Refresh library after deleting
    } catch (err) {
      console.error("Delete book error:", err);
      alert("Failed to delete book. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId"); // Clear login info
    router.push("/"); // Redirect to login page, not just "/"
  };

  useEffect(() => {
    fetchLibrary();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-400">
          📚 My Personal Book Library
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          🚪 Logout
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-10 flex flex-col sm:flex-row items-center gap-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchBooks()}
          className="flex-grow bg-gray-800 text-gray-200 border border-gray-700 rounded-lg px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out text-base w-full sm:w-auto"
          placeholder="Search for books by title or author..."
        />
        <button
          onClick={searchBooks}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 w-full sm:w-auto"
          disabled={loadingSearch}
        >
          {loadingSearch ? "Searching..." : "🔍 Search"}
        </button>
      </div>

      {/* Search Results Section */}
      <section className="mb-12 bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-6 flex items-center">
          <span className="mr-3">📚</span> Search Results
        </h2>
        {errorSearch && <p className="text-red-500 text-center mb-4">{errorSearch}</p>}
        {searchResults.length === 0 && !loadingSearch && !errorSearch && query.trim() && (
          <p className="text-gray-400 text-center py-4">No results found for "{query}". Try a different search term.</p>
        )}
        {searchResults.length === 0 && !query.trim() && !loadingSearch && !errorSearch && (
          <p className="text-gray-400 text-center py-4">Start typing to search for books.</p>
        )}
        {loadingSearch ? (
          <div className="text-center text-blue-400 py-4">Loading search results...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((book) => (
              <div
                key={book.id}
                className="bg-gray-700 rounded-lg shadow-md overflow-hidden flex flex-col transform hover:scale-105 transition duration-200 ease-in-out"
              >
                {book.volumeInfo.imageLinks?.thumbnail && (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={`${book.volumeInfo.title} cover`}
                    className="w-full h-48 object-cover object-center"
                  />
                )}
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-1 leading-tight">
                      {book.volumeInfo.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      by {book.volumeInfo.authors?.[0] || "Unknown Author"}
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => saveBook(book)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-700 min-w-[100px]"
                    >
                      Save
                    </button>
                    {book.volumeInfo.previewLink && (
                      <a
                        href={book.volumeInfo.previewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-sm font-medium py-2 px-3 rounded-md text-center transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-700 min-w-[100px]"
                      >
                        Preview
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* My Library Section */}
      <section className="bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-6 flex items-center">
          <span className="mr-3">📖</span> My Library
        </h2>
        {errorLibrary && <p className="text-red-500 text-center mb-4">{errorLibrary}</p>}
        {loadingLibrary ? (
          <div className="text-center text-blue-400 py-4">Loading your library...</div>
        ) : library.length === 0 ? (
          <p className="text-gray-400 text-center py-4">Your library is empty. Start by saving books from the search results!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {library.map((book) => (
              <div
                key={book.id}
                className="bg-gray-700 rounded-lg shadow-md overflow-hidden flex flex-col transform hover:scale-105 transition duration-200 ease-in-out"
              >
                {book.thumbnail && (
                  <img
                    src={book.thumbnail}
                    alt={`${book.title} cover`}
                    className="w-full h-48 object-cover object-center"
                  />
                )}
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-1 leading-tight">
                      {book.title}
                    </h3>
                    <p className="text-gray-400 text-sm">by {book.author}</p>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => deleteBook(book.id)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-700"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}