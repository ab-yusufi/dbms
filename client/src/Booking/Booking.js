import React, { useState, useEffect } from "react";

const Booking = ({ history, location }) => {
  const [hospitals, setHospitals] = useState([]);
  const [singleHospital, setSingleHospital] = useState();
  const [singleService, setSingleService] = useState();
  const [services, setServices] = useState([]);
  const [booking, setBooking] = useState({
    patient: "",
    date: "",
    hospital: "",
    service: "",
  });
  const [refresh, setRefresh] = useState(false);

  const { date, patient, service, hospital } = booking;

  const getPatient = () => {
    const { user } = JSON.parse(localStorage.getItem("p-jwt"));
    setBooking({ ...booking, patient: user._id });
  };

  const getBooking = () => {
    setRefresh(!refresh);
    setBooking({
      _id: location.state._id,
      patient: location.state.patient,
      date: location.state.date.substr(10),
      hospital: location.state.hospital,
      service: location.state.service
    });
  };

  const getHospitalById = async () => {
    if(location.state){
      await fetch(`/api/h/${location.state.hospital}`, {
        method: "GET"
      }).then(res => res.json())
      .then(data => {
        if(data.error){
          alert(data.error)
        } else {
         setSingleHospital(data); 
          
        }
      })
    }
  }

  const getServiceById = async () => {
    if(location.state){
      await fetch(`/api/service/${location.state.service}`, {
        method: "GET"
      }).then(res => res.json())
      .then(data => {
        if(data.error){
          alert(data.error)
        } else {
         setSingleService(data);  
        }
      })
    }
  }

  const getAllHospitals = async () => {
    fetch(`/api/hospitals`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setHospitals(data);
        }
      })
      .catch((err) => console.log(err));
  };

  const getServicesByHospital = async (id) => {
    const { user, token } = JSON.parse(localStorage.getItem("h-jwt"));
    const { _id } = user;
    await fetch(`/api/${id}/services`, {
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

  const createBooking = async () => {
    const { user, token } = JSON.parse(localStorage.getItem("p-jwt"));

    await fetch(`/api/${patient}/${service}/b/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          history.push("/patient/dashboard");
        }
      });
  };

  useEffect(() => {
    getAllHospitals();
    getPatient();
    getHospitalById();
    if(location.state){
      setBooking(location.state);
      setBooking({ ...booking, date: location.state.date.substr(0, 10) });
    }
    
  }, [refresh]);
  return (
    <section
      className="u-align-center u-clearfix u-image u-section-1"
      id="carousel_b36e"
      data-image-width="810"
      data-image-height="1080"
    >
      <div className="my-2">
          <h2 className="text-center bg-primary text-white py-2">
            Get Your Services Here
          </h2>
        </div>
      <div className="u-clearfix u-sheet u-sheet-1">
        <div className="u-palette-3-base u-shape u-shape-rectangle u-shape-1"></div>
        <div className="u-container-style u-group u-radius-50 u-shape-round u-white u-group-1">
          <div className="u-container-layout u-container-layout-1">
            <h2 className="u-align-center u-custom-font u-font-montserrat u-text u-text-1">
              Select Your Services
            </h2>
            <div className="u-form u-form-1">
              <form
                action="#"
                method="POST"
                className="u-clearfix u-form-spacing-13 u-form-vertical u-inner-form"
                style={{ padding: "0" }}
                source="custom"
                name="form"
              >
                <div className="u-form-email u-form-group u-form-partition-factor-2">
                  <label className="u-label u-label-1">Hospital Name</label>
                  <select
                    className="u-grey-5 u-input u-input-rectangle u-input-1"
                    value={location.state?.hospital}
                    onChange={(e) => {
                      getServicesByHospital(e.target.value);
                      setBooking({ ...booking, hospital: e.target.value });
                      setRefresh(!refresh);
                    }}
                  >
                    {hospitals.map((hospital, index) => (
                      <option value={hospital._id}>{hospital.name}</option>
                    ))}
                  </select>
                  {/* <input type="email" placeholder="" id="email-f18c" name="email" className="u-grey-5 u-input u-input-rectangle u-input-1" required=""/> */}
                </div>
                <div className="u-form-group u-form-name u-form-partition-factor-2">
                  <label className="u-label u-label-2">Services</label>
                  <select
                    className="u-grey-5 u-input u-input-rectangle u-input-1"
                    value={location.state?.service}
                    onChange={(e) => {
                      setBooking({ ...booking, service: e.target.value });
                    }}
                  >
                    {services.map((service, index) => (
                      <option value={service._id}>{service.name}</option>
                    ))}
                  </select>
                  {/* <input type="text" placeholder="Enter your Name" id="name-f18c" name="name" className="u-grey-5 u-input u-input-rectangle u-input-2" required=""/> */}
                </div>
                
                <div className="u-form-date u-form-group u-form-partition-factor-1 u-form-group-4">
                  <label className="u-label u-label-4">Date</label>
                  <input
                    type="date"
                    placeholder=""
                    id="date-33f9"
                    value={date}
                    className="u-grey-5 u-input u-input-rectangle u-input-4"
                    onChange={(e) => {
                      setBooking({ ...booking, date: e.target.value });
                    }}
                  />
                </div>
               
                <div className="u-align-center u-form-group u-form-submit">
                  <button
                    className="u-border-none u-btn u-btn-submit u-button-style u-palette-3-base u-btn-1"
                    onClick={(e) => {
                      e.preventDefault();
                      createBooking();
                    }}
                  >
                    Add
                  </button>
                  
                  <input
                    type="submit"
                    value="submit"
                    className="u-form-control-hidden"
                    wfd-invisible="true"
                  />
                </div>
                <button
                    className="u-border-none u-btn u-btn-submit u-button-style u-palette-3-base u-btn-1"
                    onClick={(e) => {
                      e.preventDefault();
                      history.push("/patient/dashboard");
                    }}
                  >
                    Back To Dashboard
                  </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
