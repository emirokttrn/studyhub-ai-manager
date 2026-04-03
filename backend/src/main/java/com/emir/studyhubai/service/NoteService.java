package com.emir.studyhubai.service;

import com.emir.studyhubai.dto.NoteRequest;
import com.emir.studyhubai.dto.NoteResponse;
import com.emir.studyhubai.entitiy.Note;
import com.emir.studyhubai.exception.NoteNotFoundException;
import com.emir.studyhubai.mapper.NoteMapper;
import com.emir.studyhubai.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository noteRepository;
    private final NoteMapper noteMapper;

    public NoteResponse createNote(NoteRequest request) {
        Note note = noteMapper.toEntity(request);
        note.setCreatedAt(LocalDateTime.now());
        note.setUpdatedAt(LocalDateTime.now());

        Note savedNote = noteRepository.save(note);
        return noteMapper.toResponse(savedNote);
    }

    public List<NoteResponse> getAllNotes() {
        List<Note> notes = noteRepository.findAll();
        return notes.stream()
                .map(noteMapper::toResponse)
                .toList();
    }

    public NoteResponse getNoteById(Long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException(id));
        return noteMapper.toResponse(note);
    }

    public NoteResponse updateNote(Long id, NoteRequest request) {
        Note existingNote = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException(id));

        noteMapper.updateNoteFromRequest(request, existingNote);
        existingNote.setUpdatedAt(LocalDateTime.now());

        Note updatedNote = noteRepository.save(existingNote);
        return noteMapper.toResponse(updatedNote);
    }

    public void deleteNote(Long id) {
        Note note = noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException(id));
        noteRepository.delete(note);
    }
}