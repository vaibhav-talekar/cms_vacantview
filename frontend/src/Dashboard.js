import React, { useState, useEffect } from 'react';
import { api } from './api';
import './App.css';
import logo from './vv.png';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
function Dashboard() {
  const [date, setDate] = useState('');
  const [day, setDay] = useState('');
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const faculty_name = localStorage.getItem('faculty_name') || 'Faculty';

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [facultyData, setFacultyData] = useState({});
  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {
    localStorage.clear();  // Remove all saved data
    navigate('/login');    // Redirect to login page
  };

  const handleDateChange = async (e) => {
    try {
      setDate(e.target.value);
      const res = await api.get(`/dashboard/day-from-date/${e.target.value}`);
      setDay(res.data.day);

      const classRes = await api.get(`/dashboard/classrooms/${res.data.day}`);
      setClassrooms(classRes.data);
      setSchedule([]);
      setSelectedClass(null);
    } catch (error) {
      console.error('Error fetching day or classrooms:', error);
    }
  };


  const handleClassSelect = async (class_id) => {
    try {
      setSelectedClass(class_id);
      const res = await api.get(`/dashboard/class-schedule/${class_id}/${day}`);

      setSchedule(res.data);

    } catch (error) {
      console.error('Error fetching class schedule:', error);
    }
  };



  const getInitials = (name) => {
    if (!name) return '';
    const names = name.split(' ');
    return names.map(n => n[0]).join('').toUpperCase();
  };

  const fetchFacultyData = async () => {
    try {
      const res = await api.get(`/dashboard/faculty-details/${faculty_name}`);
      setFacultyData(res.data);
    } catch (error) {
      console.error('Error fetching faculty details:', error);
    }
  };

  const toggleSidebar = () => {
    if (!sidebarOpen) {
      fetchFacultyData();
    }
    setSidebarOpen(!sidebarOpen);
  };


  const handleCancelClass = async (class_id, schedule_id) => {
    try {

      await api.post(`/dashboard/cancel-slot`, { class_id, schedule_id });
      alert("Class cancelled successfully!");
      handleClassSelect(selectedClass); // Refresh schedule
    } catch (error) {
      console.error('Error cancelling class:', error);
    }
  };

  const handledisengageClass = async (class_id, schedule_id, other_faculty) => {
    try {

      await api.post(`/dashboard/disengage-slot`, { class_id, schedule_id, other_faculty });
      alert("Class cancelled successfully!");
      handleClassSelect(selectedClass); // Refresh schedule
    } catch (error) {
      console.error('Error cancelling class:', error);
    }
  };



  const handleEngageClass = async (class_id, schedule_id, faculty_name) => {
    try {
      await api.post('/dashboard/engage-slot', {
        class_id,
        schedule_id,
        faculty_name // From your fetched facultyData
      });
      alert('Slot engaged successfully!');
      handleClassSelect(selectedClass); // Refresh schedule
    } catch (error) {
      console.error('Error engaging class:', error);
    }
  };


  return (
    <>
      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="logo" />
          <h4>Vacant View</h4>
        </div>

        <div className="navbar-right">
          <div className="account-circle" onClick={toggleSidebar}>
            {getInitials(faculty_name)}
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div className="sidebar">
          <h3>Faculty Profile</h3>
          <p><b>ID:</b> {facultyData.faculty_id}</p>
          <p><b>Name:</b> {facultyData.name}</p>
          <p><b>Email:</b> {facultyData.email}</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          <button onClick={toggleSidebar}>Close</button>
        </div>
      )}

      <div className="dashboard">
        <h2>Dashboard</h2>
        <input type="date" value={date} onChange={handleDateChange} />

        {day && <h3>Selected Day: {day}</h3>}

        <div className="classroom-buttons">
          {classrooms.map(cls => (
            <button key={cls.class_id} onClick={() => handleClassSelect(cls.class_id)}>
              {cls.class_name}
            </button>
          ))}
        </div>

        {schedule.length > 0 && (
          <>
            <h3>Class Schedule</h3>
            <table border="1">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Faculty</th>
                  <th>Programme</th>
                  <th>Subject</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item, index) => {
                  const currentDate = new Date();
                  const selectedDate = new Date(date);
                  const startTime = item.start_time;
                  const facultyName = item.faculty_name;
                  const other_faculty = item.other_faculty;

                  let status = "";

                  if (selectedDate < new Date().setHours(0, 0, 0, 0)) {
                    status = "Engaged";
                  }
                  else if (selectedDate.toDateString() === currentDate.toDateString()) {
                    const currentTime = currentDate.getHours() + ':' + currentDate.getMinutes();

                    if (currentTime >= startTime) {
                      status = "Engaged";
                    } else {
                      if (item.engaged_flag) {
                        if (item.other_faculty) {
                          status = `Engaged by ${item.other_faculty}`;
                        } else {
                          status = facultyName === faculty_name ? "Engaged by You" : "Engaged by Other Faculty";
                        }
                      } else if (facultyName !== faculty_name) {
                        status = "Available for Other Faculty";
                      } else {
                        status = "Free";
                      }
                    }
                  }
                  else {
                    if (item.engaged_flag) {
                      if (item.other_faculty) {
                        status = `Engaged by ${item.other_faculty}`;
                      } else {
                        status = facultyName === faculty_name ? "Engaged by You" : "Engaged by Other Faculty";
                      }
                    } else if (facultyName !== faculty_name) {
                      status = "Available for Other Faculty";
                    } else {
                      status = "Free";
                    }
                  }

                  if (item.engaged_flag && selectedDate <= currentDate.setHours(0, 0, 0, 0)) {
                    status = facultyName === faculty_name ? "Engaged by You" : "Engaged by Other Faculty";
                  }

                  return (
                    <tr key={index}>
                      <td>{item.start_time} - {item.end_time}</td>
                      <td>{item.faculty_name}</td>
                      <td>{item.programme_name}</td>
                      <td>{item.subject_name}</td>
                      <td>{status}</td>
                      <td>
                        {(facultyName === faculty_name && selectedDate >= currentDate.setHours(0, 0, 0, 0)) && item.engaged_flag && !item.other_faculty && (
                          <button onClick={() => handleCancelClass(item.class_id, item.schedule_id)}>
                            Cancel
                          </button>
                        )}

                        {(other_faculty !== faculty_name && selectedDate >= currentDate.setHours(0, 0, 0, 0)) && !item.engaged_flag && (
                          <button onClick={() => handleEngageClass(item.class_id, item.schedule_id, faculty_name)}>
                            Engage
                          </button>
                        )}

                        {(item.other_faculty === faculty_name && item.engaged_flag && selectedDate >= currentDate.setHours(0, 0, 0, 0)) && (
                          <button onClick={() => handledisengageClass(item.class_id, item.schedule_id, item.other_faculty)}>
                            disengage
                          </button>
                        )}

                      </td>
                    </tr>
                  );
                })}
              </tbody>


            </table>
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
