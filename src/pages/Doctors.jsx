import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';

const Doctors = () => {

  let api = "http://localhost:3000/doctors";

  let [formData, setFormData] = useState({
    doctorName: "",
    specialization: "",
    imageUrl: ""
  })
  let [doctors, setDoctors] = useState([]);
  let [editingId, setEditingId] = useState(null);

  let fetchDoctors = async () => {
    let res = await axios.get(api);
    console.log(res.data)
    setDoctors(res.data)
  }

  useEffect(() => {
    fetchDoctors()
  }, [])

  let handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }
  let { doctorName, specialization, imageUrl } = formData;


  let handleAddDoctors = (e) => {
    e.preventDefault();
    if (!doctorName || !specialization || !imageUrl) {
      toast.warn("All Fields are Required!!!")
      return;
    }


    if (editingId) {
      axios.put(`${api}/${editingId}`, formData)
      toast.success("Doctors Data Updated Successfully")
    }
    else {
      axios.post(api, formData)
      toast.success("Doctor Added")
      setFormData({
        doctorName: "",
        specialization: "",
        imageUrl: ""
      })
      fetchDoctors();
      setEditingId(null)
    }

  }
  let handleEditDoctor = (doct) => {
    setFormData(doct)
    setEditingId(doct.id)
  }

  let handleDelete=(id)=>{
    axios.delete(`${api}/${id}`)
    toast.success("Doctor Data Deleted Successfully")
  }
  return (
    <section className="doctors-container">
      <h1>Doctors</h1>
      <ToastContainer />
      <form className="doctors-form" onSubmit={handleAddDoctors}>
        <input type="text" placeholder='Enter Doctor Name' name='doctorName' onChange={handleChange} value={doctorName} />
        <input type="text" placeholder='specialization' name='specialization' onChange={handleChange} value={specialization} />
        <input type="text" placeholder='Enter Image URL' name='imageUrl' onChange={handleChange} value={imageUrl} />
        <button>{editingId ? "Update Doctor" : "Add Doctor"}</button>
      </form>


      <main className="doctors-list">
        {
          doctors.map((doct) => {
            console.log(doct)
            return (
              <aside className="doctors-card">
                <img src={doct.imageUrl} alt={doct.doctorName} />
                <h2>{doct.doctorName}</h2>
                <p>{doct.specialization}</p>
                <article className="doctor-action">
                  <button className='editBtn' onClick={() => { handleEditDoctor(doct) }} >Edit Doctor</button>
                  <button className='deleteBtn' onClick={()=>handleDelete(doct.id)}>Delete Doctor</button>
                </article>
              </aside>
            )
          })
        }
      </main>
    </section>
  )
}

export default Doctors
