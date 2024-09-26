import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Roles = () => {
  const [roleName, setRoleName] = useState('');
  const [search, setSearch] = useState('');
  const [roles, setRoles] = useState([]);
  const [editRole, setEditRole] = useState(null); // State to hold the role being edited
  const [editRoleName, setEditRoleName] = useState(''); // State to hold the edited role name
  const [editRoleType, setEditRoleType] = useState(''); // State to hold the edited role type
  const [openEditDialog, setOpenEditDialog] = useState(false); // State to control the dialog

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/roles');
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleRoleNameChange = (event) => {
    setRoleName(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSaveRole = async () => {
    if (roleName.trim() !== '') {
      try {
        const newRole = { name: roleName };
        const response = await axios.post('http://localhost:5000/api/roles', newRole);
        setRoles((prevRoles) => [...prevRoles, response.data]);
        setRoleName('');
      } catch (error) {
        console.error('Error saving role:', error);
      }
    }
  };

  const handleEditRole = (role) => {
    setEditRole(role);
    setEditRoleName(role.name);
    setEditRoleType(role.type);
    setOpenEditDialog(true);
  };

  const handleUpdateRole = async () => {
    try {
      const updatedRole = { name: editRoleName, type: editRoleType };
      await axios.put(`http://localhost:5000/api/roles/${editRole._id}`, updatedRole);
      setRoles((prevRoles) =>
        prevRoles.map((role) =>
          role._id === editRole._id ? { ...role, ...updatedRole } : role
        )
      );
      setOpenEditDialog(false);
      setEditRole(null);
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  const handleDeleteRole = async (roleId) => {
    try {
      await axios.delete(`http://localhost:5000/api/roles/${roleId}`);
      setRoles((prevRoles) => prevRoles.filter((role) => role._id !== roleId));
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Roles</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={4}>
        <Box width="30%">
          <Typography variant="h6">Role</Typography>
          <TextField
            fullWidth
            label="Name"
            value={roleName}
            onChange={handleRoleNameChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveRole}
            style={{ marginTop: 16 }}
          >
            Save
          </Button>
        </Box>
        <Box width="65%">
          <Typography variant="h6">Role List</Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            style={{ marginBottom: 16 }}
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Role</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRoles.map((role) => (
                  <TableRow key={role._id}>
                    <TableCell>{role.name}</TableCell>
                    <TableCell>{role.type}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditRole(role)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteRole(role._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body2" style={{ marginTop: 16 }}>
            Records: {filteredRoles.length} of {roles.length}
          </Typography>
        </Box>
      </Box>

      {/* Edit Role Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Role Name"
            value={editRoleName}
            onChange={(e) => setEditRoleName(e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Role Type"
            value={editRoleType}
            onChange={(e) => setEditRoleType(e.target.value)}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateRole} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Roles;
