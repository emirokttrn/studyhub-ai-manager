package com.emir.studyhubai.mapper;

import com.emir.studyhubai.dto.NoteRequest;
import com.emir.studyhubai.dto.NoteResponse;
import com.emir.studyhubai.entitiy.Note;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface NoteMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Note toEntity(NoteRequest request);

    NoteResponse toResponse(Note note);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateNoteFromRequest(NoteRequest request, @MappingTarget Note note);
}