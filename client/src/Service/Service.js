import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Service.css";
const Service = ({ history, match, location }) => {
  const [service, setService] = useState({
    name: "",
    price: 0,
    quantity: "",
    time: ""
  });
  const { name, price, quantity, time } = service;

  const createService = async () => {
    const { user, token } = JSON.parse(localStorage.getItem("h-jwt"));
    const { _id } = user;
    if (service._id) {
      await fetch(`/api/${_id}/s/update/${service._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(service),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            alert("Service Updated Successfully");
            setService({});
            history.push("/hospital/dashboard");
          }
        })
        .catch((err) => console.log(err));
    } else {
      await fetch(`/api/${_id}/s/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(service),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("SERVICE: ", service);
          if (data.error) {
            console.log(data.error);
          } else {
            alert(`${data.name} Created Successfully`);
            setService({});
            history.push("/hospital/dashboard");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (location.state) {
      setService(location.state);
    }
  }, []);
  return (
      <div className="min-vh-100">
        <div className="my-2">
          <h2 className="text-center bg-primary text-white py-2">
            Add/Edit Service
          </h2>
        </div>
        <div className=" w-100 d-flex flex-column justify-content-center align-items-center">
          <form className="mb-3 w-50">
            Service name:{" "}
            <input
              type="text"
              placeholder="name"
              className="form-control"
              value={name}
              onChange={(e) => {
                setService({
                  ...service,
                  name: e.target.value,
                });
              }}
            />
          </form>
          <form className="mb-3 w-50">
            Price:
            <input
              type="number"
              placeholder="price"
              className="form-control"
              value={price}
              onChange={(e) => {
                setService({
                  ...service,
                  price: e.target.value,
                });
              }}
            />
          </form>

          <form className="mb-3 w-50">
            Quantity:
            <input
              type="number"
              placeholder="quantity"
              className="form-control"
              value={quantity}
              onChange={(e) => {
                setService({
                  ...service,
                  quantity: e.target.value,
                });
              }}
            />
          </form>
          <form className="mb-3 w-50">
            Time:
            <input
              type="number"
              placeholder="time"
              className="form-control"
              value={time}
              onChange={(e) => {
                setService({
                  ...service,
                  time: e.target.value,
                });
              }}
            />
          </form>
        </div>
        <br />
        <br />
        <div className="text-center mb-3">
          <button type="submit" className="btn btn-primary"   onClick={(e) => {
                e.preventDefault();
                createService();
              }}>
             Add Service
          </button>
        </div>
        <div className="text-center">
          <Link to="/hospital/dashboard">
            <button className="btn btn-warning">GO Back TO Dashboard</button>
          </Link>
        </div>
      {/* <input type="text" placeholder="name" value={name} onChange={(e) => {
        setService({
          ...service,
          name: e.target.value
        })
      }}/>  
      <input type="number" placeholder="price" value={price} onChange={(e) => {
        setService({
          ...service,
          price: e.target.value
        })
      }}/>
      <input type="text" placeholder="quantity" value={quantity} onChange={(e) => {
        setService({
          ...service,
                  quantity: e.target.value
                })
              }}/>
              <input type="text" placeholder="time" value={time} onChange={(e) => {
                setService({
                  ...service,
                  time: e.target.value
                })
              }}/>
              <button onClick={(e) => {
                e.preventDefault();
                createService();
              }}>Create Service</button>   */}
              </div>
  );
};

export default Service;
