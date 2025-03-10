import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './FQA.css';

function FQA() {
  const [fqaData, setFqaData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [expandedFQAId, setExpandedFQAId] = useState(null);
  const [editingFQA, setEditingFQA] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');

  useEffect(() => {
    const fetchFQAData = async () => {
      try {
        const account = JSON.parse(localStorage.getItem("account"));
        const role = localStorage.getItem("role");

        if (account) {
          setIsAdmin(role === 'Admin');

          const response = await axios.get("https://localhost:7125/api/KnowledgeBases", {
            headers: { Authorization: `Bearer ${account.token}` },
          });

          setFqaData(response.data);
        } else {
          console.warn("Account is not defined");
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error fetching FQA data:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while fetching the data!",
          color: "red",
          width: 400,
        });
      }
    };

    fetchFQAData();
  }, []);

  const handleClick = (knowledgeBaseId) => {
    setExpandedFQAId(prevId => (prevId === knowledgeBaseId ? null : knowledgeBaseId));
  };

  const handleDelete = async (knowledgeBaseId) => {
    try {
      await axios.delete(`https://localhost:7125/api/KnowledgeBases/${knowledgeBaseId}`, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("account")).token}` },
      });

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The FAQ has been deleted.",
        color: "green",
        width: 400,
      });

      setFqaData(prevData => prevData.filter(fqa => fqa.knowledgeBaseId !== knowledgeBaseId));
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while deleting the FAQ!",
        color: "red",
        width: 400,
      });
    }
  };

  const handleEdit = (fqa) => {
    setEditingFQA(fqa);
    setEditTitle(fqa.title);
    setEditDescription(fqa.description);
    setEditCategory(fqa.category);
  };

  const handleSaveEdit = async () => {
    try {
      const updatedFQA = {
        ...editingFQA,
        title: editTitle,
        description: editDescription,
        category: editCategory
      };

      await axios.put(`https://localhost:7125/api/KnowledgeBases/${editingFQA.knowledgeBaseId}`, updatedFQA, {
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("account")).token}` },
      });

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "The FAQ has been updated.",
        color: "green",
        width: 400,
      });

      setFqaData(prevData =>
        prevData.map(fqa =>
          fqa.knowledgeBaseId === updatedFQA.knowledgeBaseId ? updatedFQA : fqa
        )
      );
      setEditingFQA(null);
    } catch (error) {
      console.error("Error updating FAQ:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while updating the FAQ!",
        color: "red",
        width: 400,
      });
    }
  };

  return (
    <div className="container">
      <h1 className="title">Frequently Asked Questions</h1>
      <p className="description">
        Welcome to our Frequently Asked Questions page. Here, you'll find answers to the most common queries we receive. Our goal is to make your life easier by providing clear and helpful information. If you need any additional assistance or have further questions, we're here to help!
      </p>
      {fqaData.length > 0 ? (
        fqaData.map(fqa => (
          <div
            key={fqa.knowledgeBaseId}
            className="fqa-item"
            onClick={() => handleClick(fqa.knowledgeBaseId)}
          >
            <h3>{fqa.title}</h3>
            <div className={`fqa-details ${expandedFQAId === fqa.knowledgeBaseId ? 'show' : ''}`}>
              <p>{fqa.description}</p>
              <p><strong>Category:</strong> {fqa.category}</p>
              {isAdmin && (
                <div className="admin-buttons">
                  <button
                    className="edit-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(fqa);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(fqa.knowledgeBaseId);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No FQAs available.</p>
      )}

      {editingFQA && (
        <div className="edit-box">
          <h2>Edit FAQ</h2>
          <label>
            Title:
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </label>
          <label>
            Description:
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </label>
          <label>
            Category:
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            >
              <option value="Software">Software</option>
              <option value="Hardware">Hardware</option>
            </select>
          </label>
          <div className="edit-buttons">
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={() => setEditingFQA(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FQA;