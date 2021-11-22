import React, { useState, useEffect, Fragment } from "react";
import "./Hospital.css";
import { Link } from "react-router-dom";

const Hospital = () => {
  const [hospital, setHospital] = useState();
  const [services, setServices] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const getHospitalById = async () => {
    const { user, token } = JSON.parse(localStorage.getItem("h-jwt"));
    const { _id } = user;
    await fetch(`/api/h/${_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Hospital: ", JSON.stringify(data));
        setHospital(data);
      })
      .catch((err) => console.log(err));
  };

  const getServicesByHospital = async () => {
    const { user, token } = JSON.parse(localStorage.getItem("h-jwt"));
    const { _id } = user;
    await fetch(`/api/${_id}/services`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setServices(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteService = async (serviceId) => {
    const { user, token } = JSON.parse(localStorage.getItem("h-jwt"));
    const hospitalId = hospital._id;
    await fetch(`/api/${hospitalId}/s/delete/${serviceId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          alert(`Service Deleted Successfully`);
          setRefresh(!refresh);
        }
      });
  };

  useEffect(async () => {
    getHospitalById();
    getServicesByHospital();
  }, [refresh]);
  return (
    <Fragment>
      <div id="body">
        <div id="box">Hospital Dashboard</div>
        <br />
        <br />
        <div className="center">
          <h4>Hospital Name : {hospital?.name}</h4>
          <h4>
            Location : {hospital?.locality} {hospital?.city} {hospital?.state}
          </h4>
          <h4>Phone No. : {hospital?.phone}</h4>
          <h4>Email :{hospital?.email}</h4>
        </div>
        {/* <div id="pending">
          <h4>
            <div id="service">Pending Services</div>
          </h4>
          <div id="service">
            <a>
              01 Service name
              <input
                type="radio"
                id="Pending"
                name="fav_language"
                value="Pending"
              />
            </a>{" "}
            <label> Pending</label>{" "}
            <input
              type="radio"
              id="Completed"
              name="fav_language"
              value="Pending"
            />{" "}
            <label for="Completed">Completed</label>{" "}
          </div>
          <a>
            02 Service name{" "}
            <input
              type="radio"
              id="student"
              name="fa_language"
              value="Pending"
            />
          </a>{" "}
          <label> Pending</label>{" "}
          <input type="radio" id="student" name="fa_language" value="Pending" />{" "}
          <label for="Completed">Completed</label>
          <br />
        </div> */}
        <div id="available">
          <div id="sub-available">
            <h3>Available Services</h3>
            <Link to="/service/create">
            <button>Add new</button>
            </Link>
          </div>
          <br />
          {services.map((service) => (
            <Fragment>
              <a>
                {service.name}
                <Link to="/service/create">
                  <button>Edit</button>
                </Link>
                <button onClick={() => {
                  deleteService(service._id);
                }}> Delete</button>
              </a>
              <br />
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Hospital;
