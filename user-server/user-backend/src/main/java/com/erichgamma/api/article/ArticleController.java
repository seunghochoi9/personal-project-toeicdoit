package com.erichgamma.api.article;

import com.erichgamma.api.article.model.ArticleDto;
import com.erichgamma.api.article.service.ArticleServiceImpl;
import com.erichgamma.api.common.component.MessengerVo;
import com.erichgamma.api.common.component.security.JwtProvider;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/articles")
@ApiResponses(value = {
        @ApiResponse(responseCode = "400", description = "Invalid ID supplied"),
        @ApiResponse(responseCode = "404", description = "Customer not found")})
@Log4j2
public class ArticleController {

    private final ArticleServiceImpl service;
    private final JwtProvider jwtProvider;

    @PostMapping("/save")
    public ResponseEntity<MessengerVo> save(@RequestBody ArticleDto dto){
        log.info("article save con: {}", dto);
        return ResponseEntity.ok(service.save(dto));
    }

    @PutMapping("/modify")
    public ResponseEntity<MessengerVo> modify(@RequestBody  ArticleDto articleDto) {
        return ResponseEntity.ok(service.modify(articleDto));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<MessengerVo> deleteById(@RequestParam Long id){
        return ResponseEntity.ok(service.deleteById(id));
    }

    @GetMapping("/detail")
    public ResponseEntity<Optional<ArticleDto>> findById(@RequestHeader("Authorization")  String accessToken){
        log.info("article findById 토큰: {}", accessToken);
        String noBearerToken = accessToken.substring(7);
        log.info("article findById noBearerToken: " + noBearerToken);
        Long id = jwtProvider.getPayload(noBearerToken).get("id", Long.class);
        log.info("article findById id: " + id);
//        ResponseEntity.ok(service.findById(id));
        return null;
    }

    @GetMapping("/count")
    public ResponseEntity<MessengerVo> count(){
        return ResponseEntity.ok(service.count());
    }

    @GetMapping("/exists")
    public ResponseEntity<Boolean> existsById(@RequestParam Long id){

        return ResponseEntity.ok(service.existsById(id));
    }

    @GetMapping("/list")
    public ResponseEntity<List<ArticleDto>> getArticlesByBoardId(@RequestParam("id") Long boardId){
        return ResponseEntity.ok(service.getArticlesByBoardId(boardId));
    }

//    @GetMapping("/findByBoardId")
//    public ResponseEntity<List<ArticleDto>> findByBoardId(@RequestParam Long id){
//        return ResponseEntity.ok(service.findByBoardId(id));
//    }

}