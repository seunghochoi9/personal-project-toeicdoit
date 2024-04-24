package com.erichgamma.api.user.repository;

import com.erichgamma.api.article.model.Article;
import com.erichgamma.api.common.component.MessengerVo;
import com.erichgamma.api.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findUserByUsername(String username);
    List<User> findUsersByName(String name);
    List<User> findUsersByJob(String job);

    @Modifying
    @Query("update users set accessToken =:accessToken where id =:id" )
    void modifyTokenByToken(@Param("id") Long id, @Param("accessToken") String accessToken);

    @Query("select a from users a where a.username =:username" )
    User existsByUsername(@Param("username") String username);
}
