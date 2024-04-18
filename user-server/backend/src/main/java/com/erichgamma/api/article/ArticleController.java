package com.erichgamma.api.article;

import com.erichgamma.api.article.model.ArticleDto;
import com.erichgamma.api.article.repository.ArticleRepository;
import com.erichgamma.api.article.service.ArticleService;
import com.erichgamma.api.article.service.ArticleServiceImpl;
import com.erichgamma.api.common.component.MessengerVo;
import com.erichgamma.api.common.component.PageRequestVo;
import com.erichgamma.api.common.service.AbstractService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
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

    @PostMapping("/save")
    public ResponseEntity<MessengerVo> save(@RequestBody ArticleDto dto){
        log.info("save article: {}", dto);
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
    public ResponseEntity<Optional<ArticleDto>> findById(@RequestParam Long id){
        return ResponseEntity.ok(service.findById(id));
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