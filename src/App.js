import React, { useEffect } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


import Table from './table ';
import CustomizedTables from './table ';


const App = () => {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3001/api/data');
  //       const data = response.data;
  //       // Process the data on the frontend as needed
  //       // ...
  //       console.log(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return <div class="container"> 
  {/* <div><CloudUploadIcon/> <CircularProgress /><Box sx={{ display: 'flex',margin:'auto' }}>
     
    </Box></div> */}

  <CustomizedTables />
  </div>;
};

export default App;
