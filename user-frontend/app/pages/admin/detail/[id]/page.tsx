'use client';
import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, TextField, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

const InquiryDetails = ({ params } :any) => {
    const router = useRouter();

    // 샘플 데이터
    const [inquiry, setInquiry] = useState({
        id: params.id,
        title: '아이디 정보 문의',
        inquiryType: '아이디 정보/보안',
        content: '비밀번호를 변경하려면 어떻게 해야 하나요?',
        userEmail: 'user@example.com',
        createdAt: '2025-01-01',
    });

    const [reply, setReply] = useState('');

    const handleReplySubmit = () => {
        console.log('답변 내용:', reply);
        alert('답변이 저장되었습니다.');
        router.push('/admin/inquiries'); // 목록 페이지로 이동
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    문의 상세 및 답변
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h6">문의 제목:</Typography>
                        <Typography>{inquiry.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">문의 유형:</Typography>
                        <Typography>{inquiry.inquiryType}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">문의 내용:</Typography>
                        <Typography>{inquiry.content}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">작성자 이메일:</Typography>
                        <Typography>{inquiry.userEmail}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">작성 날짜:</Typography>
                        <Typography>{inquiry.createdAt}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            label="답변 작성"
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end" spacing={2}>
                            <Button variant="contained" color="primary" onClick={handleReplySubmit}>
                                답변 저장
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={() => router.push('/admin/inquiries')}>
                                목록으로
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default InquiryDetails;
