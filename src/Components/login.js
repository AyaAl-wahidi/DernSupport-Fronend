import React from "react";
import axios from "axios";
import { Button, Form, Input, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import Swal from "sweetalert2";
import homeBG from '../homeBG.png';

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const login = await axios.post("http://localhost:5031/api/Users/Login", {
        username: values.username,
        password: values.password,
      });
      const myDecodedToken = decodeToken(login.data.token);
      await localStorage.setItem(
        "role",
        myDecodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ]
      );
      await localStorage.setItem("account", JSON.stringify(login.data));
      navigate("/");
      window.location.reload();
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Invalid Credentials",
        text: "Please check your username or password",
        color: "#d33",
        width: 400,
      });
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <h1 style={styles.title}>Login</h1>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={styles.form}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="Enter your username" style={styles.input} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" style={styles.input} />
          </Form.Item>
          <Form.Item style={styles.buttonContainer}>
            <Button type="primary" htmlType="submit" style={styles.submitButton}>
              Submit
            </Button>
          </Form.Item>
          <Form.Item style={styles.buttonContainer}>
            <Button
              type="link"
              onClick={() => navigate("/register")}
              style={styles.createAccountButton}
            >
              Create Account
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    justifyContent: "center",
    backgroundImage: `url(${homeBG})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.9)",
    backgroundColor: "transparent",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    color: "#fff",
    fontSize: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  input: {
    borderRadius: 5,
    borderColor: "#fff",
    padding: 10,
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  submitButton: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "gray",
    borderColor: "#fff",
    transition: "background-color 0.3s ease, color 0.3s ease",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  },
  createAccountButton: {
    color: "white",
    "&:hover": {
      color: "#orange",
    },
  },
};

export default Login;