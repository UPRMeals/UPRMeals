import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Avatar,
  Box,
  Stack,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuthService } from "@/modules/auth/hooks/useAuthService";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Username:", username);
    console.log("Password:", password);
  };

  const authService = useAuthService();

  useEffect(() => {
    const callBackend = async () => {
      const res = await authService.login({ test: "should reach the backend" });
      console.log("res", res);
    };

    callBackend();
  }, []);

  return (
    <Box sx={{ backgroundColor: "white", maxWidth: 500 }} padding={5}>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h1">Sign in</Typography>
      </Stack>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Username"
        autoFocus
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleLogin}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default LoginPage;
