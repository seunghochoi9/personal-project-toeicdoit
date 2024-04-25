package com.erichgamma.api.article.repository;

import com.erichgamma.api.article.model.Article;
import com.erichgamma.api.article.model.ArticleDto;
import com.erichgamma.api.board.model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

String article = "new com.erichgamma.api.article.model.ArticleDto("+
        "a.id, a.title, a.content, a.writer.username, a.board.id, a.regDate, a.modDate)";

//JPQL Default
    @Query("select a from articles a where a.board.id = :boardId ORDER BY a.id desc")
    List<Article> getArticlesByBoardId(@Param("boardId") Long boardId);


//Native
//    @Query("select * from articles a where a.board.id = 1", nativeQuery = true)
//    List<Map<String, Object>>getQnaByArticles(); //Review 카테코리 값 1


//JPSQL Return Type DTO
    @Query("select "+article+" from articles a where a.board.id = :boardId")
    List<ArticleDto> getArticlesDTOByBoardId(@Param("boardId") Long boardId);

    List<Article> findAllByOrderByIdDesc();
}
