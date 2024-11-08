import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css'



import Login from "./components/Login"; 
import SignUp from "./components/SignUp";  

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPass from "./components/ForgotPass";
import Home from "./components/Home";

const App = () => (
  <>
    <ToastContainer position="bottom-right"/>
    <BrowserRouter>
    <Box sx={{ backgroundColor: '#000' }}>
      
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
      </Routes>
      
    </Box>
  </BrowserRouter>
  </>
  
);

export default App;
