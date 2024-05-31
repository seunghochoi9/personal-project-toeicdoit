package site.toeicdoit.api.user.model;

import site.toeicdoit.api.article.model.ArticleModel;
import site.toeicdoit.api.common.model.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Entity(name = "users")
@ToString(exclude = {"id"})
public class UserModel extends BaseEntity {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;
    private String name;
    private String phone;
    private String addressId;
    private String job;
    private String accessToken;

    @OneToMany(mappedBy = "userId", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ArticleModel> articles;

}
