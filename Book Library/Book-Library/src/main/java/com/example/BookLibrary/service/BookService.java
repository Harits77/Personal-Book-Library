package com.example.BookLibrary.service;

import com.example.BookLibrary.model.Book;
import com.example.BookLibrary.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository repo;

    // Get all books by user
    public List<Book> getBooksByUser(String userId) {
        return repo.findByUserId(userId);
    }

    // Save a book
    public Book save(Book book) {
        return repo.save(book);
    }

    // Delete book by ID
    public void delete(String id) {
        repo.deleteById(id);
    }
}
