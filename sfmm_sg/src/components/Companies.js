import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Typography, TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import Sidebar from './Sidebar';

const Companies = () => {
  const navigate = useNavigate();

  const handleViewClick = (companyID) => {
    navigate(`/CompanyDetails/${companyID}`);
  };

  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch companies from the backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/company');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching company data', error);
      }
    };

    fetchCompanies();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box display="flex" flexDirection="column" flexGrow={1} p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Companies</Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="body1" mr={2}>Search:</Typography>
          <TextField variant="outlined" size="small" placeholder="Search" sx={{ mr: 2 }} />
        </Box>

        <Box display="flex" alignItems="center" mb={2}>
          <Typography variant="body1" mr={2}>Filter by:</Typography>
          <TextField variant="outlined" size="small" placeholder="Industry" sx={{ mr: 2 }} />
          <TextField variant="outlined" size="small" placeholder="Country" sx={{ mr: 2 }} />
          <TextField variant="outlined" size="small" placeholder="ESG Score" sx={{ mr: 2 }} />
          <Button variant="contained" color="primary" sx={{ mr: 2 }}>Apply Filters</Button>
          <Button variant="outlined" color="secondary">Reset Filters</Button>
        </Box>

        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Industry</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>ESG Score</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((company) => (
                <TableRow key={company.id}>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.industry}</TableCell>
                  <TableCell>{company.country}</TableCell>
                  <TableCell>{company.esgScore}</TableCell>
                  <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleViewClick(company.companyID)}>
    View
  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={companies.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default Companies;