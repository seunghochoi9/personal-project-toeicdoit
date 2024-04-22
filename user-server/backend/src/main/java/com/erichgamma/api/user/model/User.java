package com.erichgamma.api.user.model;

import com.erichgamma.api.article.model.Article;
import com.erichgamma.api.common.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Entity(name = "users")
@ToString(exclude = {"id"})
public class User extends BaseEntity {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long addressId;
    private String username;
    private String password;
    private String name;
    private String phone;
    private String job;
    private String accessToken;

    @OneToMany(mappedBy = "writer", fetch = FetchType.LAZY)
    private List<Article> articlesId;

}
