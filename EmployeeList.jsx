import React, { useEffect, useState } from "react";
import EmployeeForm from "./Employeeform";
import "./EmployeeList.css";

export default function EmployeeList() {
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  // Load all employees on mount
  useEffect(() => {
    loadEmployees();
  }, []);

  function loadEmployees() {
    fetch("http://localhost:5000/api/employee")
      .then((res) => res.json())
      .then((data) => setEmployeeList(data))
      .catch(console.error);
  }

  // Delete employee
  function handleDelete(id) {
    fetch(`http://localhost:5000/api/employee/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        return res.json();
      })
      .then(() => loadEmployees())
      .catch(console.error);
  }

  // Fetch single employee data and set for editing
  function handleEdit(id) {
    fetch(`http://localhost:5000/api/employee/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setEmployeeToEdit(data[0]); // data is array from backend
      })
      .catch(console.error);
  }

  // Save or update employee
  function handleSave(employeeData, isEditing) {
    if (isEditing) {
      // PUT request to update
      fetch(`http://localhost:5000/api/employee/${employeeData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Update failed");
          return res.json();
        })
        .then(() => {
          loadEmployees();
          setEmployeeToEdit(null);
        })
        .catch(console.error);
    } else {
      // POST request to add new
      fetch("http://localhost:5000/api/employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeData),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Save failed");
          return res.json();
        })
        .then((data) => {
          alert(data.message);
          loadEmployees();
        })
        .catch(console.error);
    }
  }

  // Cancel editing
  function handleCancel() {
    setEmployeeToEdit(null);
  }

  return (
    <div className="container-fluid">
      <h1>Employee List</h1>

      <EmployeeForm
        employeeToEdit={employeeToEdit}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <div className="grid-container">
        <div className="header">ID</div>
        <div className="header">Name</div>
        <div className="header">Address</div>
        <div className="header">City</div>
        <div className="header">State</div>
        <div className="header">Country</div>
        <div className="header">Age</div>
        <div className="header">Actions</div>

        {employeeList.map((emp) => (
          <>
            <div>{emp.ID || emp.id}</div>
            <div>{emp.name}</div>
            <div>{emp.address}</div>
            <div>{emp.city}</div>
            <div>{emp.state}</div>
            <div>{emp.country}</div>
            <div>{emp.age}</div>
            <div>
              <button onClick={() => handleEdit(emp.ID || emp.id)}>Edit</button>
              <button onClick={() => handleDelete(emp.ID || emp.id)}>
                Delete
              </button>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
