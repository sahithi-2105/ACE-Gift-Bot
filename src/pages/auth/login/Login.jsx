import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import useLogin from "./hook/useLogin";

const Login = () => {
  const {
    loading,
    navigate,
    // User Data
    email,
    setEmail,
    password,
    setPassword,

    // Login Function
    handleLogin,
  } = useLogin();
  return (
    <div
      style={{
        width: "100vw",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        width={600}
        height={400}
        display={"flex"}
        flexDirection={"column"}
        padding={3}
        gap={2}
      >
        <Box>
          <Typography variant="h4" style={{ fontFamily: "Poppins" }}>
            Welcome!
          </Typography>

          <Typography variant="h6" style={{ fontFamily: "Poppins" }}>
            Please login to your account
          </Typography>
        </Box>

        <Grid
          container
          spacing={2}
          sx={{ marginTop: "20px" }}
          direction={"column"}
        >
          <Grid item xs={12} sm={6} mb={1} spacing={2}>
            <Typography>
              <span style={{}}>Email</span>
            </Typography>
            <TextField
              placeholder="Email"
              type="email"
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray", // gray border
                  },
                  "&:hover fieldset": {
                    borderColor: "#888", // slightly darker on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#aaa", // when focused
                  },
                },
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} spacing={2}>
            <Typography>
              <span style={{}}>Password</span>
            </Typography>
            <TextField
              placeholder="Password"
              type="password"
              fullWidth
              required
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "gray", // gray border
                  },
                  "&:hover fieldset": {
                    borderColor: "#888", // slightly darker on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#aaa", // when focused
                  },
                },
                input: {}, // if you want white text
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#0056b3",
            border: "none",
            width: "fit-content",
            padding: "10px 20px",
            fontFamily: "Poppins",
            "&:hover": {
              backgroundColor: "#004a99",
              border: "none",
            },
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
            "&:active": {
              outline: "none",
              boxShadow: "none",
            },
          }}
          onClick={handleLogin}
        >
          {!loading ? "Login" : <CircularProgress size={24} color="white" />}
        </Button>
        <Typography variant="p" style={{ fontFamily: "Poppins" }}>
          Already have an account?{" "}
          <Link to="/auth/signup">
            <span style={{ color: "#0056b3" }}>Sign Up</span>
          </Link>
        </Typography>
      </Box>
    </div>
  );
};

export default Login;
