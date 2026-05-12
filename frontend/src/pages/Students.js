import React, { useEffect, useState } from "react";

import API from "../services/api";

import { useNavigate } from "react-router-dom";

function Students() {

  const [students, setStudents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {

    try {

      const res = await API.get("/students");

      setStudents(res.data);

    } catch (err) {

      console.log(err);

      alert("Unauthorized");

      navigate("/");
    }
  };

  const deleteStudent = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {

      await API.delete(`/students/${id}`);

      fetchStudents();

    } catch (err) {

      console.log(err);
    }
  };

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div
      className="container-fluid min-vh-100"
      style={{
        background: "#f4f6f9"
      }}
    >

      {/* Navbar */}

      <div className="row bg-dark shadow-sm p-3">

        <div className="col-md-6">

          <h3 className="text-white mb-0">
            Student Management System
          </h3>

        </div>

        <div className="col-md-6 text-end">

          <button
            className="btn btn-outline-light"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

      {/* Main Content */}

      <div className="container mt-5">

        <div className="card shadow border-0">

          <div className="card-body">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>

                <h2 className="fw-bold mb-1">
                  Students
                </h2>

                <p className="text-muted mb-0">
                  Manage all students information
                </p>

              </div>

              <button
                className="btn btn-dark"
                onClick={() => navigate("/add")}
              >
                + Add Student
              </button>

            </div>

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-dark">

                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Course</th>
                    <th width="180">Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {students.length > 0 ? (

                    students.map((s) => (

                      <tr key={s.id}>

                        <td>{s.name}</td>

                        <td>{s.email}</td>

                        <td>{s.age}</td>

                        <td>{s.course}</td>

                        <td>

                          <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => navigate(`/edit/${s.id}`)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteStudent(s.id)}
                          >
                            Delete
                          </button>

                        </td>

                      </tr>
                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="5"
                        className="text-center text-muted py-4"
                      >
                        No Students Found
                      </td>

                    </tr>
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Students;