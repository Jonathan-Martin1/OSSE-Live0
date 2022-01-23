import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import RegistrationForm from '../Register/RegistrationForm';
import Overview from '../Overview/Overview';
import Container from 'react-bootstrap/Container';
import axios from 'axios';

export default function LoginOut({ loggedIn, setLoggedIn }) {
  if (loggedIn) {
    setLoggedIn(false);
  }
  const initialData = { userName: '', password: '' };
  const [formData, setFormData] = useState(initialData);
  const history = useHistory();

  const handleChange = (event) => {
    setFormData(() => {
      return { ...formData, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.userName && formData.password !== '') {
      axios.get('http://localhost:5000/registration').then((response) => {
        for (let i = 0; i < response.data.data.length; i++) {
          let comparisonData = response.data.data[i];
          if (
            comparisonData.username === formData.userName &&
            comparisonData.password === formData.password
          ) {
            alert('Username and Password do not match our records!');
          }
        }
      });
      setLoggedIn(false);
      history.push('/Register');
    } else {
      setLoggedIn(true);
      history.push('/Overview');
    }
  };

  const handleDirect = (event) => {
    event.preventDefault();
    history.push('/Register');
  };

  return (
    <Container
      style={{
        display: 'flex',
        margin: 'auto',
        width: 'auto',
        padding: '10px',
        justifyContent: 'center',
      }}
    >
      <div
        variant='outline-dark'
        className='container w-50'
        style={{
          border: '2px solid grey',
          padding: '5px',
          boxShadow: '2px 2px white',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h2 className='page-title1'>Log In</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label
              htmlFor='userName'
              className='form-label'
              style={{
                color: 'whitesmoke',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              User Name
            </label>
            <input
              name='userName'
              type='text'
              className='form-control'
              id='userName'
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className='mb-3'>
            <label
              htmlFor='password'
              className='form-label'
              style={{
                color: 'whitesmoke',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              Password
            </label>
            <input
              name='password'
              type='password'
              className='form-control'
              id='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type='submit'
            className='btn btn-success'
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '10px',
            }}
          >
            Log In
          </button>
        </form>
        <button
          onClick={handleDirect}
          type='submit'
          className='btn btn-success'
          style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}
        >
          Register Here
        </button>
        <Switch>
          <Route exact={true} path='/Overview'>
            <Overview />
          </Route>
          <Route exact={true} path='/Register'>
            <RegistrationForm />
          </Route>
        </Switch>
      </div>
    </Container>
  );
}
