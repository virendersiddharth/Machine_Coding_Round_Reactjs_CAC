import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import OtpForm from "./pages/OtpForm"
import Home from "./pages/Home";
import CourseList from "./pages/CourseList";
import { useEffect } from "react";
import './App.css'
import Batches from "./pages/Batches";

function App() {
  const navigate = useNavigate();
  const path = useLocation();
  useEffect(()=>{
    console.log(path)
    if(path.pathname === "/"){
      navigate("/otp-form");
    }
  },[])

  return (
      <div className="min-h-screen w-full overflow-x-hidden box-border font-inter">
        <Routes>
          <Route path="/" element={<Home/>}>
            <Route path="/otp-form" element={<OtpForm/>}/>
            <Route path="/course-list" element={<CourseList/>}/>
            <Route path="/batches" element={<Batches/>}/>
          </Route>
        </Routes>
      </div>
  )
}

export default App
