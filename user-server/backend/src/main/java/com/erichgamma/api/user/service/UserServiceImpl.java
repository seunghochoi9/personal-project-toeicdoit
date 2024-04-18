package com.erichgamma.api.user.service;


import com.erichgamma.api.common.component.JwtProvider;
import com.erichgamma.api.common.component.MessengerVo;
import com.erichgamma.api.user.model.User;
import com.erichgamma.api.user.model.UserDto;
import com.erichgamma.api.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
@Log4j2
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository repository;
    private final JwtProvider jwt;

    @Override
    public MessengerVo save(UserDto dto) {
        User ent = repository.save(dtoToEntity(dto));
        System.out.println(" ============ UserServiceImpl save instanceof =========== ");
        System.out.println((ent instanceof User) ? "SUCCESS" : "FAILURE");
        return MessengerVo.builder()
                .message((ent instanceof User) ? "SUCCESS" : "FAILURE")
                .build();
    }

    @Override
    public MessengerVo deleteById(Long id) {
        repository.deleteById(id);
        return MessengerVo.builder()
                .message(repository.findById(id).isPresent() ? "SUCCESS" : "FAILURE")
                .build();
    }

    @Override
    public List<UserDto> findAll() {
        return repository.findAll().stream().map(i->entityToDto(i)).toList();
    }
    @Override
    public Optional<UserDto> findById(Long id) {
        return repository.findById(id).map(i -> entityToDto(i));
    }

    @Override
    public MessengerVo count() {
        return MessengerVo.builder()
                .message(repository.count()+"")
                .build();
    }
    @Override
    public Boolean existsById(Long id) {
        return repository.existsById(id);
    }

    @Override
    public MessengerVo modify(UserDto dto) {
        User ent = repository.save(dtoToEntity(dto));
        log.info(" ============ BoardServiceImpl modify Entity =========== ");
        log.info(ent);
        System.out.println((ent instanceof User) ? "SUCCESS" : "FAILURE");
        return MessengerVo.builder()
                .message((ent instanceof User) ? "SUCCESS" : "FAILURE")
                .build();
    }

    @Override
    public List<UserDto> findUsersByName(String name) {
        return repository.findUsersByName(name).stream().map(i->entityToDto(i)).toList();
    }

    @Override
    public List<UserDto> findUsersByJob(String job) {
        return repository.findUsersByJob(job).stream().map(i->entityToDto(i)).toList();
    }

    @Override
    public Optional<User> findUserByUsername(String username) {
        return repository.findUserByUsername(username);
    }

    // SRP에 따라 아이디 존재여부를 프론트에서 먼저 판단하고 넘어옴(시큐리티 SOLID 5대 원칙)
    // findUserByUsername(dto.getUsername()).get().getPassword().equals(dto.getPassword())?"S":"F"
    @Override
    public MessengerVo login(UserDto dto) {
        boolean flag = repository.findUserByUsername(
                dto.getUsername()).get().getPassword().equals(dto.getPassword());
        return MessengerVo.builder()
                .message(flag ? "SUCCESS" : "FAILURE")
                .token(flag ? jwt.createToken(dto) : "None")
                .build();
    }

}
