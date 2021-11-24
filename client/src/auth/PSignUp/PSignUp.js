import React, { useState, Fragment } from "react";
import "./PSignUp.css";
const PSignUp = ({ history }) => {
  const [patient, setPatient] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    state: "",
    locality: "",
    dob: "",
    phone: 0,
    bloodgroup: "",
  });

  const {
    name,
    email,
    password,
    city,
    state,
    locality,
    dob,
    phone,
    bloodgroup,
  } = patient;
  const signup = async () => {
    return fetch("http://localhost:5000/api/p/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          console.log("ERROR");
        } else {
          setPatient({
            name: "",
            email: "",
            password: "",
            city: "",
            state: "",
            locality: "",
            dob: "",
            phone: 0,
            bloodgroup: "",
          });
          alert("Registered Successfully. Please Login to Proceed");
          history.push("/signin");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="body min-vh-100">
      <div className="my-2">
        <h2 className="text-center bg-primary text-white py-2">
          Patient Registration
        </h2>
      </div>
      <div className="w-100 d-flex flex-column justify-content-center align-items-center">
        <form className="mb-2 w-50">
          <label className="form-label">Name :</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Patient Name"
            value={name}
            onChange={(e) => {
              setPatient({ ...patient, name: e.target.value });
            }}
          />
        </form>
        <form className="mb-2 w-50">
          <label className="form-label">Email :</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Email address"
            value={email}
            onChange={(e) => {
              setPatient({ ...patient, email: e.target.value });
            }}
          />
        </form>
        <form className="mb-2 w-50">
          <label className="form-label">Password :</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setPatient({ ...patient, password: e.target.value });
            }}
          />
        </form>
        <form className="mb-2 w-50">
          <label className="form-label">City :</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter City"
            value={city}
            onChange={(e) => {
              setPatient({ ...patient, city: e.target.value });
            }}
          />
        </form>
        <form className="mb-2 w-50">
          <label className="form-label">State :</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter State"
            value={state}
            onChange={(e) => {
              setPatient({ ...patient, state: e.target.value });
            }}
          />
        </form>
        <form className="mb-2 w-50">
          <label className="form-label">Locality :</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Locality"
            value={locality}
            onChange={(e) => {
              setPatient({ ...patient, locality: e.target.value });
            }}
          />
        </form>
        <form className=" w-50">
          <label className="form-label">Bloodgroup:</label>
          <input
            value={bloodgroup}
            className="form-control"
            placeholder="Enter Bloodgroup"
            onChange={(e) => {
              setPatient({ ...patient, bloodgroup: e.target.value });
            }}
          />
        </form>
        {/* <select id="select Bloodgroup">
        <option value="A">A+</option>
        <option value="B">B+</option>
        <option value="AB">AB+</option>
        <option value="O">O+</option>
        <option value="A">A-</option>
        <option value="B">B-</option>
        <option value="AB">AB-</option>
        <option value="O">O-</option>
        <option value="Other">Other</option>
      </select> */}

        <form className="mb-2 w-50">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            id="birthday"
            className="form-control"
            name="birthday"
            value={dob}
            onChange={(e) => {
              setPatient({ ...patient, dob: e.target.value });
            }}
          />
        </form>

        <form className="mb-2 w-50">
          <label className="form-label">Contact number:</label>
          <input
            type="text"
            placeholder="Number"
            className="form-control"
            value={phone}
            onChange={(e) => {
              setPatient({ ...patient, phone: e.target.value });
            }}
          />
        </form>
        <button className="btn btn-primary btn-lg mb-5" onClick={signup}>
          Register
        </button>
      </div>
    </div>
  );
};

export default PSignUp;
