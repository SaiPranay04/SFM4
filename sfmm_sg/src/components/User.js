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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/users'); 
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
};

const fetchRoles = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/roles'); 
    return response.data;
  } catch (error) {
    console.error('Failed to fetch roles:', error);
    return [];
  }
};

const generateUserID = (index) => {
  const prefix = 'ABC';
  const idNumber = (index + 1).toString().padStart(3, '0'); // Ensures 3 digits
  return `${prefix}${idNumber}`; // Use backticks for template literals
};

const User = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Fetch users and roles on component mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchUsers();
      const rolesData = await fetchRoles(); // Fetch roles

      const usersWithActiveFlag = data.map((user) => ({
        ...user,
        active: user.active ?? false, // Ensure 'active' field is present
      }));
      setUsers(usersWithActiveFlag);
      setRoles(rolesData); // Set roles in state
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => setSearch(event.target.value);

  const handleToggleActive = (index) => {
    setUsers((prevUsers) =>
      prevUsers.map((user, i) =>
        i === index ? { ...user, active: !user.active } : user
      )
    );
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`); // Corrected string interpolation
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/users/${selectedUser._id}`, selectedUser); // Corrected string interpolation
      setUsers((prevUsers) => prevUsers.map((user) => (user._id === selectedUser._id ? selectedUser : user)));
      setEditDialogOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleRoleChange = (event, userIndex) => {
    const newRole = event.target.value;
    setUsers((prevUsers) =>
      prevUsers.map((user, index) =>
        index === userIndex ? { ...user, role: newRole } : user
      )
    );
  };

  const filteredUsers = users.filter((user) =>
    user.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box display="flex">
      <Box component="main" flexGrow={1} p={3}>
        <AppBar position="static">
          <Toolbar>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search By Username"
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
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell>{generateUserID(index)}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Select
                        value={user.role || ''} // Default to empty string if role is undefined
                        onChange={(event) => handleRoleChange(event, index)} // Pass the index
                        displayEmpty
                        fullWidth
                      >
                        <MenuItem value="" disabled>Select Role</MenuItem>
                        {roles.map((role) => (
                          <MenuItem key={role._id} value={role.name}>
                            {role.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={user.active}
                        onChange={() => handleToggleActive(index)}
                        color="primary"
                      />
                      <IconButton onClick={() => handleEditUser(user)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteUser(user._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
              {selectedUser && (
                <Box>
                  <TextField
                    label="Username"
                    fullWidth
                    value={selectedUser.username}
                    onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                    margin="dense"
                  />
                  <TextField
                    label="Email"
                    fullWidth
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                    margin="dense"
                  />
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleEditSubmit}>Save</Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
};

export default User;
