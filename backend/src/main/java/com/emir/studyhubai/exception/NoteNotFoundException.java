package com.emir.studyhubai.exception;

public class NoteNotFoundException extends RuntimeException {
    public NoteNotFoundException(Long id) {
        super("Not bulunamadı. Id: " + id);
    }
}