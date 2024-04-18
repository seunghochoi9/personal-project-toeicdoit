package com.erichgamma.api.user.repository;

import com.erichgamma.api.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findUserByUsername(String username);
    List<User> findUsersByName(String name);
    List<User> findUsersByJob(String job);

}
