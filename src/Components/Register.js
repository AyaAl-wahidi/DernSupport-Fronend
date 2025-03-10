import React, { useState } from "react";
import { Button, Form, Input, Card, Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import homeBG from '../homeBG.png';

const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};

function Register() {
    const [accountType, setAccountType] = useState(null);
    const [roles, setRoles] = useState("User");
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const payload = {
                userName: values.userName,
                email: values.email,
                password: values.password,
                roles: [roles],
                accountType: values.accountType,
            };

            if (values.accountType === "Business") {
                payload.businessName = values.businessName;
                payload.businessLocation = values.businessLocation;
            }

            await axios.post("https://localhost:7125/api/Users/Register", payload);

            Swal.fire({
                icon: "success",
                title: "Registration Successful",
                text: "You can now log in with your new account",
                color: "green",
                width: 400,
            });
            navigate("/login");
        } catch (e) {
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: "Please check your details and try again",
                color: "red",
                width: 400,
            });
        }
    };

    return (
        <div style={styles.container}>
            <Card style={styles.card}>
                <h1 style={styles.title}>Register</h1>

                <Form
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={styles.form}
                >
                    <Form.Item
                        label="Username"
                        name="userName"
                        rules={[{ required: true, message: "Please input your username!" }]}
                        style={styles.formItem}
                    >
                        <Input placeholder="Enter your username" style={styles.input} />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Please input your email!" }]}
                        style={styles.formItem}
                    >
                        <Input placeholder="Enter your email" style={styles.input} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                        style={styles.formItem}
                    >
                        <Input.Password placeholder="Enter your password" style={styles.input} />
                    </Form.Item>

                    <Form.Item
                        label="Roles"
                        name="roles"
                        initialValue="User"
                        rules={[{ required: true, message: "Role is required!" }]}
                        style={styles.formItem}
                    >
                        <Select
                            placeholder="Select A Role"
                            value={roles}
                            onChange={(value) => setRoles(value)}
                            style={styles.select}
                        >
                            <Select.Option value="User">User</Select.Option>
                            <Select.Option value="Admin">Admin</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Account Type"
                        name="accountType"
                        rules={[{ required: true, message: "Please select an account type!" }]}
                        style={styles.formItem}
                    >
                        <Select
                            placeholder="Select an account type"
                            onChange={(value) => setAccountType(value)}
                            style={styles.select}
                        >
                            <Select.Option value="Business">Business</Select.Option>
                            <Select.Option value="Individual Customer">Individual Customer</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Contact Number"
                        name="contactNumber"
                        rules={[{ required: false, message: "Please input your phone number!" }]}
                        style={styles.formItem}
                    >
                        <Input placeholder="Enter phone number" style={styles.input} />
                    </Form.Item>
                    
                    {accountType === "Business" && (
                        <>
                            <Form.Item
                                label="Business Name"
                                name="businessName"
                                rules={[{ required: false, message: "Please input your business name!" }]}
                                style={styles.formItem}
                            >
                                <Input placeholder="Enter business name" style={styles.input} />
                            </Form.Item>

                            <Form.Item
                                label="Business Location"
                                name="businessLocation"
                                rules={[{ required: false, message: "Please input your business location!" }]}
                                style={styles.formItem}
                            >
                                <Input placeholder="Enter business location" style={styles.input} />
                            </Form.Item>
                        </>
                    )}

                    <Form.Item style={styles.buttonContainer}>
                        <Button type="primary" htmlType="submit" style={styles.submitButton}>
                            Register
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
        maxWidth: 500,
        padding: 20,
        borderRadius: 10,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        backgroundColor: "transparent",
    },
    title: {
        textAlign: "center",
        marginBottom: 20,
        color: "white",
        fontSize: "2rem",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        color: "white",
    },
    formItem: {
        color: "white",
    },
    input: {
        borderRadius: 9,
        borderColor: "#333",
        padding: 10,
    },
    select: {
        borderRadius: 5,
        borderColor: "#333",
        backgroundColor: "white"
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
    },
    submitButton: {
        width: "100%",
        borderRadius: 9,
        backgroundColor: "#gray",
        borderColor: "#4CAF50",
        transition: "background-color 0.3s ease, color 0.3s ease",
        "&:hover": {
            backgroundColor: "#gray",
            borderColor: "#gray",
        },
    },
};

export default Register;