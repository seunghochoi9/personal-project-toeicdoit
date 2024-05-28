package com.erichgamma.api.article.service;

import com.erichgamma.api.article.model.Article;
import com.erichgamma.api.article.model.ArticleDto;
import com.erichgamma.api.board.model.Board;
import com.erichgamma.api.common.service.CommandService;
import com.erichgamma.api.common.service.QueryService;
import com.erichgamma.api.user.model.User;

import java.util.List;

public interface ArticleService extends CommandService<ArticleDto>, QueryService<ArticleDto> {

    default Article dtoToEntity(ArticleDto dto) {
        return Article.builder()
                .board(Board.builder().id(dto.getBoardId()).build())
                .writer(User.builder().id(dto.getWriter()).build())
                .title(dto.getTitle())
                .content(dto.getContent())
                .build();
    }

    default ArticleDto entityToDto(Article entity){
        return ArticleDto.builder()
                .id(entity.getId())
                .boardId(entity.getBoard().getId())
                .title(entity.getTitle())
                .content(entity.getContent())
                .writerUsername(entity.getWriter().getUsername())
                .boardContent(entity.getBoard().getContent())
                .registerDate(entity.getRegDate().toString())
                .modDate(entity.getModDate().toString())
                .build();
    }

    List<ArticleDto> getArticlesByBoardId(Long boardId);

}
