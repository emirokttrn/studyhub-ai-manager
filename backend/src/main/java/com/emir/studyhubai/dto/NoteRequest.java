package com.emir.studyhubai.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoteRequest {

    @NotBlank(message = "Title bos ola bilmez")
    private String title;

    @NotBlank(message = "Content bos ola bilmez")
    private String content;
}