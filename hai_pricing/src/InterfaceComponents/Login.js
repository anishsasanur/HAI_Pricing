import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import logo from './logo.png';

const Login = (props) => {
  const [fullName, setFullName] = useState('');
  const [sessionID, setSessionID] = useState('');

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleSessionIDChange = (event) => {
    setSessionID(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!/^\d+$/.test(sessionID)) {
      alert('Session ID must be numeric.');
      return;
    }
    props.setSessionID(sessionID)
    
    props.onLogin(fullName, sessionID);
  };

  return (
    <div style={{ marginTop: '200px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logo} alt="Sample" width="200" height="200"/>
      </div>
      <Typography variant="h3" align="center" mb={8}>HAI Dynamic Pricing Game</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h6">Login</Typography>
        <TextField
          required
          label="Full Name"
          variant="outlined"
          value={fullName}
          onChange={handleFullNameChange}
        />
        <TextField
          required
          label="Session ID"
          variant="outlined"
          value={sessionID}
          onChange={handleSessionIDChange}
        />
        <Button type="submit" variant="contained" onClick={handleSubmit}>Submit</Button>
      </Box>
    </div>
  );
};

export default Login;
