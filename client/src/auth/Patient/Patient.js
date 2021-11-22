import React, { Fragment, useState, useEffect } from "react";

const Patient = () => {
  const [patient, setPatient] = useState();
  const getPatientById = async () => {
    const {user, token} = JSON.parse(localStorage.getItem("p-jwt"));
    const {_id} = user;
    await fetch(`/api/p/${_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then(res => {
        return res.json()
    }).then(data => {
        console.log("Patient: ",JSON.stringify(data))
        setPatient(data)
    })
    .catch(err => console.log(err))

  }

  useEffect(() => {
      getPatientById();
  }, [patient])
    return (
    <Fragment>
      <header class="u-clearfix u-header u-header" id="sec-5a48">
        <div class="u-clearfix u-sheet u-sheet-1">
          <nav class="u-menu u-menu-dropdown u-offcanvas u-menu-1">
            <div
              class="menu-collapse"
              style={{fontSize: "1rem", letterSpacing: "0"}}
            >
              <a
                class="u-button-style u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
                href="#"
              >
                
              </a>
            </div>
            <div class="u-custom-menu u-nav-container">
              <ul class="u-nav u-unstyled u-nav-1">
                <li class="u-nav-item">
                  <a
                    class="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
                    href="Home.html"
                    style={{padding: "10px 20px"}}
                  >
                    Home
                  </a>
                </li>
                <li class="u-nav-item">
                  <a
                    class="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
                    href="Contact.html"
                    style={{padding: "10px 20px"}}
                  >
                    Contact
                  </a>
                </li>
                <li class="u-nav-item">
                  <a
                    class="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
                    style={{padding: "10px 20px"}}
                  >
                    Register
                  </a>
                </li>
              </ul>
            </div>
            <div class="u-custom-menu u-nav-container-collapse">
              <div class="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
                <div class="u-inner-container-layout u-sidenav-overflow">
                  <div class="u-menu-close"></div>
                  <ul class="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2">
                    <li class="u-nav-item">
                      <a
                        class="u-button-style u-nav-link"
                        href="Home.html"
                        style={{padding: "10px 20px"}}
                      >
                        Home
                      </a>
                    </li>
                    <li class="u-nav-item">
                      <a
                        class="u-button-style u-nav-link"
                        href="Contact.html"
                        style={{padding: "10px 20px"}}
                      >
                        Contact
                      </a>
                    </li>
                    <li class="u-nav-item">
                      <a
                        class="u-button-style u-nav-link"
                        style={{padding: "10px 20px"}}
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="u-black u-menu-overlay u-opacity u-opacity-70"></div>
            </div>
          </nav>
          <a href="https://nicepage.com" class="u-image u-logo u-image-1">
            <img
              src="images/default-logo.png"
              class="u-logo-image u-logo-image-1"
            />
          </a>
        </div>
      </header>
      <section class="u-align-center u-clearfix u-section-1" id="sec-c8d6">
        <div class="u-clearfix u-sheet u-sheet-1">
          <div class="u-expanded-width u-tabs u-tabs-1">
            <ul
              class="u-border-1 u-border-grey-25 u-tab-list u-unstyled"
              role="tablist"
            >
              <li class="u-tab-item" role="presentation">
                <a
                  class="active u-active-white u-border-2 u-border-active-grey-15 u-border-hover-grey-15 u-border-no-bottom u-button-style u-tab-link u-text-active-palette-2-base u-text-hover-black u-tab-link-1"
                  id="link-tab-0da5"
                  href="#tab-0da5"
                  role="tab"
                  aria-controls="tab-0da5"
                  aria-selected="true"
                >
                  User Details
                </a>
              </li>
              {/* <li class="u-tab-item" role="presentation">
                <a
                  class="u-active-white u-border-2 u-border-active-grey-15 u-border-hover-grey-15 u-border-no-bottom u-button-style u-tab-link u-text-active-palette-2-base u-text-hover-black u-tab-link-2"
                  id="link-tab-14b7"
                  href="#tab-14b7"
                  role="tab"
                  aria-controls="tab-14b7"
                  aria-selected="false"
                >
                  User Contacts
                </a>
              </li>
              <li class="u-tab-item" role="presentation">
                <a
                  class="u-active-white u-border-2 u-border-active-grey-15 u-border-hover-grey-15 u-border-no-bottom u-button-style u-tab-link u-text-active-palette-2-base u-text-hover-black u-tab-link-3"
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
            <div class="u-tab-content">
              <div
                class="u-container-style u-tab-active u-tab-pane u-white u-tab-pane-1"
                id="tab-0da5"
                role="tabpanel"
                aria-labelledby="link-tab-0da5"
              >
                <div class="u-container-layout u-valign-top u-container-layout-1">
                  <img
                    alt=""
                    class="u-expanded-width-xs u-image u-image-default u-image-1"
                    data-image-width="1280"
                    data-image-height="1280"
                    src="images/2105404bdcfb7d4abc44062b2cea75d3d2bdf9024322a124fbff811235bb2ff7b66fa04d909fc5011eb7387a554664bc334c68ba1d425358fb618f_1280.png"
                  />
                  <h4 class="u-text u-text-1">{patient?.name}</h4>
                  <p class="u-text u-text-2">
                    Date of Birth : {patient?.dob}
                    <br />
                    Blood group : {patient?.bloodgroup}
                    <br />
                    Medical History : None
                    <br />
                  </p>
                  <h5 class="u-text u-text-3">
                    {" "}
                    {patient?.locality}
                    <br />
                    {patient?.city}
                    <br />
                    {/* style={{fontSize: "1.125rem",color: "#111111", fontFamily: "'Open Sans',sans-serif", background-color: "#ffffff"}} */}
                    <span >
                      {patient?.state}
                    </span>
                    <span>
                      INDIA
                    </span>
                  </h5>
                </div>
              </div>
              <div
                class="u-container-style u-tab-pane u-white u-tab-pane-2"
                id="tab-14b7"
                role="tabpanel"
                aria-labelledby="link-tab-14b7"
              >
                <div class="u-container-layout u-container-layout-2">
                  <h3 class="u-text u-text-default u-text-4">
                    Phone number -&nbsp;
                  </h3>
                  <a
                    href="https://nicepage.com/html-templates"
                    class="u-active-none u-btn u-btn-rectangle u-button-style u-hover-none u-none u-radius-0 u-text-body-color u-btn-1"
                  >
                    <span class="u-icon">
                     
                      <img />
                    </span>
                    &nbsp;+1 (234) 567-8910
                  </a>
                  <h3 class="u-text u-text-default u-text-5">
                    Email - JamesCarey@gmail.com
                  </h3>
                </div>
              </div>
              <div
                class="u-container-style u-tab-pane u-white u-tab-pane-3"
                id="tab-2917"
                role="tabpanel"
                aria-labelledby="link-tab-2917"
              >
                <div class="u-container-layout u-container-layout-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="u-clearfix u-footer u-grey-80" id="sec-2164">
        <div class="u-clearfix u-sheet u-sheet-1">
          <div class="u-align-left u-social-icons u-spacing-10 u-social-icons-1">
            <a class="u-social-url" title="facebook" target="_blank" href="">
              <span class="u-icon u-social-facebook u-social-icon u-icon-1">
                
                
              </span>
            </a>
            <a class="u-social-url" title="twitter" target="_blank" href="">
              <span class="u-icon u-social-icon u-social-twitter u-icon-2">
                
              </span>
            </a>
            <a class="u-social-url" title="instagram" target="_blank" href="">
              <span class="u-icon u-social-icon u-social-instagram u-icon-3">
                
              </span>
            </a>
            <a class="u-social-url" title="linkedin" target="_blank" href="">
              <span class="u-icon u-social-icon u-social-linkedin u-icon-4">
                
              </span>
            </a>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Patient;
