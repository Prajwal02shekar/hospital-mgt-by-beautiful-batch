import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';

const Doctors = () => {
  let [doctorsData,setDoctorsData]=useState({
    doctorName:"",
    specialization:"",
    imageUrl:""
  })
  let {doctorName,specialization,imageUrl}=doctorsData;

  
  const api="http://localhost:3000/doctors";

  let handleAddDoctors=(e)=>{
    e.preventDefault();
    if(!doctorName || !specialization || !imageUrl){
      toast.warn("All Fields are required!")
      return;
    }

    axios.post(api,doctorsData);
    toast.success("Doctors Added")
  }

  let handleChange=(e)=>{
    let {name,value}=e.target;
    setDoctorsData({...doctorsData,[name]:value})
  }

  return (
    <section className="doctors-container">
      <ToastContainer/>
      <h1>Doctors Page</h1>
      <form className="doctors-form" onSubmit={handleAddDoctors}>
        <input type="text" placeholder='Enter Doctor Name' name="doctorName"   onChange={handleChange} />
        <input type="text" placeholder='Specialization' name="specialization"  onChange={handleChange}  />
        <input type="text" placeholder='Image URL' name="imageUrl" onChange={handleChange}   />
        <button type='submit'>Add Doctor</button>
      </form>
    </section>
  )
}

export default Doctors
