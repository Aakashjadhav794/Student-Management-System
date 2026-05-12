import React, { useEffect, useState } from "react";

import API from "../services/api";

import { useNavigate, useParams } from "react-router-dom";

function EditStudent() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(false);

  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
    course: ""
  });

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {

    try {

      const res = await API.get(`/students/${id}`);

      setStudent(res.data);

    } catch (err) {

      console.log(err);

      alert("Failed to fetch student details");
    }
  };

  const handleChange = (e) => {

    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const updateStudent = async () => {

    if (
      !student.name ||
      !student.email ||
      !student.age ||
      !student.course
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      setLoading(true);

      await API.put(`/students/${id}`, student);

      alert("Student Updated Successfully");

      navigate("/students");

    } catch (err) {

      console.log(err);

      alert("Something went wrong");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "#f4f6f9"
      }}
    >

      <div
        className="card shadow border-0 p-4"
        style={{
          width: "500px",
          borderRadius: "15px"
        }}
      >

        <div className="text-center mb-4">

          <h2 className="fw-bold">
            Edit Student
          </h2>

          <p className="text-muted mb-0">
            Update student information
          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateStudent();
          }}
        >

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={student.name}
              placeholder="Enter full name"
              className="form-control"
              onChange={handleChange}
            />

          </div>

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={student.email}
              placeholder="Enter email"
              className="form-control"
              onChange={handleChange}
            />

          </div>

          <div className="mb-3">

            <label className="form-label fw-semibold">
              Age
            </label>

            <input
              type="number"
              name="age"
              value={student.age}
              placeholder="Enter age"
              className="form-control"
              onChange={handleChange}
            />

          </div>

          <div className="mb-4">

            <label className="form-label fw-semibold">
              Course
            </label>

            <input
              type="text"
              name="course"
              value={student.course}
              placeholder="Enter course"
              className="form-control"
              onChange={handleChange}
            />

          </div>

          <div className="d-flex gap-2">

            <button
              type="button"
              className="btn btn-secondary w-50"
              onClick={() => navigate("/students")}
            >
              Back
            </button>

            <button
              type="submit"
              className="btn btn-dark w-50"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Student"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditStudent;