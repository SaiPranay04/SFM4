import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, MenuItem, Select, FormControl, InputLabel, Grid, IconButton } from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
import axios from 'axios';

const AddEditESGMetric = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    description: ''
  });

  const [isValidName, setIsValidName] = useState(true);
  const [isValidCategory, setIsValidCategory] = useState(true);
  const [isValidSubcategory, setIsValidSubcategory] = useState(true);
  const [isValidDescription, setIsValidDescription] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    if (name === 'name') {
      setIsValidName(value.trim() !== '');
    }
    if (name === 'category') {
      setIsValidCategory(value.trim() !== '');
    }
    if (name === 'subcategory') {
      setIsValidSubcategory(value.trim() !== '');
    }
    if (name === 'description') {
      setIsValidDescription(value.trim() !== '');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isNameValid = formData.name.trim() !== '';
    const isCategoryValid = formData.category.trim() !== '';
    const isSubcategoryValid = formData.subcategory.trim() !== '';
    const isDescriptionValid = formData.description.trim() !== '';

    setIsValidName(isNameValid);
    setIsValidCategory(isCategoryValid);
    setIsValidSubcategory(isSubcategoryValid);
    setIsValidDescription(isDescriptionValid);

    if (!isNameValid || !isCategoryValid || !isSubcategoryValid || !isDescriptionValid) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/esgmetric', formData);
      console.log('ESG metric stored successfully:', response.data);
    } catch (error) {
      console.error('There was an error saving the ESG metric details!', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Add/Edit ESG Metric
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                label="Metric Name"
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
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              onChange={handleChange}
              label="Category"
              name="category"
              error={!isValidCategory}
            >
              <MenuItem value="Environmental">Environmental</MenuItem>
              <MenuItem value="Social">Social</MenuItem>
              <MenuItem value="Governance">Governance</MenuItem>
            </Select>
          </FormControl>
          {!isValidCategory && <Typography color="error">Category is required</Typography>}
        </Box>
        <Box mb={2}>
          <TextField
            label="Subcategory"
            variant="outlined"
            fullWidth
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            error={!isValidSubcategory}
            helperText={!isValidSubcategory ? 'Subcategory is required' : ''}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={!isValidDescription}
            helperText={!isValidDescription ? 'Description is required' : ''}
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

export default AddEditESGMetric;
