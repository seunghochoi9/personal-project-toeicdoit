'use client';
import React, { useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PG } from '@/app/component/common/enums/PG';

const InquiryList = () => {
    const router = useRouter();

    // 샘플 문의 데이터
    const [inquiries, setInquiries] = useState([
        { id: 1, title: '아이디 정보 문의', inquiryType: '아이디 정보/보안', status: '답변 대기', createdAt: '2025-01-01' },
        { id: 2, title: '게임 실행 오류', inquiryType: '설치/실행', status: '답변 완료', createdAt: '2025-01-02' },
    ]);

    const handleViewDetails = (id:any) => {
        router.push(`${PG.ADMIN}/detail/${id}`); // 상세 페이지로 이동
    };

    return (
        <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
            <Typography variant="h4" align="center" gutterBottom>
                문의 관리
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>문의 ID</TableCell>
                            <TableCell>문의 제목</TableCell>
                            <TableCell>문의 유형</TableCell>
                            <TableCell>상태</TableCell>
                            <TableCell>작성 날짜</TableCell>
                            <TableCell>관리</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inquiries.map((inquiry) => (
                            <TableRow key={inquiry.id}>
                                <TableCell>{inquiry.id}</TableCell>
                                <TableCell>{inquiry.title}</TableCell>
                                <TableCell>{inquiry.inquiryType}</TableCell>
                                <TableCell>{inquiry.status}</TableCell>
                                <TableCell>{inquiry.createdAt}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleViewDetails(inquiry.id)}
                                    >
                                        자세히 보기
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default InquiryList;
