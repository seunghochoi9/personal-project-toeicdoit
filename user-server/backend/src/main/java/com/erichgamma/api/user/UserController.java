package com.erichgamma.api.user;

import java.util.*;

import com.erichgamma.api.common.component.MessengerVo;
import com.erichgamma.api.common.component.PageRequestVo;
import com.erichgamma.api.user.model.UserDto;
import com.erichgamma.api.user.repository.UserRepository;
import com.erichgamma.api.user.service.UserService;
import com.erichgamma.api.user.service.UserServiceImpl;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.log4j.Log4j2;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")})
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RequestMapping(path = "/api/users")
@Log4j2
public class UserController {
    private final UserServiceImpl service;

    @SuppressWarnings("static-access")
    @PostMapping( "/save")
    public ResponseEntity<MessengerVo> save(@RequestBody UserDto dto) {
        return ResponseEntity.ok(service.save(dto));

    }
    @GetMapping("/list")
    public ResponseEntity<List<UserDto>> findAll(PageRequestVo vo){
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/detail")
    public ResponseEntity<Optional<UserDto>> findById(@RequestParam Long id) {
        return ResponseEntity.ok(service.findById(id));
    }
    @PutMapping("/modify")
    public ResponseEntity<MessengerVo> modify(@RequestBody UserDto param) {
        return ResponseEntity.ok(service.modify(param));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<MessengerVo> deleteById(@RequestParam Long id) {
        return ResponseEntity.ok(service.deleteById(id));
    }
    @GetMapping("/count")
    public ResponseEntity<MessengerVo> count() {
        return ResponseEntity.ok(service.count());
    }

    @PostMapping("/search")
    public ResponseEntity<List<UserDto>> findUsersByName(@RequestBody UserDto param) {
        return ResponseEntity.ok(service.findUsersByName(param.getName()));
    }

    @PostMapping(path = "/login")
    public ResponseEntity<MessengerVo> login(@RequestBody UserDto dto) {
        log.info(dto);
        return ResponseEntity.ok(service.login(dto));
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> existsById(@RequestParam("id") long id) {
        return ResponseEntity.ok(service.existsById(id));
    }

    @GetMapping("/exists-username")
    public ResponseEntity<MessengerVo> existsByUsername(@RequestParam("username") String username) {
        log.info("cont" + username);
        return ResponseEntity.ok(service.existsByUsername(username));
    }
}
