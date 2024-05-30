'use client';
import { IUser } from "@/app/component/user/model/user";
import { findUserById, modifyUser, userDeleteById } from "@/app/component/user/service/user-service";
import { getUserById } from "@/app/component/user/service/user-slice";
import { Typography, Grid, Paper, Button, Stack, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';

export default function UserMyPage({ params }: any) {
    const dispatch = useDispatch();
    const router = useRouter();
    const user: IUser = useSelector(getUserById);
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [job, setJob] = useState("");
    const [addressId, setAddressId] = useState("");

    useEffect(() => {
        dispatch(findUserById(params.id)).then((res: any) => {
            setPassword(res.payload.password);
            setJob(res.payload.job);
            setAddressId(res.payload.addressId);
        });
    }, [dispatch, params.id]);

    const handleDelete = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirmDelete = () => {
        console.log('탈퇴할 아이디 : ' + user.id);
        dispatch(userDeleteById(user.id))
            .then((res: any) => {
                alert("탈퇴가 완료되었습니다.");
                console.log(res.payload);
                router.push('/'); 
            });
    };

    const handleUpdate = (field: string, value: string) => {
        const updatedUser = { ...user, [field]: value, id: user.id };
        dispatch(modifyUser(updatedUser))
            .then((res: any) => {
                alert(`${field}가 업데이트되었습니다.`);
                console.log(res.payload);
                if (field === "password") setPassword(value);
                if (field === "job") setJob(value);
                if (field === "addressId") setAddressId(value);
            });
    };

    return (
        <>
            <Paper elevation={3} className="container mx-auto p-6 max-w-md mt-20">
                <Typography variant="h4" className="mb-4" align="center">
                    My Page
                </Typography>

                <Grid container spacing={2}>
                    {[
                        { label: "Username", value: user.username },
                        { label: "Name", value: user.name },
                        { label: "Phone", value: user.phone },
                        { label: "Job", value: user.job },
                        { label: "Address ID", value: user.addressId }
                    ].map((field, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Typography variant="body1" className="flex items-center mb-2">
                                <span className="font-semibold mr-2">{field.label}:</span> {field.value}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>

                <Stack direction="row" spacing={2} className="mt-4">
                    <Button variant="contained" color="error" onClick={handleDelete}>Delete Account</Button>
                    <Button variant="outlined" color="primary" onClick={() => router.back()}>Back to List</Button>
                </Stack>
            </Paper>

            <Paper elevation={3} className="container mx-auto p-6 max-w-md mt-10">
                <Typography variant="h5" className="mb-4" align="center">
                    Update Information
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="mt-2"
                            onClick={() => handleUpdate("password", password)}
                        >
                            Update Password
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Job"
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="mt-2"
                            onClick={() => handleUpdate("job", job)}
                        >
                            Update Job
                        </Button>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Address ID"
                            value={addressId}
                            onChange={(e) => setAddressId(e.target.value)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="mt-2"
                            onClick={() => handleUpdate("addressId", addressId)}
                        >
                            Update Address ID
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Account Deletion</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to delete your account? This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
