import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

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

    props.onLogin(fullName, sessionID);
  };

  return (
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
      <Button type="submit" variant="contained">Submit</Button>
    </Box>
  );
};

export default Login;
