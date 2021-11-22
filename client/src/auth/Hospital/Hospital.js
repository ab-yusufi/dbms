import React,{useState, useEffect, Fragment} from "react";

const Hospital = () => {
  const [hospital, setHospital] = useState();
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

  useEffect(() => {
    getHospitalById();
  }, [hospital]);
  return <div>{JSON.stringify(hospital)}</div>;
};

export default Hospital;
