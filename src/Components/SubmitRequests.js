import React, { useState, useEffect } from "react";
import { Button, Form, Input, Modal, List, Spin, message, DatePicker, TimePicker } from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import navbarBG from '../homeBG.png';
import moment from "moment";

function SubmitRequests() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    handleCancel();
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const account = JSON.parse(localStorage.getItem("account"));
      await axios.post(
        "http://localhost:5031/api/Technicians/SubmitRequest",
        {
          technicianTaskId: 0,
          userId: account.id,
          userName: account.username,
          technicianId: 1,
          title: values.title,
          description: values.description,
          preferredServiceDate: values.preferredDate ? values.preferredDate.format('YYYY-MM-DD') : null,
          preferredServiceTime: values.preferredTime ? values.preferredTime.format('HH:mm') : null,
          status: "pending",
        },
        {
          headers: { Authorization: `Bearer ${account.token}` },
        }
      );
      handleCancel();
      fetchTechnicianRequests();
      Swal.fire({
        icon: "success",
        title: "Request Submitted!",
        text: "Your request has been sent to our pro team. We are happy to help you with your technical issues.",
        color: "#28a745",
        width: 400,
      });
    } catch (e) {
      console.error(e);
      handleCancel();
      window.location.reload();
    } finally {
      setLoading(false);
    }
  };

  const fetchTechnicianRequests = async () => {
    setLoading(true);
    try {
      const account = JSON.parse(localStorage.getItem("account"));
      const response = await axios.get(
        `http://localhost:5031/api/Technicians/GetTechniciansRequestsByUser?UserId=${account.id}`,
        {
          headers: { Authorization: `Bearer ${account.token}` },
        }
      );
      setRequests(response.data);
    } catch (error) {
      message.error("Failed to fetch requests!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnicianRequests();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Submit Your Request</h2>
      <p style={styles.description}>
        Have a software or hardware issue? Need a solution or support? Use this form to send your request to our support team. We have a professional team ready to assist you with your technical issues.
      </p>
      <Button
        style={styles.showFormButton}
        type="primary"
        size="large"
        onClick={showModal}
      >
        New Request!
      </Button>
      <Modal
        title="Submit Your Request"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        style={styles.modal}
      >
        <Form
          id="submitRequestForm"
          name="basic"
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={styles.form}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input a title" }]}
          >
            <Input placeholder="Enter the title of your request" style={styles.input} />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please provide a description" }]}
          >
            <Input.TextArea
              placeholder="Describe your issue or request in detail"
              rows={4}
              style={styles.textArea}
            />
          </Form.Item>
          <Form.Item
            label="Preferred Service Date"
            name="preferredDate"
          >
            <DatePicker 
              format="YYYY-MM-DD" 
              style={styles.datePicker}
              placeholder="Select preferred date"
            />
          </Form.Item>
          <Form.Item
            label="Preferred Service Time"
            name="preferredTime"
          >
            <TimePicker 
              format="HH:mm" 
              style={styles.timePicker}
              placeholder="Select preferred time"
            />
          </Form.Item>
          <Form.Item style={styles.submitButtonContainer}>
            <Button type="primary" htmlType="submit" style={styles.submitButton} disabled={loading}>
              {loading ? <Spin /> : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <h2 style={styles.requestsTitle}>Technician Requests</h2>
      <List
        bordered
        dataSource={requests}
        loading={loading}
        renderItem={(item) => (
          <List.Item style={styles.listItem}>
            <List.Item.Meta
              title={<div style={styles.listItemTitle}>{item.title}</div>}
              description={<div style={styles.listItemDescription}>{item.description}</div>}
            />
            <div style={styles.listItemStatus}>Status: {item.status}</div>
            {item.preferredServiceDate && item.preferredServiceTime && (
              <div style={styles.listItemDetails}>
                Preferred Date: {item.preferredServiceDate} at {item.preferredServiceTime}
              </div>
            )}
          </List.Item>
        )}
        style={styles.requestsList}
      />
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 20,
    backgroundImage: `url(${navbarBG})`,
    backgroundSize: "cover",
    backgroundBlendMode: "overlay",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
    padding: 20,
  },
  title: {
    fontSize: "2rem",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center", 
    fontWeight: "bold", 
    zIndex: 10, 
  },
  description: {
    fontSize: "1.2rem",
    color: "#ddd",
    marginBottom: 20,
    textAlign: "center",
    maxWidth: "80%",
  },
  showFormButton: {
    width: 300,
    fontSize: "1rem",
    borderRadius: 5,
    transition: "background-color 0.3s ease, color 0.3s ease",
    "&:hover": {
      backgroundColor: "#f0a500",
      color: "#fff",
    },
  },
  modal: {
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: 20,
  },
  input: {
    borderRadius: 5,
    backgroundColor: "#fff",
    color: "#333",
  },
  textArea: {
    borderRadius: 5,
    backgroundColor: "#fff",
    color: "#333",
  },
  datePicker: {
    width: "100%",
    borderRadius: 5,
  },
  timePicker: {
    width: "100%",
    borderRadius: 5,
  },
  submitButtonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  submitButton: {
    borderRadius: 5,
    transition: "background-color 0.3s ease, color 0.3s ease",
    "&:hover": {
      backgroundColor: "#f0a500",
      color: "#fff",
    },
  },
  requestsTitle: {
    fontSize: "1.5rem",
    color: "#fff",
    marginTop: 20,
  },
  requestsList: {
    width: "80%",
    marginTop: 20,
  },
  listItem: {
    backgroundColor: "transparent",
    color: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#fff",
  },
  listItemTitle: {
    color: "#fff",
  },
  listItemDescription: {
    color: "#ddd",
  },
  listItemStatus: {
    color: "#fff",
  },
  listItemDetails: {
    color: "#ddd",
  },
};

export default SubmitRequests;