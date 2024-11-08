import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { loginFaceBookAPI, loginAPI } from "../utils/fetchFromAPI.js";
import { toast } from "react-toastify";
import ReactFacebookLogin from "react-facebook-login";


const Login = () => {
 
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {

  }, []);

  return <div className="p-5 " style={{ minHeight: "100vh" }}>
    <div className=" d-flex justify-content-center">
      <form className="row g-3 text-white">
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
            onClick={() => {
              let email = document.getElementById("email").value;
              let pass_word = document.getElementById("pass").value;
              let payload = { email, pass_word };
              loginAPI(payload)
                .then((result) => {
                  toast.success(result.message);
                  
                  localStorage.setItem("LOGIN_USER", result.token)
                  navigate("/")
                })
                .catch((error) => {
                  toast.error(error.response.data.message);
                })
            }}
          >Login</button>
          <Link 
            className="text-primary"
            to="/forgot-password"
          >
            Forgot password
          </Link>
          <ReactFacebookLogin
            appId="909658904438074"
            fields="name,email,picture"
            callback={(response)=>{
              console.log(response);
              let {email,name, id} = response;
              let payload = {email,name,id};
              loginFaceBookAPI(payload)
              .then((result)=>{
                //lưu access token vào localstorage
                localStorage.setItem("LOGIN_USER",result.token);
                //hiển thị message login facebook thành công
                toast.success(result.message);
                //nevigate về trang home
                navigate("/");
              })
              .catch((error)=>{
                toast.error(error.response.data.message);
                console.log(error)
              })
            }}
          />
        </div>
      </form>
    </div>
  </div>
};

export default Login;
