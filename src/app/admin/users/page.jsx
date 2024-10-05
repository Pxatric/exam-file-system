"use client";

import React, { useState } from "react";
import SideNav from "../component/SideNav";
import Container from "../component/Container";


function AdminUserManagePage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [error, setError] = useState("");
  
  // State สำหรับข้อมูลผู้ใช้ใหม่
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    role: "",
    tel: "",
    email: "",
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, role, tel, username, email, password } = formData;

    if (!firstname || !lastname || !role || !tel || !username || !email || !password) {
      setError("Please complete all inputs");
      return;
    }

    // ส่งข้อมูลผู้ใช้ไปยัง API
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // การตอบกลับจาก API
      if (res.ok) {
        const form = e.target;
        setError("");
        form.reset();
        setFormData({
          firstname: "",
          lastname: "",
          role: "",
          tel: "",
          email: "",
          username: "",
          password: ""
        });
        alert("User registered successfully!");
      } else {
        const errorData = await res.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.log("Error during registration", error);
    }
  };

  const toggleAddModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };

  // ฟังก์ชันสำหรับปิด modal
  const handleClose = () => {
    setIsAddModalOpen(false);
    setError(""); // ล้างข้อความผิดพลาดเมื่อปิด modal
    setFormData({
      firstname: "",
      lastname: "",
      role: "",
      tel: "",
      email: "",
      username: "",
      password: "",
    }); // ล้างข้อมูลฟอร์ม
  };

  return (
    <Container>
      <div className="flex grow">
        <SideNav />
        <main className="flex-grow ml-1/4 p-5 bg-gray-50 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-3xl font-semibold text-gray-800">Users Management</h1>
            <button
              onClick={toggleAddModal}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
            >
              ADD USER
            </button>
          </div>

          {isAddModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-6 w-[700px] shadow-lg">
                <h3 className="text-3xl text-center mb-4">ADD USER</h3>
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="bg-red-500 text-sm text-white py-1 px-3 rounded-md mt-2">
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-lg font-semibold mb-2">Enter Firstname</label>
                      <input
                        type="text"
                        name="firstname"
                        onChange={handleChange}
                        className="bg-gray-200 border py-2 px-3 rounded text-lg"
                        placeholder="Enter Firstname"
                        value={formData.firstname}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-lg font-semibold mb-2">Enter Lastname</label>
                      <input
                        type="text"
                        name="lastname"
                        onChange={handleChange}
                        className="bg-gray-200 border py-2 px-3 rounded text-lg"
                        placeholder="Enter Lastname"
                        value={formData.lastname}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-lg font-semibold mb-2">Select Role</label>
                      <select
                        name="role"
                        onChange={handleChange}
                        className="bg-gray-200 border py-2 px-3 rounded text-lg"
                        value={formData.role}
                      >
                        <option value="">----Select Role----</option>
                        <option value="Admin">Admin</option>
                        <option value="Teacher">Teacher</option>
                        <option value="ExamTech">Exam Tech.</option>
                        <option value="Technology">Technology</option>
                      </select>
                    </div>

                    <div className="flex flex-col">
                      <label className="text-lg font-semibold mb-2">Enter Phone Number</label>
                      <input
                        type="tel"
                        name="tel"
                        onChange={handleChange}
                        className="bg-gray-200 border py-2 px-3 rounded text-lg"
                        placeholder="Enter Phone Number"
                        value={formData.tel}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="text-lg font-semibold mb-2">Enter User Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                      placeholder="Enter User Email"
                      value={formData.email}
                    />
                    <label className="text-lg font-semibold mb-2">Enter Username <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="username"
                      onChange={handleChange}
                      className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                      placeholder="Enter Username"
                      value={formData.username}
                    />
                    <label className="text-lg font-semibold mb-2">Enter Password <span className="text-red-500">*</span></label>
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      className="w-full bg-gray-200 border py-2 px-3 rounded text-lg my-2"
                      placeholder="Enter User Password"
                      value={formData.password}
                    />
                  </div>
                  <div className="flex justify-center mt-6">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
                    >
                      Register User
                    </button>
                  </div>
                </form>
                <button onClick={handleClose} className="mt-4 text-red-500">Close</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </Container>
  );
}

export default AdminUserManagePage;
