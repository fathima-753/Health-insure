import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import PatientRegistration from "./components/PatientRegistration";
import HospitalRegistration from "./components/HospitalRegistration";
import CompanyRegistration from "./components/CompanyRegistration"
import PatientLogin from "./components/PatientLogin";
import CompanyLogin from "./components/CompanyLogin";
import HospitalLogin from "./components/HospitalLogin";
import PatientHomepage from './components/PatientHomepage';
import CompanyHomepage from './components/CompanyHomepage';
import HospitalHomepage from './components/HospitalHomepage';
import InsuarncePolicy from './components/InsurancePolicy';
import PatientDetails from './components/PatientDetails';
import ApplyForClaim from './components/ApplyforClaim';
import ApplyforPolicy from './components/ApplyforPolicy';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> 
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/patient/register" element={<PatientRegistration/>} />
          <Route path="/hospital/register" element={<HospitalRegistration/>}/>
          <Route path="/company/register" element={<CompanyRegistration/>}/>
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/company/login" element={<CompanyLogin />} />
          <Route path="/hospital/login" element={<HospitalLogin />} />
          <Route path="/patient/homepage" element={<PatientHomepage />} />
          <Route path='/company/homepage' element={<CompanyHomepage/>}/>
          <Route path='/hospital/homepage' element={<HospitalHomepage/>}/>
          <Route path='/insurance/policy' element={<InsuarncePolicy/>}/>
          <Route path='/patient/details' element={<PatientDetails/>}/>
          <Route path='/apply/forclaim' element={<ApplyForClaim/>}/>
          <Route path='/apply/forpolicy' element={<ApplyforPolicy/>}/>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
