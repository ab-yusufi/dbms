import React, { useState, Fragment } from "react";
import "./PSignUp.css";
const PSignUp = () => {
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
    await fetch("http://localhost:5000/api/p/signup", {
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
      .catch((err) => console.log(err));
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
    })
    alert("Registered Successfully. Please Login to Proceed")
  };
  return (
    <Fragment>
      <div id="box">Patient Registration Form</div>
      <hr />
      <h3>Fill out the form carefully for the registration</h3>
      <hr />
      <div id="textalign">
        <form>
          Name :{" "}
          <input
            type="text"
            placeholder="Enter Patient name"
            value={name}
            onChange={(e) => {
              setPatient({ ...patient, name: e.target.value });
            }}
          />
        </form>
        <br />
        <br />
        <form>
          Email :{" "}
          <input
            type="text"
            placeholder="Enter Email address"
            value={email}
            onChange={(e) => {
              setPatient({ ...patient, email: e.target.value });
            }}
          />
        </form>
        <br />
        <br />
        <form>
          Password :{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPatient({ ...patient, password: e.target.value });
            }}
          />
        </form>
        <br />
        <br />
        <form>
          City :{" "}
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setPatient({ ...patient, city: e.target.value });
            }}
          />
        </form>
        <br />
        <br />
        <form>
          State :{" "}
          <input
            type="text"
            value={state}
            onChange={(e) => {
              setPatient({ ...patient, state: e.target.value });
            }}
          />
        </form>
        <br />
        <br />
        <form>
          Locality :{" "}
          <input
            type="text"
            value={locality}
            onChange={(e) => {
              setPatient({ ...patient, locality: e.target.value });
            }}
          />
        </form>

        <br />
        <br />
        <label>Bloodgroup:</label>
        <input
          value={bloodgroup}
          onChange={(e) => {
            setPatient({ ...patient, bloodgroup: e.target.value });
          }}
        />
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

        <br />
        <br />
        <form>
          <label>Date of Birth</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={dob}
            onChange={(e) => {
              setPatient({ ...patient, dob: e.target.value });
            }}
          />
        </form>

        <br />
        <br />
        <form>
          Contact number:{" "}
          <input
            type="text"
            placeholder="Number"
            value={phone}
            onChange={(e) => {
              setPatient({ ...patient, phone: e.target.value });
            }}
          />
        </form>
        <div className="register" onClick={signup}>
          Register
        </div>
      </div>
    </Fragment>
  );
};

export default PSignUp;
