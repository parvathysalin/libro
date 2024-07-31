import { Button, Switch } from '@mui/material'
import React, { useEffect, useState } from 'react'
import"./Signup.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = ({user}) => {

    const [isStudent, setIsStudent] = useState(true)
    const [admissionId, setAdmissionId] = useState({
        Email:user ? user.Email || '':'',
 } )
    const [employeeId,setEmployeeId] = useState()
    const [password, setPassword] = useState({
        Passsword:user?user.Password||'':'',
    })
    const [error, setError] = useState("")
    const navigate=useNavigate();
    const location=useLocation();
    useEffect(()=>{
        if(location.state &&location.state.val){
          setAdmissionId(location.state.val.Email); 
          setPassword(location.state.val.Password);
          }},[location]);
        
             
      function handlelogin(){
        axios.get('http://localhost:3000/user')
          .then((response) => {
            const users = response.data;
            console.log(response.data);
            const validuser = users.find((user) =>user.Email === admissionId&& user.Password === password);
            if (validuser) {
              alert('logged in successfully');
              profile(validuser);
            } else {
              alert('invalid');
            }
          }).catch((error) => {
            console.log('error');
          });
      };
    
      function profile(val){
        navigate('/profile', {state: {val} });
      };
     function adminlogin(){
      if(employeeId ==='1234'&& password ==='admin123'){
        console.log('login successfull');
        navigate('/books');}
        else{alert('invalid')}

      }
     
  return (
    <>
    <div className='signin-container'>
            <div className="signin-card">
                <form >
                    <h2 className="signin-title"> Log in</h2>
                    <p className="line"></p>
                    <div className="persontype-question">
                        <p>Are you a Staff member ?</p>
                        <Switch
                            onChange={() => setIsStudent(!isStudent)}
                            color="primary"
                        />
                    </div>
                    <div className="error-message"><p>{error}</p></div>
                    <div className="signin-fields">
                        <label htmlFor={isStudent?"admissionId":"employeeId"}><b>{isStudent?"Admission ID":"Employee ID"}</b> </label>
                        <input className='signin-textbox' type="text" placeholder={isStudent?"Enter Admission ID":"Enter Employee ID"} name={isStudent?"admissionId":"employeeId"} required onChange={(e) => { isStudent?setAdmissionId(e.target.value):setEmployeeId(e.target.value) }}/>
                        <label htmlFor="password"><b>Password</b></label>
                        <input className='signin-textbox' type="password" minLength='6' placeholder="Enter Password" name="psw" required onChange={(e) => { setPassword(e.target.value) }} />
                        </div>{ isStudent ?
                 <Button className="signin-button" onClick={handlelogin}>Login</Button>:<Button className="signin-button" onClick={adminlogin}>Login</Button>}
                  
                    
                    <div className='signup-option'>
                    
                </div>
                </form>
                <p className="signup-question">Don't have an account? </p>
                <Link to={'/login'}>
                <Button style={{marginBottom:'5px',marginTop:'0px'}}>signup</Button></Link>
                
            </div>
        </div> 
        </>
  )
}

export default Signup