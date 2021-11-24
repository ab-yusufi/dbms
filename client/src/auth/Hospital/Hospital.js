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
      <div className="min-vh-100">
        <div className="my-2">
          <h2 className="text-center bg-primary text-white py-2">
            Hospital Dashboard
          </h2>
        </div>
        <div className="d-flex justify-content-center">
          <div className="w-75 bg-white text-primary px-5 py-4">
            <h4>
              <span className="text-black">Hospital Name: </span>
              {hospital?.name}{" "}
            </h4>
            <h4>
              <span className="text-black"> Location: </span>{" "}
              {hospital?.locality} {hospital?.city} {hospital?.state}
            </h4>
            <h4>
              <span className="text-black">Phone No: </span> {hospital?.phone}
            </h4>
            <h4>
              <span className="text-black">Email: </span>
              {hospital?.email}
            </h4>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="w-75 bg-white text-primary px-5 py-4 border-top border-primary">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="text-center">Available Services</h3>
              <Link to="/service/create">
                <button className="btn btn-primary">Add new</button>
              </Link>
            </div>
            <table className="table">
              <tr>
                <th>Service Name</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>

              {services.map((service) => (
                <tr >
                  <td>{service.name}</td>
                  <td>{service.price}</td>
                  <td>
                    <Link
                      to={{
                        pathname: "/service/create",
                        state: service,
                      }}
                    >
                      <button className="btn btn-info">Edit</button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger text-white bg-danger"
                      onClick={() => {
                        deleteService(service._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Hospital;
