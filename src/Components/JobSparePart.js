import React, { useEffect, useState, useMemo } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  notification,
  Table,
} from "antd";
import axios from "axios";
import Swal from "sweetalert2";
import './JobSparePart.css';

const { Column } = Table;
const Context = React.createContext({
  name: "Default",
});

function JobSparePart() {
  const [stocks, setStocks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm(); 

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.info({
      message: "Update Successful",
      description: `Stock ${currentRecord?.name} Updated`,
      placement,
    });
  };

  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  const showModal = (record) => {
    setCurrentRecord(record);
    setIsModalOpen(true);

    form.setFieldsValue({
      name: record.name,
      category: record.category,
      description: record.description,
      quantityInStock: record.quantityInStock,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinishFailed = () => {
    handleCancel();
  };

  const getStocks = async () => {
    const account = JSON.parse(localStorage.getItem("account"));

    try {
      const response = await axios.get(
        "https://localhost:7125/api/JobSpareParts/allStocks",
        {
          headers: { Authorization: `Bearer ${account.token}` },
        }
      );
      setStocks(response.data);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        color: "red",
        width: 400,
      });
    }
  };

  const onFormFinish = async (values) => {
    const account = JSON.parse(localStorage.getItem("account"));

    try {
      await axios.put(
        `https://localhost:7125/api/JobSpareParts/${currentRecord.jobSparePartId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${account.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      getStocks(); 
      handleCancel(); 
      openNotification("bottomRight");
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        color: "red",
        width: 400,
      });
    }
  };

  const onSearch = async (value) => {
    const account = JSON.parse(localStorage.getItem("account"));
    try {
      const response = await axios.get(
        `https://localhost:7125/api/JobSpareParts/search?name=${value}`,
        {
          headers: { Authorization: `Bearer ${account.token}` },
        }
      );
      setStocks(response.data);
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Item doesn't exist!",
        color: "red",
        width: 400,
      });
      getStocks();
    }
  };

  useEffect(() => {
    getStocks();
  }, []);

  return (
    <Context.Provider value={contextValue}>
      {contextHolder}

      <div className="container">
        <h1 className="title">Job Spare Parts Management</h1>
        <p className="description">
          Efficiently manage and update job spare parts with our comprehensive inventory system. Search, edit, and keep track of stock levels to ensure timely and accurate availability of essential components for your operations.
        </p>
      </div>

      <div className="SearchContainer">
        <Input.Search
          className="search-bar"
          placeholder="Search"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="table-container">
        <Table
          dataSource={stocks}
          bordered
          className="custom-table"
          rowKey="jobSparePartId"
        >
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Category" dataIndex="category" key="category" />
          <Column title="Description" dataIndex="description" key="description" />
          <Column
            title="Quantity In Stock"
            dataIndex="quantityInStock"
            key="quantityInStock"
            align="center"
          />
          <Column
            title="Action"
            key="action"
            align="center"
            render={(_, record) => (
              <Button type="default" onClick={() => showModal(record)}>
                Edit
              </Button>
            )}
          />
        </Table>

        <Modal
          title="Edit Stock"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={form}
            name="basic"
            layout="vertical"
            autoComplete="off"
            onFinish={onFormFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="Category" name="category">
              <Input />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>

            <Form.Item label="Quantity In Stock" name="quantityInStock">
              <InputNumber />
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Context.Provider>
  );
}

export default JobSparePart;