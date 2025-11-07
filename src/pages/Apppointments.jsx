import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Appointments = () => {
  const navigate = useNavigate()
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
  const [editId, setEditId] = useState(null)

  const [formData, setFormData] = useState({
    doctorId: "",
    patientName: "",
    disease: "",
    date: "",
    time: ""
  })

  const { doctorId, patientName, disease, date, time } = formData

  const doctorApi = "http://localhost:3000/doctors"
  const appointmentsApi = "http://localhost:3000/appointments"

  const getDoctorsData = async () => {
    const res = await axios.get(doctorApi)
    setDoctors(res.data)
  }

  const getAppointmentsData = async () => {
    const res = await axios.get(appointmentsApi)
    setAppointments(res.data)
  }

  useEffect(() => {
    getDoctorsData()
    getAppointmentsData()
  }, [])

  const ListOfDisease = [
    "Heart Disease",
    "Chest Pain",
    "Cough",
    "Fever",
    "Stomach Pain",
    "Eye Problem",
    "Joint Pain"
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!doctorId || !patientName || !disease || !date || !time) {
      toast.warn("All fields are required!")
      return
    }

    if (editId) {
      await axios.put(`${appointmentsApi}/${editId}`, formData)
      toast.success("Appointment Updated Successfully")
      setEditId(null)
    } else {
      await axios.post(appointmentsApi, formData)
      toast.success("Appointment Created Successfully")
    }

    setFormData({
      doctorId: "",
      patientName: "",
      disease: "",
      date: "",
      time: ""
    })

    getAppointmentsData()
    setTimeout(() => navigate("/appointments"), 1000)
  }

  const handleEdit = (data) => {
    setEditId(data.id)
    setFormData({
      doctorId: data.doctorId,
      patientName: data.patientName,
      disease: data.disease,
      date: data.date,
      time: data.time
    })
    toast.info("Editing Appointment...")
  }

  const handleDelete = async (id) => {
    await axios.delete(`${appointmentsApi}/${id}`)
    toast.success("Appointment Deleted Successfully")
    setAppointments((prev) => prev.filter((a) => a.id !== id))
  }

  return (
    <main className="appointment-page">
      <ToastContainer />
      <h1>Manage Appointments</h1>

      <form className="appointments-form" onSubmit={handleSubmit}>
        <select name="doctorId" value={doctorId} onChange={handleChange}>
          <option value="">-- Select Doctor --</option>
          {doctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.doctorName}
            </option>
          ))}
        </select>

        <input type="text" name="patientName" placeholder="Enter Patient Name" value={patientName} onChange={handleChange}
        />

        <select name="disease" value={disease} onChange={handleChange}>
          <option value="">-- Select Disease --</option>
          {ListOfDisease.map((d, i) => (
            <option key={i} value={d}>
              {d}
            </option>
          ))}
        </select>

        <input type="date" name="date" value={date} onChange={handleChange} />
        <input type="time" name="time" value={time} onChange={handleChange} />

        <button type="submit">
          {editId ? "Update Appointment" : "Create Appointment"}
        </button>
      </form>

      <table className="appointment-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Disease</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{doctors.find((d) => d.id == a.doctorId)?.doctorName || "Unknown"}</td>
              <td>{a.patientName}</td>
              <td>{a.disease}</td>
              <td>{a.date}</td>
              <td>{a.time}</td>
              <td className="doctor-action">
                <button className="editBtn" onClick={() => handleEdit(a)}>Edit</button>
                <button className="deleteBtn" onClick={() => handleDelete(a.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default Appointments
