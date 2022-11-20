import React, { useState, useContext } from 'react'
import "./SignUp.css"
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Logincontext } from '../context/ContextProvider';

const SignIn = () => {

  const navigate = useNavigate();

  const [logdata, setData] = useState({
    email: "",
    password: ""
  });

  const { account, setAccount } = useContext(Logincontext);

  const adddata = (e) => {
    const { name, value } = e.target;

    setData(() => {
      return {
        ...logdata,
        [name]: value
      }
    })
  }

  const senddata = async (e) => {
    e.preventDefault();
    const {email, password} = logdata;
    try {
      const res = await fetch("/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              email, password
          })
      });


      const data = await res.json();
      // console.log(data);

      if (res.status == 400 || !data) {
          console.log("invalid details");
          toast.error("Invalid Details 👎!", {
              position: "top-center"
          });
      } else {
        console.log("valid details");
        
        setAccount(data);
          setData({ ...logdata, email: "", password: "" })
          toast.success("Login Successfully done 😃!", {
              position: "top-center"
          });
          navigate("/");
      }
  } catch (error) {
      console.log("login page ka error" + error.message);
  }

  }


  return (
    <>
      <section>
        <div className='sign_container'>
          <div className='sign_header'>
            <img src='https://amazoneccomerceapp.herokuapp.com/blacklogoamazon.png' alt='amazon.logo' />
          </div>
          <div className='sign_form'>
            <form method='POST'>
              <h1>Sign-In</h1>
              <div className='form_data'>
                <label htmlFor='email'>Email</label>
                <input type="text" onChange={adddata} value={logdata.email} name='email' id='email' />
              </div>
              <div className='form_data'>
                <label htmlFor='password'>Password</label>
                <input type='password' onChange={adddata} value={logdata.password} name='password' placeholder='At least 6 char' id='password' />
              </div>
                <NavLink to="/register"><button className='signin_btn' onClick={senddata}>Continue</button></NavLink>
            </form>
            <ToastContainer />
          </div>
          <div className="create_accountinfo">
            <p>New To Amazon</p>
            <NavLink to="/register"><button>Create Your amazon account</button></NavLink>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignIn