package com.example.BookLibrary.repository;

import com.example.BookLibrary.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BookRepository extends MongoRepository<Book, String> {
    List<Book> findByUserId(String userId); // ✅ Find books by user
}
