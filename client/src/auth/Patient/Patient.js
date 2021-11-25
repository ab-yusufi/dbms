import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Patient = () => {
  const [patient, setPatient] = useState();
  const [bookings, setBookings] = useState([]);
  const [hospital, setHospital] = useState()
  const [service, setService] = useState()
  const [refresh, setRefresh] = useState(false);
  const getPatientById = async () => {
    const { user, token } = JSON.parse(localStorage.getItem("p-jwt"));
    const { _id } = user;
    await fetch(`/api/p/${_id}`, {
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
        console.log("Patient: ", JSON.stringify(data));
        setPatient(data);
      })
      .catch((err) => console.log(err));
  };

  const getBookingsByPatient = async () => {
    const { user, token } = JSON.parse(localStorage.getItem("p-jwt"));
    const { _id } = user;
    await fetch(`/api/${_id}/bookings`, {
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
          setBookings(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteBooking = async (id) => {
    const { user, token } = JSON.parse(localStorage.getItem("p-jwt"));
    const { _id } = user;
    await fetch(`/api/${_id}/b/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(`Booking Deleted Successfully`);
        }
      });
  };

  useEffect(() => {
    getPatientById();
    getBookingsByPatient();
  }, [refresh]);
  return (
    
    <Fragment>
      <div className="min-vh-100">
        <div className="my-2">
          <h2 className="text-center bg-primary text-white py-2">
          
            Patient Dashboard
          
          </h2>
        </div>
        <div className="d-flex justify-content-center">
          <div className="w-75 bg-white text-primary px-5 py-4">
            <h4>
              <span className="text-black">Patient Name: </span>
              {patient?.name}{" "}
            </h4>
            <h4>
              <span className="text-black"> Location: </span>{" "}
              {patient?.locality} {patient?.city} {patient?.state}
            </h4>
            <h4>
              <span className="text-black">Phone No: </span> {patient?.phone}
            </h4>
            <h4>
              <span className="text-black">Email: </span>
              {patient?.email}
            </h4>
            <h4>
              <span className="text-black">Date of Birth: </span>
              {patient?.dob.substr(0,10)}
            </h4>
            <h4>
              <span className="text-black">Bloodgroup: </span>
              {patient?.bloodgroup}
            </h4>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="w-75 bg-white text-primary px-5 py-4 border-top border-primary">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="text-center">Services Booked</h3>
              <Link to="/booking/create">
                <button className="btn btn-primary">Add new</button>
              </Link>
            </div>
            <table className="table">
              <tr>
                <th>Service Name</th>
                <th>Service Price</th>
                <th>Date</th>
                <th>Hospital Name</th>
                <th>Delete</th>
              </tr>

              {bookings.map((booking) => (
                <tr >
                  <td>{booking?.service?.name}</td>
                  <td>{booking?.service?.price}</td>
                  <td>{booking?.date.substr(0,10)}</td>
                  <td>{booking?.hospital?.name}</td>
                  
                  <td>
                    <button
                      className="btn btn-danger text-white bg-danger"
                      onClick={(e) => {
                        e.preventDefault()
                        deleteBooking(booking._id);
                        setRefresh(!refresh)
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

export default Patient;
