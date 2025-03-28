'use client';

import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, Button, MenuItem, Paper, Stack } from '@mui/material';

const InquiryForm = () => {
    const [form, setForm] = useState({
        inquiryType: '',
        title: '',
        content: '',
        email: '',
        phone: '',
    });

    const inquiryTypes = [
        '아이디 정보/보안',
        '결제',
        '게임 문의',
        '이벤트',
        '복구',
        '설치/실행',
    ];

    const handleChange = (field:any, value:any) => {
        setForm({ ...form, [field]: value });
    };

    const handleSubmit = () => {
        console.log('문의 내용:', form);
        alert('문의가 접수되었습니다.');
    };

    return (
        <Container maxWidth="md" style={{ marginTop: '2rem' }}>
            <Paper elevation={3} style={{ padding: '2rem' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    1:1 문의 접수
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            select
                            fullWidth
                            label="문의 유형 선택"
                            value={form.inquiryType}
                            onChange={(e) => handleChange('inquiryType', e.target.value)}
                        >
                            {inquiryTypes.map((type, index) => (
                                <MenuItem key={index} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="문의 제목"
                            value={form.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={5}
                            label="문의 내용"
                            value={form.content}
                            onChange={(e) => handleChange('content', e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="이메일 주소"
                            value={form.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="전화번호"
                            value={form.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end" spacing={2}>
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                문의하기
                            </Button>
                            <Button variant="outlined" color="secondary">
                                취소
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default InquiryForm;
