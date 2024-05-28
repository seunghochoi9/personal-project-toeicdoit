package com.erichgamma.api.article.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ArticleDto {
    private Long id;
    private String title;
    private String content;
    private String registerDate;
    private Long writer;
    private String writerUsername;
    private Long boardId;
    private String boardContent;
    private String regDate;
    private String modDate;
}
