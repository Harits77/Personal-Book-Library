# 📚 Personal Book Library - MERN + Google Books API

## 📋 Summary

**Personal Book Library** is a full-stack web application that helps users search, save, and manage their personal book collection. It integrates the **Google Books API** to fetch book data and allows users to store their favorite books in a custom library.

Built using the **MongoDB, Java Springboot , Next Js, Tailwind CSS**, this app demonstrates CRUD operations, API integration, and clean UI practices.

---

## 🚀 Features

- 🔍 Search for books using Google Books API
- ➕ Add books to personal library
- ❌ Remove books from library
- 📚 View saved books with cover, title, and author
- 🎨 Clean, responsive UI with reusable components

---

## 🛠️ Tech Stack

| Layer     | Technology             |
|-----------|------------------------|
| Frontend  | Next Js, Tailwind CSS  |
| Backend   | Springboot             |
| Database  | MongoDB                |
| API       | Google Books API       |

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/Harits77/Personal-Book-Library.git
cd Personal-Book-Library

cd backend
# If using Maven
./mvnw spring-boot:run

# OR if using Gradle
./gradlew bootRun

#Configure your MongoDB connection in application.properties:
spring.data.mongodb.uri=mongodb://localhost:27017/librarydb


# Install frontend dependencies
cd ../frontend
npm install
npm run dev

