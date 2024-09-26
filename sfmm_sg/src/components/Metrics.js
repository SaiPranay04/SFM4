import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, Select, FormControl, InputLabel, Grid } from '@mui/material';
import axios from 'axios';

const Metrics = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subcategoryFilter, setSubcategoryFilter] = useState('');

  // Fetch metrics data from the API
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/esgmetric');
        setMetrics(response.data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };
    
    fetchMetrics();
  }, []);

  // Handle navigation to add/edit metric page
  const handleMetricsClick = () => {
    navigate('/AddEditESGMetric');
  };

  // Handle category filter change
  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  // Handle subcategory filter change
  const handleSubcategoryChange = (event) => {
    setSubcategoryFilter(event.target.value);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        ESG Metrics
      </Typography>
      <Box mb={2}>
        <Button variant="contained" color="primary" onClick={handleMetricsClick}>
          Add New Metric
        </Button>
      </Box>
      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Search Metrics" variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="contained" color="primary">
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={categoryFilter}
                onChange={handleCategoryChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Environmental">Environmental</MenuItem>
                <MenuItem value="Social">Social</MenuItem>
                <MenuItem value="Governance">Governance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Subcategory</InputLabel>
              <Select
                label="Subcategory"
                value={subcategoryFilter}
                onChange={handleSubcategoryChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Energy Management">Energy Management</MenuItem>
                <MenuItem value="Labor Practices">Labor Practices</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Box mb={2}>
        <Button variant="contained" color="primary">
          Apply Filters
        </Button>
        <Button variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>
          Reset Filters
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Subcategory</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {metrics.map((metric) => (
              <TableRow key={metric._id}>
                <TableCell>{metric.name}</TableCell>
                <TableCell>{metric.category}</TableCell>
                <TableCell>{metric.subcategory}</TableCell>
                <TableCell>{metric.description}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" size="small" style={{ marginRight: '5px' }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" size="small">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2}>
        <Button variant="contained" color="primary">
          Bulk Upload CSV
        </Button>
      </Box>
    </Container>
  );
};

export default Metrics;
