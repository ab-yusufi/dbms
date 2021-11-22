import React, {useState} from 'react'

const Service = ({history}) => {
    const [service, setService] = useState({
        name: "Service 3",
        price: 2000,
        quantity: "",
        time: ""
    })
    const {name, price, quantity, time} = service;

    const createService = async () => {
        const {user, token} = JSON.parse(localStorage.getItem("h-jwt"));
        const {_id} = user;
        await fetch(`/api/${_id}/s/create`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(service)
        })
        .then(res => res.json())
        .then(data => {
            console.log("SERVICE: ", service);
            if(data.error){
                console.log(data.error);
            } else {
                alert(`${data.name} Created Successfully`)
                history.push("/hospital/dashboard")
            }

        })
        .catch(err => console.log(err))
    }
    return (
        <div>
          <input type="text" placeholder="name" value={name} onChange={(e) => {
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
          }}>Create Service</button>  
        </div>
    )
}

export default Service
