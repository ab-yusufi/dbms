import React, { Fragment, useState } from "react";
import "./HSignUp.css";

const HSignUp = ({history}) => {
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
      }).then(data=>{
        if(data.error){
          alert(data.error) 
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
          history.push("/signin")
        }
      })
      .catch((err) => console.log(err));
    
  };
  return (
    <Fragment>
      <div id="box">Hospital Registration Form</div>
      <hr />
      <h3>Fill out the form carefully for the registration</h3>
      <hr />
      <div className="textalign">
        <form>
          Name :{" "}
          <input type="text" placeholder="Enter hospital name" value={name} onChange={(e) => {
              setHospital({ ...hospital, name: e.target.value });
            }} />
        </form>
        <br />
        <br />
        <form>
          Email :{" "}
          <input type="text" placeholder="Enter Email address" value={email} onChange={(e) => {
              setHospital({ ...hospital, email: e.target.value });
            }}  />
        </form>
        <br />
        <br />
        <form>
          Password : <input type="password" value={password} onChange={(e) => {
              setHospital({ ...hospital, password: e.target.value });
            }}  />
        </form>
        <br />
        <br />
        <form>
          City : <input type="text" value={city} onChange={(e) => {
              setHospital({ ...hospital, city: e.target.value });
            }} />
        </form>
        <br />
        <br />
        <form>
          State : <input type="text" value={state} onChange={(e) => {
              setHospital({ ...hospital, state: e.target.value });
            }} />
        </form>
        <br />
        <br />
        <form>
          Locality : <input type="text" value={locality} onChange={(e) => {
              setHospital({ ...hospital, locality: e.target.value });
            }} />
        </form>

        <br />
        <br />
        <form>
          Contact number:{" "}
          <input type="text" placeholder="Number" value={phone} onChange={(e) => {
              setHospital({ ...hospital, phone: e.target.value });
            }}/>
        </form>
      </div>
      <br />
      <br />
      <div className="register" onClick={signup}>
        Register
      </div>
      <br />
      <br />
    </Fragment>
  );
};

export default HSignUp;
