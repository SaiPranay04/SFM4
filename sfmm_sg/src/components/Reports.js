import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import jsPDF from 'jspdf';

const fetchCompanies = async () => {
  // Mock API call - replace this with your actual API call
  return [
    {
      id: 1,
      name: "Company A",
      industry: "Industry A",
      country: "Country A",
      description: "Description A",
      esgData: {
        environmental: { energyConsumption: "1000 kWh", renewableEnergy: "50%", ghgEmissions: "20 tons" },
        social: { employmentRates: "95%", diversity: "30%" },
        governance: { boardComposition: "10 members", ethicalPractices: "High" }
      },
      actions: ["Action A1", "Action A2"]
    },
    {
      id: 2,
      name: "Company B",
      industry: "Industry B",
      country: "Country B",
      description: "Description B",
      esgData: {
        environmental: { energyConsumption: "2000 kWh", renewableEnergy: "60%", ghgEmissions: "30 tons" },
        social: { employmentRates: "90%", diversity: "40%" },
        governance: { boardComposition: "12 members", ethicalPractices: "Medium" }
      },
      actions: ["Action B1", "Action B2"]
    }
  ];
};

const generatePDF = (companyDetails) => {
  const doc = new jsPDF();
  
  doc.setFontSize(20);
  doc.text(companyDetails.name, 10, 10);
  
  doc.setFontSize(12);
  doc.text(`Industry: ${companyDetails.industry}`, 10, 20);
  doc.text(`Country: ${companyDetails.country}`, 10, 30);
  doc.text(`Description:`, 10, 40);
  doc.text(companyDetails.description, 10, 50);
  
  doc.text(`ESG Data:`, 10, 70);
  doc.text(`Environmental:`, 10, 80);
  doc.text(`- Energy Consumption: ${companyDetails.esgData.environmental.energyConsumption}`, 10, 90);
  doc.text(`- Renewable Energy: ${companyDetails.esgData.environmental.renewableEnergy}`, 10, 100);
  doc.text(`- GHG Emissions: ${companyDetails.esgData.environmental.ghgEmissions}`, 10, 110);
  
  doc.text(`Social:`, 10, 130);
  doc.text(`- Employment Rates: ${companyDetails.esgData.social.employmentRates}`, 10, 140);
  doc.text(`- Diversity: ${companyDetails.esgData.social.diversity}`, 10, 150);
  
  doc.text(`Governance:`, 10, 170);
  doc.text(`- Board Composition: ${companyDetails.esgData.governance.boardComposition}`, 10, 180);
  doc.text(`- Ethical Practices: ${companyDetails.esgData.governance.ethicalPractices}`, 10, 190);
  
  // Save the PDF with the company name
  doc.save(`${companyDetails.name}.pdf`);
};

const CompanyInformation = ({ details }) => (
  <Box mb={4}>
    <Typography variant="h6" component="h2" sx={{ color: 'black', fontWeight: 'bold' }}>
      Company Information
    </Typography>
    <TextField
      label="Name"
      value={details.name}
      fullWidth
      margin="normal"
      InputLabelProps={{ style: { color: 'black' } }}
      InputProps={{ style: { color: 'black' } }}
      disabled
    />
    <TextField
      label="Industry"
      value={details.industry}
      fullWidth
      margin="normal"
      InputLabelProps={{ style: { color: 'black' } }}
      InputProps={{ style: { color: 'black' } }}
      disabled
    />
    <TextField
      label="Country"
      value={details.country}
      fullWidth
      margin="normal"
      InputLabelProps={{ style: { color: 'black' } }}
      InputProps={{ style: { color: 'black' } }}
      disabled
    />
    <TextField
      label="Description"
      value={details.description}
      fullWidth
      margin="normal"
      multiline
      rows={4}
      InputLabelProps={{ style: { color: 'black' } }}
      InputProps={{ style: { color: 'black' } }}
      disabled
    />
  </Box>
);

const ESGData = ({ data }) => (
  <Box mb={4}>
    <Typography variant="h6" component="h2">
      ESG Data
    </Typography>
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Environmental</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField label="Energy Consumption" value={data.environmental.energyConsumption} fullWidth margin="normal" disabled />
        <TextField label="Renewable Energy" value={data.environmental.renewableEnergy} fullWidth margin="normal" disabled />
        <TextField label="GHG Emissions" value={data.environmental.ghgEmissions} fullWidth margin="normal" disabled />
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Social</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField label="Employment Rates" value={data.social.employmentRates} fullWidth margin="normal" disabled />
        <TextField label="Diversity" value={data.social.diversity} fullWidth margin="normal" disabled />
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Governance</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField label="Board Composition" value={data.governance.boardComposition} fullWidth margin="normal" disabled />
        <TextField label="Ethical Practices" value={data.governance.ethicalPractices} fullWidth margin="normal" disabled />
      </AccordionDetails>
    </Accordion>
  </Box>
);

const ReportsSection = ({ reports, onSelectReport }) => (
  <Box mt={4}>
    <Typography variant="h6" component="h2">
      Reports
    </Typography>
    {reports.map(report => (
      <Button 
        key={report.id} 
        variant="outlined" 
        color="primary" 
        onClick={() => onSelectReport(report)}
        style={{ marginRight: '10px', marginBottom: '10px' }}
      >
        {report.name}
      </Button>
    ))}
  </Box>
);

const Reports = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCompanies();
      setCompanies(data);
    };
    fetchData();
  }, []);

  const handleSelectReport = (company) => {
    setSelectedCompany(company);
  };

  if (!companies.length) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Reports
      </Typography>
      <ReportsSection reports={companies} onSelectReport={handleSelectReport} />
      
      {selectedCompany && (
        <>
          <CompanyInformation details={selectedCompany} />
          <ESGData data={selectedCompany.esgData} />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '16px' }}
            onClick={() => generatePDF(selectedCompany)}
          >
            Download Report
          </Button>
        </>
      )}
    </Container>
  );
};

export default Reports;