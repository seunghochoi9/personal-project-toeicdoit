package com.erichgamma.api.board.model;

import com.erichgamma.api.article.model.Article;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class BoardDto {
    private Long id;
    private String title;
    private String description;
    private String regDate;
    private String modDate;
    private List<Article> articles;
}
