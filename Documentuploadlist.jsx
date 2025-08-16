import React, { useState } from "react";
import "./Documentupload.jsx";
import Documentupload from "./Documentupload.jsx";
export default function Documentuploadlist({ empId, onBack }) {
  const [profile, setProfile] = useState(null);
  const [aadhar, setAadhar] = useState(null);
  const [marksheet10, setMarksheet10] = useState(null);
  const [marksheet12, setMarksheet12] = useState(null);
  const [pancard, setPancard] = useState(null);
  const [graduation, setGraduation] = useState(null);
  function saved() {
    if (!empId) {
      alert("No employee selected.");
      return;
    }
    const formdata = new FormData();
    formdata.append("emp_id", empId);
    formdata.append("profile", profile);
    formdata.append("aadhar", aadhar);
    formdata.append("marksheet10", marksheet10);
    formdata.append("marksheet12", marksheet12);
    formdata.append("pancard", pancard);
    formdata.append("graduation", graduation);
    fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch(console.error);
  }
  return (
    <div>
      <h1>Documentuploadlist</h1>
      <form action="" encType="multipart/form-data">
        <div className="container">
          <div className="profile">
            <label htmlFor="profile">Enter Your Profile</label>
            <input
              type="file"
              id="profile"
              onChange={(e) => setProfile(e.target.files[0])}
            ></input>
          </div>
          <div className="aadhar">
            <label htmlFor="aadhar">Enter Your Aadhar</label>
            <input
              type="file"
              id="aadhar"
              onChange={(e) => setAadhar(e.target.files[0])}
            ></input>
          </div>
          <div className="marksheet-10">
            <label htmlFor="marksheet-10">Enter Your 10th-marksheet</label>
            <input
              type="file"
              id="marksheet-10"
              onChange={(e) => setMarksheet10(e.target.files[0])}
            ></input>
          </div>
          <div className="marksheet-12">
            <label htmlFor="marksheet-12">Enter Your 12th-marksheet</label>
            <input
              type="file"
              id="marksheet-12"
              onChange={(e) => setMarksheet12(e.target.files[0])}
            ></input>
          </div>
          <div className="pan-card">
            <label htmlFor="pan-card">Enter Your pan-card</label>
            <input
              type="file"
              id="pan-card"
              onChange={(e) => setPancard(e.target.files[0])}
            ></input>
          </div>
          <div className="graduation">
            <label htmlFor="graduation">Enter Your graduation Marksheet</label>
            <input
              type="file"
              id="graduation"
              onChange={(e) => setGraduation(e.target.files[0])}
            ></input>
          </div>
          <div className="button">
            <button type="button" onClick={saved}>
              Save
            </button>
          </div>
          <button onClick={onBack}>Back</button>
        </div>
      </form>
      <Documentupload />
    </div>
  );
}
