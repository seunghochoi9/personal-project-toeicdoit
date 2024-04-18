package com.erichgamma.api.common.component;


import com.erichgamma.api.user.model.UserDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Log4j2
@Component
public class JwtProvider {
    private String issuer;
    private Long expiration;
    private final SecretKey secretKey;
    Instant expiredDate = Instant.now().plus(1, ChronoUnit.DAYS);
    public JwtProvider(@Value("${jwt.secret}")String secretKey){
        this.secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    }

    public String createToken(UserDto dto) {
        String token = Jwts.builder()
                .signWith(secretKey)
                .expiration(Date.from(expiredDate))
                .subject("erichgamma")
                .claim("username", dto.getUsername())
                .claim("job", dto.getJob())
                .claim("userId", dto.getId())
                .compact();
        log.info("로그인 성공으로 발급된 토큰: " + token);
        return token;
    }
}
