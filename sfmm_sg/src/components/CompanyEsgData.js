import React, { useState, useEffect } from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Button, Grid, Box } from '@mui/material';
import axios from 'axios';

const ESGData = () => {
  const [company, setCompany] = useState('');
  const [year, setYear] = useState('');
  const [metrics, setMetrics] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/company');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
    
    // Initialize the metrics with specified names
    const initialMetrics = [
      { metric: 'Energy Consumption', value: '' },
      { metric: 'Renewable Energy', value: '' },
      { metric: 'GHG Emissions', value: '' },
      { metric: 'Employment Rates', value: '' },
      { metric: 'Diversity', value: '' },
      { metric: 'Board Composition', value: '' },
      { metric: 'Ethical Practices', value: '' },
    ];
    setMetrics(initialMetrics);
  }, []);

  const handleMetricChange = (index, event) => {
    const newMetrics = [...metrics];
    newMetrics[index].value = event.target.value;
    setMetrics(newMetrics);
  };

  const handleSave = async () => {
    const companyESGData = metrics.map(metric => ({
      companyID: company,
      year,
      metricID: metric.metric, // Ensure this matches the expected structure
      value: metric.value,
    }));

    console.log('Sending ESG Data:', companyESGData);

    try {
      const response = await axios.post('http://localhost:5000/api/companyesg', companyESGData);
      console.log('ESG data saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving ESG data:', error);
      setError('Error saving ESG data');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>ESG Data Entry</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Select Company</InputLabel>
              <Select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                label="Select Company"
              >
                {companies.map(c => (
                  <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Year"
              variant="outlined"
              fullWidth
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mb={2}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Metric</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Value</Typography>
          </Grid>
        </Grid>
      </Box>
      {metrics.map((metric, index) => (
        <Box mb={2} key={index}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">{metric.metric}</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                value={metric.value}
                onChange={(e) => handleMetricChange(index, e)}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Button variant="contained" color="primary" onClick={handleSave}>Save ESG Data</Button>
      </Box>
    </Container>
  );
};

export default ESGData;
