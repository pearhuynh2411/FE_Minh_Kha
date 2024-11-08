import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { signUpAPI } from "../utils/fetchFromAPI.js"; 
import { toast } from "react-toastify"; //lib notification

const SignUp = () => {
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {

  }, []);

  return <div className="p-5 " style={{ minHeight: "100vh" }}>
    <div className=" d-flex justify-content-center">
      <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Full name</label>
          <input className="form-control" id="fullName" />
        </div>
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>

        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Password</label>
          <input className="form-control" id="pass" />
        </div>
        <div className="col-12">
          <button 
          type="button" 
          className="btn btn-primary"
          onClick={()=> {
            let full_name = document.getElementById("fullName").value;
            let email = document.getElementById("email").value;
            let pass_word = document.getElementById("pass").value;
            const payload = {full_name,email,pass_word};
            signUpAPI(payload)
            .then((result)=> {
              console.log("get result API sign up", result);
              toast.success(result.message);
              navigate("/login");
            })
            .catch((error)=> {
              console.log("Error api sign up",error)
              toast.error(error.response.data.message);
            })
          }}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
};

export default SignUp;
