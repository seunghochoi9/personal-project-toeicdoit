package com.erichgamma.api.common.component.security;


import com.erichgamma.api.user.model.UserDto;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
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
        log.info("createToken: " + token);
        return token;
    }

    public String extractTokenFromHeader(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public String getPayload(String accessToken) {
        String[] chunks = accessToken.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        String header = new String(decoder.decode(chunks[0]));
        String payload = new String(decoder.decode(chunks[1]));

        // DB에 토큰 넣는 로그
//        repository.modifyTokenByToken(user.getId(), accessToken);

        log.info("accessToken header: " + header);
        log.info("accessToken payload: " + payload);
//        return new StringBuilder().append(header).append(payload).toString();
        return payload;
    }
}
