package com.example.BookLibrary.controller;

import com.example.BookLibrary.model.Book;
import com.example.BookLibrary.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/library")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    @Autowired
    private BookService bookService;

    // Get all books by user
    @GetMapping("/{userId}")
    public List<Book> getBooksByUser(@PathVariable String userId) {
        return bookService.getBooksByUser(userId);
    }

    // Save book with userId
    @PostMapping("/{userId}")
    public ResponseEntity<Book> addBook(@PathVariable String userId, @RequestBody Book book) {
        book.setUserId(userId); // Set userId before saving
        return ResponseEntity.status(HttpStatus.CREATED).body(bookService.save(book));
    }

    // Delete book by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) {
        bookService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
