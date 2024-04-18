package com.erichgamma.api.article.model;

import com.erichgamma.api.board.model.Board;
import com.erichgamma.api.common.model.BaseEntity;
import com.erichgamma.api.user.model.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.extern.log4j.Log4j2;


@Log4j2
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@ToString(exclude = {"id"})
@Entity(name = "articles")
public class Article extends BaseEntity {
    @Id
    @Column(name ="id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id")
    private User writer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;
}