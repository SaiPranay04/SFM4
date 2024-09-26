import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, IconButton } from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
import axios from 'axios';

const AddEditCompany = () => {
  const [formData, setFormData] = useState({
    name: '',
    industry: '',
    country: '',
    description: ''
  });

  const [isValidName, setIsValidName] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'name') {
      setIsValidName(value.trim() !== '');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name.trim()) {
      setIsValidName(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/company', formData);
      console.log('Company details stored successfully:', response.data);
    } catch (error) {
      console.error('There was an error saving the company details!', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Add/Edit Company
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!isValidName}
                helperText={!isValidName ? 'Name is required' : ''}
              />
            </Grid>
            <Grid item>
              <IconButton>
                {isValidName ? <CheckCircle color="success" /> : <Error color="error" />}
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <Box mb={2}>
          <TextField
            label="Industry"
            variant="outlined"
            fullWidth
            name="industry"
            value={formData.industry}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Country"
            variant="outlined"
            fullWidth
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Box>
        <Box>
          <Button variant="contained" color="primary" type="submit" style={{ marginRight: '10px' }}>
            Save
          </Button>
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddEditCompany;
