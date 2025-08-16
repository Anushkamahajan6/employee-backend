import React from "react";

export default function Documentupload() {
  return (
    <div>
      <div className="container-fluid">
        <div className="grid-container">
          <div className="header">Serial Number</div>
          <div className="header">EMP ID</div>
          <div className="header">Profile</div>
          <div className="header">Aadhar Card</div>
          <div className="header">Pancard</div>
          <div className="header">10th Marksheet</div>
          <div className="header">12th Marksheet</div>
          <div className="header">Graduation</div>
          <div className="header">Actions</div>
        </div>
        <button onClick={() => handleEdit(emp.ID || emp.id)}>Edit</button>
        <button onClick={() => handleDelete(emp.ID || emp.id)}>Delete</button>
        <button onClick={() => onShowUpload(emp.ID || emp.id)}>
          Upload Docs
        </button>
      </div>
    </div>
  );
}
