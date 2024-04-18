package com.erichgamma.api.board.service;

import com.erichgamma.api.board.model.Board;
import com.erichgamma.api.board.model.BoardDto;
import com.erichgamma.api.common.service.CommandService;
import com.erichgamma.api.common.service.QueryService;

import java.util.Optional;


public interface BoardService extends CommandService<BoardDto>, QueryService<BoardDto> {
    default Board dtoToEntity(BoardDto dto) {
        return Board.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .build();
    }

    default BoardDto entityToDto(Board entity){
        return BoardDto.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .description(entity.getDescription())
                .regDate(entity.getRegDate().toString())
                .modDate(entity.getModDate().toString())
                .build();
    }
    
}
