import React, { useState, useEffect } from "react";
import "./Employeeform.css";

export default function EmployeeForm({ employeeToEdit, onSave, onCancel }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!id && !isEditing) {
      newErrors.id = "ID is required.";
    }
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!age) {
      newErrors.age = "Age is required.";
    } else if (isNaN(age) || age <= 0) {
      newErrors.age = "Age must be a positive number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  useEffect(() => {
    if (employeeToEdit) {
      setId(employeeToEdit.id);
      setName(employeeToEdit.name);
      setAddress(employeeToEdit.address);
      setCity(employeeToEdit.city);
      setState(employeeToEdit.state);
      setCountry(employeeToEdit.country);
      setAge(employeeToEdit.age);
      setIsEditing(true);
    } else {
      clearForm();
    }
  }, [employeeToEdit]);

  function clearForm() {
    setId("");
    setName("");
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setAge("");
    setIsEditing(false);
  }
  function handleSave() {
    if (!validate()) return;
    const employeeData = {
      id: Number(id),
      name,
      address,
      city,
      state,
      country,
      age: Number(age),
    };
    onSave(employeeData, isEditing);
    clearForm();
  }
  return (
    <>
      <div className="Heading">
        {isEditing ? "Edit Employee" : "Add Employee"}
      </div>
      <form className="container" onSubmit={(e) => {}}>
        <div class="group">
          <label htmlFor="id">ID</label>
          <input
            id="id"
            className="input"
            type="text"
            placeholder="Enter your ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            disabled={isEditing}
          />
          {errors.id && <div className="error">{errors.id}</div>}
        </div>
        <div class="group">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            className="input"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div class="group">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            className="input"
            type="text"
            placeholder="Enter your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div class="group">
          <label htmlFor="city">City</label>
          <input
            id="city"
            className="input"
            type="text"
            placeholder="Enter your City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div class="group">
          <label htmlFor="state">State</label>
          <input
            id="state"
            className="input"
            type="text"
            placeholder="Enter your State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div class="group">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            className="input"
            type="text"
            placeholder="Enter your Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div class="group">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            className="input"
            type="number"
            placeholder="Enter your Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          {errors.age && <div className="error">{errors.age}</div>}
        </div>
      </form>
      <div className="button">
        <button type="button" onClick={handleSave}>
          {isEditing ? "Update" : "Save"}
        </button>
        <button
          type="button"
          onClick={() => {
            clearForm();
            onCancel();
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
