import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, TextField, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const fetchCompanyDetails = async (companyID) => {
  try {
    const response = await axios.get('http://localhost:5000/api/company');
    const companies = response.data;
    
    for (let i = 0; i < companies.length; i++) {
      if (companies[i].companyID === companyID) {
        return companies[i];
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};


const CompanyInformation = ({ details }) => (
  <Box mb={4}>
    <Typography variant="h6" component="h2">
      Company Information
    </Typography>
    <TextField
      label="Name"
      value={details.name}
      fullWidth
      margin="normal"
      disabled
    />
    <TextField
      label="Industry"
      value={details.industry}
      fullWidth
      margin="normal"
      disabled
    />
    <TextField
      label="Country"
      value={details.country}
      fullWidth
      margin="normal"
      disabled
    />
    <TextField
      label="Description"
      value={details.description}
      fullWidth
      margin="normal"
      multiline
      rows={4}
      disabled
    />
  </Box>
);

const ESGData = ({ details }) => (
  <Box mb={4}>
    <Typography variant="h6" component="h2">
      ESG Data
    </Typography>
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Environmental</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          label="Energy Consumption"
          value={details?.environmental?.energyConsumption || ''}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Renewable Energy"
          value={details?.environmental?.renewableEnergy || ''}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="GHG Emissions"
          value={details?.environmental?.ghgEmissions || ''}
          fullWidth
          margin="normal"
          disabled
        />
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Social</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          label="Employment Rates"
          value={details?.social?.employmentRates || ''}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Diversity"
          value={details?.social?.diversity || ''}
          fullWidth
          margin="normal"
          disabled
        />
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Governance</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          label="Board Composition"
          value={details?.governance?.boardComposition || ''}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Ethical Practices"
          value={details?.governance?.ethicalPractices || ''}
          fullWidth
          margin="normal"
          disabled
        />
      </AccordionDetails>
    </Accordion>
  </Box>
);

const CompanyDetails = () => {
  const { companyID } = useParams();
  const [companyDetails, setCompanyDetails] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCompanyDetails(companyID);
      setCompanyDetails(data);
    };
    fetchData();
  }, [companyID]);
  if (!companyDetails) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Company Detail
      </Typography>
      <CompanyInformation details={companyDetails} />
      <ESGData details={companyDetails.esgData} />
      <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>
        Save Changes
      </Button>
    </Container>
  );
};

export default CompanyDetails;
