import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Patient = () => {
  const [patient, setPatient] = useState();
  const [bookings, setBookings] = useState([]);
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
          console.log(data.error);
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
      <header className="u-clearfix u-header u-header" id="sec-5a48">
        <div className="u-clearfix u-sheet u-sheet-1">
          <nav className="u-menu u-menu-dropdown u-offcanvas u-menu-1">
            <div
              className="menu-collapse"
              style={{ fontSize: "1rem", letterSpacing: "0" }}
            >
              <a
                className="u-button-style u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
                href="#"
              ></a>
            </div>
            <div className="u-custom-menu u-nav-container">
              <ul className="u-nav u-unstyled u-nav-1">
                <li className="u-nav-item">
                  <a
                    className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
                    href="Home.html"
                    style={{ padding: "10px 20px" }}
                  >
                    Home
                  </a>
                </li>
                <li className="u-nav-item">
                  <a
                    className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
                    href="Contact.html"
                    style={{ padding: "10px 20px" }}
                  >
                    Contact
                  </a>
                </li>
                <li className="u-nav-item">
                  <a
                    className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
                    style={{ padding: "10px 20px" }}
                  >
                    Register
                  </a>
                </li>
              </ul>
            </div>
            <div className="u-custom-menu u-nav-container-collapse">
              <div className="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
                <div className="u-inner-container-layout u-sidenav-overflow">
                  <div className="u-menu-close"></div>
                  <ul className="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2">
                    <li className="u-nav-item">
                      <a
                        className="u-button-style u-nav-link"
                        href="Home.html"
                        style={{ padding: "10px 20px" }}
                      >
                        Home
                      </a>
                    </li>
                    <li className="u-nav-item">
                      <a
                        className="u-button-style u-nav-link"
                        href="Contact.html"
                        style={{ padding: "10px 20px" }}
                      >
                        Contact
                      </a>
                    </li>
                    <li className="u-nav-item">
                      <a
                        className="u-button-style u-nav-link"
                        style={{ padding: "10px 20px" }}
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="u-black u-menu-overlay u-opacity u-opacity-70"></div>
            </div>
          </nav>
          <a href="https://nicepage.com" className="u-image u-logo u-image-1">
            <img
              src="images/default-logo.png"
              className="u-logo-image u-logo-image-1"
            />
          </a>
        </div>
      </header>
      <section className="u-align-center u-clearfix u-section-1" id="sec-c8d6">
        <div className="u-clearfix u-sheet u-sheet-1">
          <div className="u-expanded-width u-tabs u-tabs-1">
            <ul
              className="u-border-1 u-border-grey-25 u-tab-list u-unstyled"
              role="tablist"
            >
              <li className="u-tab-item" role="presentation">
                <a
                  className="active u-active-white u-border-2 u-border-active-grey-15 u-border-hover-grey-15 u-border-no-bottom u-button-style u-tab-link u-text-active-palette-2-base u-text-hover-black u-tab-link-1"
                  id="link-tab-0da5"
                  href="#tab-0da5"
                  role="tab"
                  aria-controls="tab-0da5"
                  aria-selected="true"
                >
                  User Details
                </a>
              </li>
              {/* <li className="u-tab-item" role="presentation">
                <a
                  className="u-active-white u-border-2 u-border-active-grey-15 u-border-hover-grey-15 u-border-no-bottom u-button-style u-tab-link u-text-active-palette-2-base u-text-hover-black u-tab-link-2"
                  id="link-tab-14b7"
                  href="#tab-14b7"
                  role="tab"
                  aria-controls="tab-14b7"
                  aria-selected="false"
                >
                  User Contacts
                </a>
              </li>
              <li className="u-tab-item" role="presentation">
                <a
                  className="u-active-white u-border-2 u-border-active-grey-15 u-border-hover-grey-15 u-border-no-bottom u-button-style u-tab-link u-text-active-palette-2-base u-text-hover-black u-tab-link-3"
                  id="link-tab-2917"
                  href="#tab-2917"
                  role="tab"
                  aria-controls="tab-2917"
                  aria-selected="false"
                >
                  Logs
                </a>
              </li> */}
            </ul>
            <div className="u-tab-content">
              <div
                className="u-container-style u-tab-active u-tab-pane u-white u-tab-pane-1"
                id="tab-0da5"
                role="tabpanel"
                aria-labelledby="link-tab-0da5"
              >
                <div className="u-container-layout u-valign-top u-container-layout-1">
                  <img
                    alt=""
                    className="u-expanded-width-xs u-image u-image-default u-image-1"
                    data-image-width="1280"
                    data-image-height="1280"
                    src="images/2105404bdcfb7d4abc44062b2cea75d3d2bdf9024322a124fbff811235bb2ff7b66fa04d909fc5011eb7387a554664bc334c68ba1d425358fb618f_1280.png"
                  />
                  <h4 className="u-text u-text-1">{patient?.name}</h4>
                  <p className="u-text u-text-2">
                    Date of Birth : {patient?.dob}
                    <br />
                    Blood group : {patient?.bloodgroup}
                    <br />
                    Medical History : None
                    <br />
                  </p>
                  <h5 className="u-text u-text-3">
                    {" "}
                    {patient?.locality}
                    <br />
                    {patient?.city}
                    <br />
                    {/* style={{fontSize: "1.125rem",color: "#111111", fontFamily: "'Open Sans',sans-serif", background-color: "#ffffff"}} */}
                    <span>{patient?.state}</span>
                    <span>INDIA</span>
                  </h5>
                </div>
              </div>
              <div
                className="u-container-style u-tab-pane u-white u-tab-pane-2"
                id="tab-14b7"
                role="tabpanel"
                aria-labelledby="link-tab-14b7"
              >
                <div className="u-container-layout u-container-layout-2">
                  <h3 className="u-text u-text-default u-text-4">
                    Phone number -&nbsp;
                  </h3>
                  <a
                    href="https://nicepage.com/html-templates"
                    className="u-active-none u-btn u-btn-rectangle u-button-style u-hover-none u-none u-radius-0 u-text-body-color u-btn-1"
                  >
                    <span className="u-icon">
                      <img />
                    </span>
                    &nbsp;+1 (234) 567-8910
                  </a>
                  <h3 className="u-text u-text-default u-text-5">
                    Email - JamesCarey@gmail.com
                  </h3>
                </div>
              </div>
              <div
                className="u-container-style u-tab-pane u-white u-tab-pane-3"
                id="tab-2917"
                role="tabpanel"
                aria-labelledby="link-tab-2917"
              >
                <div className="u-container-layout u-container-layout-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="u-align-center u-clearfix u-section-2" id="sec-9017">
        <div className="u-clearfix u-sheet u-sheet-1">
          <Link to="/booking/create">
          <button className="u-active-none u-border-2 u-border-palette-1-base u-btn u-btn-rectangle u-button-style u-hover-none u-none u-radius-0 u-btn-1">
            Book service
          </button>
          </Link>
          {/* <a
            href="https://nicepage.dev"
            className="u-active-none u-border-2 u-border-palette-1-base u-btn u-btn-rectangle u-button-style u-hover-none u-none u-radius-0 u-btn-2"
          >
            Remove Service
          </a> */}
          <div className="u-expanded-width u-table u-table-responsive u-table-1">
            <table className="u-table-entity u-table-entity-1">
              <colgroup>
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
              </colgroup>
              <tbody className="u-table-alt-palette-1-light-3 u-table-body">
                <tr style={{ height: "65px" }}>
                  <td className="u-table-cell u-table-cell-1">Service</td>
                  <td className="u-table-cell u-table-cell-2">
                    Service Booking Date
                  </td>
                  <td className="u-table-cell u-table-cell-3">Hospital name</td>
                  {/* <td className="u-table-cell u-table-cell-4">
                    Completed/Pending
                  </td> */}
                </tr>
                {bookings.map((booking, index) => {
                  return (
                    <tr style={{ height: "65px" }}>
                      <td className="u-table-cell">{booking.service}</td>
                      <td className="u-table-cell">{booking.date}</td>
                      <td className="u-table-cell">{booking.hospital}</td>
                      <td className="u-table-cell">
                        <button>Edit</button>
                      </td>
                      <td className="u-table-cell">
                        <button
                          onClick={() => {
                            deleteBooking(booking._id);
                            setRefresh(!refresh);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                      {/* <td className="u-table-cell u-table-cell-8"></td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <footer className="u-clearfix u-footer u-grey-80" id="sec-2164">
        <div className="u-clearfix u-sheet u-sheet-1">
          <div className="u-align-left u-social-icons u-spacing-10 u-social-icons-1">
            <a
              className="u-social-url"
              title="facebook"
              target="_blank"
              href=""
            >
              <span className="u-icon u-social-facebook u-social-icon u-icon-1"></span>
            </a>
            <a className="u-social-url" title="twitter" target="_blank" href="">
              <span className="u-icon u-social-icon u-social-twitter u-icon-2"></span>
            </a>
            <a
              className="u-social-url"
              title="instagram"
              target="_blank"
              href=""
            >
              <span className="u-icon u-social-icon u-social-instagram u-icon-3"></span>
            </a>
            <a
              className="u-social-url"
              title="linkedin"
              target="_blank"
              href=""
            >
              <span className="u-icon u-social-icon u-social-linkedin u-icon-4"></span>
            </a>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Patient;
