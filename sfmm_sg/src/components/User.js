import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
  AppBar,
  Toolbar,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/users'); // Replace with your backend endpoint
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users', error);
    return [];
  }
};

const generateUserID = (index) => {
  const prefix = 'ABC';
  const idNumber = (index + 1).toString().padStart(3, '0'); // Ensures 3 digits
  return `${prefix}${idNumber}`;
};

const User = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleToggleActive = (index) => {
    const newUsers = [...users];
    newUsers[index].active = !newUsers[index].active;
    setUsers(newUsers);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box display="flex">
      <Box component="main" flexGrow={1} p={3}>
        <AppBar position="static">
          <Toolbar>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search By Name"
              value={search}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{ backgroundColor: 'white', borderRadius: 4, marginRight: 16 }}
            />
          </Toolbar>
        </AppBar>
        <Container>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Typography variant="h4">Users</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell>{generateUserID(index)}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.number}</TableCell>
                    <TableCell>System</TableCell> {/* Added Role field */}
                    <TableCell>
                      <Switch
                        checked={user.active}
                        onChange={() => handleToggleActive(index)}
                        color="primary"
                      />
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </Box>
  );
};

export default User;
