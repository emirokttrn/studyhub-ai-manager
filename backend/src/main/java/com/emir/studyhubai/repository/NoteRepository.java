package com.emir.studyhubai.repository;

import com.emir.studyhubai.entitiy.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note, Long> {
}