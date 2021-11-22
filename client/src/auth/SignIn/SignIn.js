import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./nicepage.css";
import "./SignIn.css";
const SignIn = ({ history }) => {
  const [patient, setPatient] = useState({
    email: "",
    password: "",
  });
  const [hospital, setHospital] = useState({
    h_email: "",
    h_password: "",
  });
  const { email, password } = patient;
  const { h_email, h_password } = hospital;
  const p_signin = async () => {
    await fetch("/api/p/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    })
      .then((res) => {
        console.log("PSIGNIN: ", res);
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          localStorage.setItem("p-jwt", JSON.stringify(data));
          performRedirect();
        }
      })
      .catch((err) => console.log(err));
    setPatient({
      email: "",
      password: "",
    });
    alert("Logged In Successfully. Welcome to the dashboard");
    return <Redirect to="/patient/dashboard" />;
  };

  const h_signin = async () => {
    await fetch("/api/h/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    })
      .then((res) => {
        console.log("PSIGNIN: ", res);
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("h-jwt", JSON.stringify(data));
        performRedirect();
      })
      .catch((err) => console.log(err));
    setPatient({
      email: "",
      password: "",
    });
    alert("Logged In Successfully. Welcome to the dashboard");
  };

  const performRedirect = () => {
    if (localStorage.getItem("p-jwt")) {
      return <Redirect to="/patient/dashboard" />;
    } else if (localStorage.getItem("h-jwt")) {
      return <Redirect to="/hospital/dashboard" />;
    }
  };

  return (
    <section
      className="u-align-center u-clearfix u-image u-shading u-section-1"
      data-image-width="2000"
      data-image-height="1333"
      id="sec-2136"
    >
      <div className="u-clearfix u-sheet u-sheet-1">
        <a
          href="#https://nicepage.com"
          className="u-border-2 u-border-white u-btn u-button-style u-dialog-link u-hover-black u-none u-text-black u-text-hover-white u-btn-1"
          data-animation-name="fadeIn"
          data-animation-duration="1000"
          data-animation-delay="0"
        >
          Register<span style={{ fontSize: "1.875rem" }}></span>
        </a>
        <div className="u-clearfix u-layout-wrap u-layout-wrap-1">
          <div className="u-layout">
            <div className="u-layout-row">
              <div className="u-container-style u-layout-cell u-size-30 u-layout-cell-1">
                <div className="u-container-layout u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-container-layout-1">
                  <h3 className="u-text u-text-default u-text-1">Hospital</h3>
                  <div className="u-form u-login-control u-form-1">
                    <form
                      className="u-clearfix u-form-custom-backend u-form-spacing-30 u-form-vertical u-inner-form"
                      name="form-4"
                      style={{ padding: "0" }}
                    >
                      <div className="u-form-group u-form-name">
                        <label className="u-form-control-hidden u-label"></label>
                        <input
                          type="text"
                          placeholder="Enter your Email"
                          id="username-22e3"
                          className="u-border-1 u-border-white u-input u-input-rectangle u-radius-50 u-white"
                          value={h_email}
                          onChange={(e) => {
                            setHospital({...hospital, h_email: e.target.value});
                          }}
                        />
                      </div>
                      <div className="u-form-group u-form-password">
                        <label
                          for="password-22e3"
                          className="u-form-control-hidden u-label"
                        ></label>
                        <input
                          type="text"
                          placeholder="Enter your Password"
                          id="password-22e3"
                          className="u-border-1 u-border-white u-input u-input-rectangle u-radius-50 u-white"
                          value={h_password}
                          onChange={(e) => {
                            setHospital({...hospital, h_password: e.target.value});
                          }}
                        />
                      </div>
                      <div className="u-form-checkbox u-form-group">
                        <input
                          type="checkbox"
                          id="checkbox-22e3"
                          name="remember"
                          value="On"
                        />
                        <label for="checkbox-22e3" className="u-label">
                          Remember me
                        </label>
                      </div>
                      <div className="u-align-left u-form-group u-form-submit">
                        <button
                          href="#"
                          className="u-btn u-btn-round u-btn-submit u-button-style u-radius-50 u-btn-2"
                          onClick={(e) => {
                            e.preventDefault();
                            h_signin();
                            history.push("/hospital/dashboard");
                          }}
                        >
                          Login as Hospital
                        </button>
                        <input
                          type="submit"
                          value="submit"
                          className="u-form-control-hidden"
                        />
                      </div>
                      <input type="hidden" value="" name="recaptchaResponse" />
                    </form>
                  </div>
                </div>
              </div>
              <div className="u-align-left u-container-style u-layout-cell u-size-30 u-layout-cell-2">
                <div className="u-container-layout u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-container-layout-2">
                  <h3 className="u-text u-text-default u-text-2">Patient</h3>
                  <div className="u-expanded-width u-form u-login-control u-form-2">
                    <form
                      className="u-clearfix u-form-custom-backend u-form-spacing-30 u-form-vertical u-inner-form"
                      source="custom"
                      name="form-4"
                      style={{ padding: "0px" }}
                    >
                      <div className="u-form-group u-form-name">
                        <label
                          for="username-22e3"
                          className="u-form-control-hidden u-label"
                        ></label>
                        <input
                          type="text"
                          placeholder="Enter your Username"
                          id="username-22e3"
                          name="username"
                          className="u-border-1 u-border-white u-input u-input-rectangle u-radius-50 u-white"
                          value={email}
                          onChange={(e) => {
                            setPatient({ ...patient, email: e.target.value });
                          }}
                        />
                      </div>
                      <div className="u-form-group u-form-password">
                        <label
                          for="password-22e3"
                          className="u-form-control-hidden u-label"
                        ></label>
                        <input
                          type="text"
                          placeholder="Enter your Password"
                          id="password-22e3"
                          className="u-border-1 u-border-white u-input u-input-rectangle u-radius-50 u-white"
                          value={password}
                          onChange={(e) => {
                            setPatient({
                              ...patient,
                              password: e.target.value,
                            });
                          }}
                        />
                      </div>
                      <div className="u-form-checkbox u-form-group">
                        <input
                          type="checkbox"
                          id="checkbox-22e3"
                          name="remember"
                          value="On"
                        />
                        <label for="checkbox-22e3" className="u-label">
                          Remember me
                        </label>
                      </div>
                      <div className="u-align-left u-form-group u-form-submit">
                        <button
                          href="#"
                          className="u-btn u-btn-round u-btn-submit u-button-style u-radius-50 u-btn-3"
                          onClick={(e) => {
                            e.preventDefault();
                            p_signin();
                            history.push("/patient/dashboard");
                          }}
                        >
                          Login as Patient
                        </button>
                        <input
                          type="submit"
                          value="submit"
                          className="u-form-control-hidden"
                        />
                      </div>
                      <input type="hidden" value="" name="recaptchaResponse" />
                    </form>
                  </div>
                  <a
                    href=""
                    className="u-border-1 u-border-active-palette-2-base u-border-hover-palette-1-base u-btn u-button-style u-login-control u-login-forgot-password u-none u-text-body-alt-color u-btn-4"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
