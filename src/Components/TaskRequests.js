import React, { useEffect, useState } from 'react';
import { Button, Space, Table } from 'antd';
import axios from 'axios';
import homeBG from '../homeBG.png';

const { Column } = Table;

const TaskRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    const getRequests = async () => {
        setLoading(true);
        const account = JSON.parse(localStorage.getItem('account'));
        try {
            const response = await axios.get("https://localhost:7125/api/Technicians/GetTechniciansRequests", {
                headers: { Authorization: `Bearer ${account.token}` },
            });
            console.log('API response:', response.data);
            if (response.data.tasks && Array.isArray(response.data.tasks)) {
                setRequests(response.data.tasks);
            } else {
                console.error("Expected tasks array but received:", response.data);
            }
        } catch (e) {
            console.error('Error fetching requests:', e);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (technicianTaskId, status) => {
        const account = JSON.parse(localStorage.getItem('account'));
        try {
            await axios.put(`https://localhost:7125/api/Technicians/UpdateRequestStatus/${technicianTaskId}`, `"${status}"`, {
                headers: { Authorization: `Bearer ${account.token}`, 'Content-Type': 'application/json' },
            });
            getRequests();
        } catch (e) {
            console.error('Error updating request status:', e);
        }
    };

    useEffect(() => {
        getRequests();
    }, []);

    return (
        <div style={styles.container}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div style={styles.header}>
                        <h1 style={styles.title}>Task Requests</h1>
                        <p style={styles.description}>
                            Manage and review incoming technician requests. Approve or decline tasks based on their status and ensure efficient handling of support requests.
                        </p>
                    </div>
                    <Table
                        dataSource={requests}
                        bordered
                        style={styles.table}
                        pagination={{ pageSize: 10 }}
                        rowClassName="table-row"
                        scroll={{ x: true }}
                    >
                        <Column
                            title="Title"
                            dataIndex="title"
                            key="title"
                            align="center"
                            render={text => <div style={styles.tableCell}>{text}</div>}
                        />
                        <Column
                            title="Description"
                            dataIndex="description"
                            key="description"
                            align="center"
                            render={text => <div style={styles.tableCell}>{text}</div>}
                        />
                        <Column
                            title="Status"
                            dataIndex="status"
                            key="status"
                            align="center"
                            render={text => <div style={styles.tableCell}>{text}</div>}
                        />
                        <Column
                            title="User Name"
                            dataIndex="userName"
                            key="userName"
                            align="center"
                            render={text => <div style={styles.tableCell}>{text}</div>}
                        />
                        <Column
                            title="Action"
                            key="action"
                            align="center"
                            render={(_, record) => (
                                <Space size="middle">
                                    {record.status !== 'approved' && (
                                        <Button
                                            style={styles.approveButton}
                                            onClick={() => updateStatus(record.technicianTaskId, 'approved')}
                                        >
                                            Approve
                                        </Button>
                                    )}
                                    {record.status !== 'declined' && (
                                        <Button
                                            style={styles.declineButton}
                                            onClick={() => updateStatus(record.technicianTaskId, 'declined')}
                                        >
                                            Decline
                                        </Button>
                                    )}
                                </Space>
                            )}
                        />
                    </Table>
                </>
            )}
        </div>
    );
};

const styles = {
    container: {
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#f4f4f4',
        minHeight: '100vh',
        backgroundImage: `url(${homeBG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '10px',
    },
    description: {
        fontSize: '1.2rem',
        color: '#fff',
        marginBottom: '20px',
        maxWidth: '800px',
        margin: '0 auto',
    },
    table: {
        width: '90%',
        margin: '0 auto',
        backgroundColor: '#fff',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #ddd',
    },
    tableCell: {
        padding: '12px',
        textAlign: 'center',
        color: '#333',
    },
    approveButton: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
        color: '#fff',
        borderRadius: '4px',
        padding: '8px 16px',
        fontSize: '0.9rem',
        transition: 'background-color 0.3s, transform 0.3s',
        '&:hover': {
            backgroundColor: '#45a049',
            borderColor: '#45a049',
            transform: 'scale(1.05)',
        },
    },
    declineButton: {
        backgroundColor: '#f44336',
        borderColor: '#f44336',
        color: '#fff',
        borderRadius: '4px',
        padding: '8px 16px',
        fontSize: '0.9rem',
        transition: 'background-color 0.3s, transform 0.3s',
        '&:hover': {
            backgroundColor: '#e53935',
            borderColor: '#e53935',
            transform: 'scale(1.05)',
        },
    },
    rowStyle: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        transition: 'background-color 0.3s',
    },
    rowHoverStyle: {
        backgroundColor: '#f0f0f0', 
    },
};

export default TaskRequests;