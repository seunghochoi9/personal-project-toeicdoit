package com.erichgamma.api.article;

import com.erichgamma.api.article.model.Article;
import com.erichgamma.api.article.model.ArticleDto;
import com.erichgamma.api.article.repository.ArticleRepository;
import com.erichgamma.api.article.service.ArticleService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class ArticleServiceImplTest {
    private ArticleService service;
    @Mock
    private ArticleRepository repository;

    @BeforeEach
    void setup() {
//        this.service = new ArticleServiceImplTest(repository);
    }


    @BeforeEach
    void init(){    }
    @Test
    public void 사용자_전체_검색()throws Exception {

        List<Article> articles = getList();
        BDDMockito.given(repository.findAll()).willReturn(articles);
        List<ArticleDto> list = service.findAll();
        assertThat(list.size())
                .isEqualTo(3);

        // verify(repository, times(1)).findById(1L);
        // verify(repository, never()).findAll();
        // verifyNoInteractions(repository);
    }


    private List<Article> getList() {
        return Arrays.asList(
                Article.builder().id(1L).content("yoo").title("유관순").build(),
                Article.builder().id(2L).content("kim").title("김구").build(),
                Article.builder().id(3L).content("lee").title("이화림").build()
        );
    }
    }
