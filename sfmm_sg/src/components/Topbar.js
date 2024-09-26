import React from 'react';
import { Box, IconButton,  } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";


const Topbar = () => {
  // Placeholder function for toggling theme mode (can be removed if not needed)
  const toggleColorMode = () => {
    console.log('Toggle color mode');
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
      <Box display="flex" alignItems="center">
        {/* SEARCH BAR */}
        
      </Box>
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={toggleColorMode}>
          {/* Replace with static icons or custom logic if needed */}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;