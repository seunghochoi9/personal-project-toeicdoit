package com.erichgamma.api.article.service;

import com.erichgamma.api.article.model.Article;
import com.erichgamma.api.article.repository.ArticleRepository;
import com.erichgamma.api.article.model.ArticleDto;
import com.erichgamma.api.board.repository.BoardRepository;
import com.erichgamma.api.common.component.MessengerVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Log4j2
@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {
    private final ArticleRepository repo;


    @Override
    public MessengerVo save(ArticleDto dto) {
        log.info("Article save Impl: {}", dto);
        Article result = repo.save(dtoToEntity(dto));
        System.out.println((result instanceof Article) ? "SUCCESS" : "FAILURE");
        return MessengerVo.builder()
                .message((result instanceof Article) ? "SUCCESS" : "FAILURE")
                .boardId(dto.getBoardId())
                .build();
    }

    @Override
    public MessengerVo deleteById(Long id) {
        return MessengerVo.builder()
                .message(
                        Stream.of(id)
                                .filter(i -> existsById(i))
                                .peek(i -> repo.deleteById(i))
                                .map(i -> "SUCCESS")
                                .findAny()
                                .orElseGet(() -> "FAILURE"))
                .build();
    }

    @Override
    public MessengerVo modify(ArticleDto dto) {
        Article ent = repo.save(dtoToEntity(dto));
        System.out.println("============ BoardServiceImpl modify instanceof ===========");
        System.out.println((ent instanceof Article) ? "SUCCESS" : "FAILURE");
        return MessengerVo.builder()
                .message((ent instanceof Article) ? "SUCCESS" : "FAILURE")
                .build();
    }

    @Override
    public List<ArticleDto> findAll() {
        return repo.findAll().stream().map(i -> entityToDto(i)).toList();
    }

    @Override
    public Optional<ArticleDto> findById(Long id) {
        return repo.findById(id).map(i -> entityToDto(i));
    }

    @Override
    public MessengerVo count() {
        return MessengerVo.builder()
                .message(repo.count() + "")
                .build();
    }

    @Override
    public Boolean existsById(Long id) {
        return repo.existsById(id);
    }

    public List<ArticleDto> getArticlesByBoardId(Long boardId){
        return repo.getArticlesByBoardId(boardId).stream().map(i -> entityToDto(i)).toList();
    }
}
