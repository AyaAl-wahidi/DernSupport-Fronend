
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const [user, setUser] = useState({ UserName: '', Email: '' });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const account = JSON.parse(localStorage.getItem("account"));
                const response = await axios.get(`https://localhost:7125/api/Users/${account.id}`, {
                    headers: { Authorization: `Bearer ${account.token}` },
                });
                setUser({
                    UserName: response.data.UserName,
                    Email: response.data.Email
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to fetch user data!",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const account = JSON.parse(localStorage.getItem("account"));
            const response = await axios.put(`https://localhost:7125/api/Users/${account.id}`, user, {
                headers: { Authorization: `Bearer ${account.token}` },
            });
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Profile updated successfully!",
            });
            navigate("/profile");
        } catch (error) {
            console.error("Error updating user profile:", error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to update profile!",
            });
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="UserName"
                        value={user.UserName}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Email:
                    <input
                        type="email"
                        name="Email"
                        value={user.Email}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}

export default UserProfile;