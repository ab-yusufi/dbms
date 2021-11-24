import React, { Fragment, useState } from "react";
import "./HSignUp.css";

const HSignUp = ({ history }) => {
  const [hospital, setHospital] = useState({
    name: "",
    email: "",
    password: "",
    city: "",
    state: "",
    locality: "",
    phone: 0,
  });
  const { name, email, password, city, state, locality, dob, phone } = hospital;
  const signup = async () => {
    await fetch("http://localhost:5000/api/h/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hospital),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setHospital({
            name: "",
            email: "",
            password: "",
            city: "",
            state: "",
            locality: "",
            phone: 0,
          });
          alert("Registered Successfully. Please Login to Proceed");
          history.push("/signin");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Fragment>
      <div className="my-2">
        <h2 className="text-center bg-primary text-white py-2">
          Hospital Registration
        </h2>
      </div>
      <div className="w-100 d-flex flex-column justify-content-center align-items-center">
        <form className="mb-3 w-50">
          Name :{" "}
          <input
            className="form-control"
            type="text"
            placeholder="Enter Hospital Name"
            value={name}
            onChange={(e) => {
              setHospital({ ...hospital, name: e.target.value });
            }}
          />
        </form>
        <form className="mb-3 w-50">
          Email :{" "}
          <input
            className="form-control"
            type="text"
            placeholder="Enter Email Address"
            value={email}
            onChange={(e) => {
              setHospital({ ...hospital, email: e.target.value });
            }}
          />
        </form>

        <form className="mb-3 w-50">
          Password :{" "}
          <input
            className="form-control"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => {
              setHospital({ ...hospital, password: e.target.value });
            }}
          />
        </form>

        <form className="mb-3 w-50">
          City :{" "}
          <input
            className="form-control"
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => {
              setHospital({ ...hospital, city: e.target.value });
            }}
          />
        </form>

        <form className="mb-3 w-50">
          State :{" "}
          <input
            className="form-control"
            type="text"
            placeholder="Enter State"
            value={state}
            onChange={(e) => {
              setHospital({ ...hospital, state: e.target.value });
            }}
          />
        </form>

        <form className="mb-3 w-50">
          Locality :{" "}
          <input
            className="form-control"
            type="text"
            placeholder="Enter Locality"
            value={locality}
            onChange={(e) => {
              setHospital({ ...hospital, locality: e.target.value });
            }}
          />
        </form>

        <form className="mb-3 w-50">
          Contact number:{" "}
          <input
            className="form-control"
            type="text"
            placeholder="Enter Contact Number"
            value={phone}
            onChange={(e) => {
              setHospital({ ...hospital, phone: e.target.value });
            }}
          />
        </form>
      </div>
            <div className="text-center">
      <button className="btn btn-primary btn-lg" onClick={signup}>
        Register
      </button>
      </div>
    </Fragment>
  );
};

export default HSignUp;
