import React, { useState } from 'react';
import bgImg from '../assets/pm2.jpg';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { postAsync } from './../helper/axiosHelper';
import { isAuthenticated } from '../helper/authorizationHelper';
import { useDispatch } from 'react-redux';

export default function Form() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [IsSignup, setIsSignup] = useState(false);
  const [tenantID, setTenantID] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();


  const navigate = useNavigate();

  const onSubmit = (data) => {
    try {
      localStorage.setItem('tenantID', tenantID);
      localStorage.setItem('username', username);

      postAsync('Login',
        {
          "username": username,
          "password": password
        }).then((response) => {
          alert(response.message);
          if (response?.code === "0000" && response?.data !== null && response?.data?.token !== null) {
            localStorage.setItem('token', response?.data?.token);
            localStorage.setItem('menu', JSON.stringify(response?.data?.menu));
            localStorage.setItem('role', JSON.stringify(response?.data?.role));
            localStorage.setItem('businessPartnerID', JSON.stringify(response?.data?.businessPartnerID));
            dispatch({ type: "login" });
            navigate('/dashboard');
          }
          else {
            localStorage.setItem('tenantID', tenantID);
            localStorage.setItem('username', username);
            localStorage.removeItem('token');
            localStorage.removeItem('menu');
            localStorage.removeItem('role');
            localStorage.removeItem('businessPartnerID');
          }
        });
    }
    catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div className='App'>
        <div className="register">
          <div className="col-2">
            <img src={bgImg} alt="" />
          </div>
          <div className="col-1">
            <h2>{IsSignup ? 'Signup' : 'Login'}</h2>
            <span></span>

            <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
              {IsSignup && (<input type="text" placeholder='FirstName' {...register("firstName")} />)}
              {IsSignup && (<input type="text" placeholder='LastName' {...register("lastName")} />)}
              <input type="text" placeholder='Tenant ID' onChange={e => setTenantID(e.target.value)} value={tenantID} />
              <input type="text" placeholder='Email' onChange={e => setUsername(e.target.value)} value={username} />
              <input type="password" label="Password" onChange={e => setPassword(e.target.value)} placeholder='Password' value={password} />
              <Button type="submit" className='btn'>
                {IsSignup ? 'Signup' : 'Login'}
              </Button>
              {IsSignup ? 'Already have an account?' : "Don't have an account?"}
              <button
                className='btn'
                backgroundColor="#fdfdff"
                color="#0a1f2e"
                fontSize="14px"
                fontWeight="bold"
                padding="10px 90px"
                borderRadius='15px'
                boxShadow='1px 2px 9px #aed7f4'
                onClick={() => setIsSignup(!IsSignup)}
              >
                {IsSignup ? 'Login now!' : 'Signup now!'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
