import React, { useState } from 'react';
import homeBG from '../homeBG.png';
import { Button, Modal, Form, Input } from 'antd';
import Swal from 'sweetalert2';

function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    Swal.fire({
      icon: 'success',
      title: 'Thank you!',
      text: 'We will contact you soon.',
      color: 'green',
      width: 400,
    });

    setIsModalVisible(false);
  };

  return (
    <div style={{ ...styles.container, backgroundImage: `url(${homeBG})` }}>
      <div style={styles.overlay}>
        <div style={styles.content}>
          <Button 
            type="default" 
            onClick={showModal} 
            style={styles.contactButton}
          >
            Contact Us
          </Button>
          <h1 style={styles.heading}>Welcome To Dern-Support</h1>
          <p style={styles.description}>
            Your trusted partner in IT technical support, offering comprehensive services for businesses and individuals.
          </p>
          <div style={styles.section}>
            <h2 style={styles.subheading}>Our Services</h2>
            <p style={styles.text}>
              We specialize in providing on-site support for businesses and reliable computer repair services for individual customers.
            </p>
            <ul style={styles.list}>
              <li><strong>Business IT Support:</strong> On-site support to keep your systems running smoothly.</li>
              <li><strong>Individual Repairs:</strong> Convenient drop-off and courier services for individuals.</li>
              <li><strong>Knowledge Base:</strong> Access DIY guides to solve minor technical issues.</li>
            </ul>
          </div>
          <div style={styles.section}>
            <h2 style={styles.subheading}>Why Choose Dern-Support?</h2>
            <p style={styles.text}>
              Fast, reliable, and comprehensive IT solutions tailored to meet your business and personal needs.
            </p>
            <ul style={styles.list}>
              <li>Quick turnaround for repairs and support requests.</li>
              <li>Expert technicians with years of experience.</li>
              <li>Empowering self-service through our advanced knowledge base.</li>
            </ul>
          </div>
          <Modal
            title="Contact Us"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            style={styles.modal}
            centered
          >
            <Form
              layout="vertical"
              onFinish={onFinish}
              style={styles.form}
            >
              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name!' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Location" name="location">
                <Input />
              </Form.Item>
              <Form.Item label="Phone" name="phone">
                <Input />
              </Form.Item>
              <Form.Item label="Extra Details" name="description">
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Send
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    marginTop: '0',
    position: 'relative',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    minHeight: '100vh',
  },
  content: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'left',
    color: '#fff',
    position: 'relative',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    fontWeight: '700',
    textAlign: 'center',
    padding: '50px',
  },
  description: {
    textAlign: 'center',
    fontSize: '1.2rem',
    marginBottom: '30px',
    textAlign: 'center',
  },
  section: {
    marginBottom: '30px',
  },
  subheading: {
    textAlign: 'center',
    fontSize: '1.8rem',
    marginBottom: '15px',
  },
  text: {
    textAlign: 'center',
    fontSize: '1rem',
    marginBottom: '10px',
  },
  list: {
    textAlign: 'center',
    listStyleType: 'disc',
    paddingLeft: '20px',
  },
  contactButton: {
    position: 'absolute',
    top: '20px',
    zIndex: 1000,
    backgroundColor: 'transparent',
    border: '4px solid #fff',
    color: '#fff',
    fontSize: '20px',
    hover: '#FD723F',
    padding: '10px 20px',
    borderRadius: '3px',
  },
  contactButtonHover: {
    backgroundColor: '#FD723F',
    color: '#FD723F',
  },
  modal: {
    top: '20%',
    hover: '#FD723F',
  },
  form: {
    maxWidth: '500px',
    margin: '0 auto',
  },
};

export default Home;