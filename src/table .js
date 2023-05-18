import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CustomizedTable = () => {
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editedData, setEditedData] = useState({
   id: '',
    title: 0,
    fat: 0,
    carbs: 0,
    protein: 0,
  });

  useEffect(() => {
    fetchAPI(); // Fetch data from API on component mount
  }, []);

  const fetchAPI = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=5');
      const data = await response.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleAddRow = () => {
    const newRow = {id: '', title: '', fat: '', carbs: '', protein: '' };
    setData(prevData => [...prevData, newRow]);
    setEditIndex(data.length);
    setEditedData(newRow);
  };

  const handleDeleteRow = index => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
    setEditIndex(-1);
  };

  const handleEditRow = index => {
    const rowToEdit = data[index];
    setEditedData(rowToEdit);
    setEditIndex(index);
  };

  const handleSaveRow = index => {
    const newData = [...data];
    newData[index] = editedData;
    setData(newData);
    setEditIndex(-1);
    setEditedData({
     id: '',
      title: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    });
  };

  const handleDataChange = (event, field) => {
    const updatedData = { ...editedData, [field]: event.target.value };
    setEditedData(updatedData);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Dessert (100g serving)</StyledTableCell>
            <StyledTableCell align="right">title</StyledTableCell>
            <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {editIndex === index ? (
                  <input
                    value={editedData.id}
                    onChange={e => handleDataChange(e, 'id')}
                  />
                ) : (
                  row.id
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                {editIndex === index ? (
                  <input
                    value={editedData.title}
                    onChange={e => handleDataChange(e, 'title')}
                  />
                ) : (
                  row.title
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                {editIndex === index ? (
                  <input
                    value={editedData.fat}
                    onChange={e => handleDataChange(e, 'fat')}
                  />
                ) : (
                  row.fat
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                {editIndex === index ? (
                  <input
                    value={editedData.carbs}
                    onChange={e => handleDataChange(e, 'carbs')}
                  />
                ) : (
                  row.carbs
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                {editIndex === index ? (
                  <input
                    value={editedData.protein}
                    onChange={e => handleDataChange(e, 'protein')}
                  />
                ) : (
                  row.protein
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                {editIndex === index ? (
                  <Button
                    onClick={() => handleSaveRow(index)}
                    variant="contained"
                    color="primary"
                  >
                    Save
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => handleEditRow(index)}
                      variant="contained"
                      color="primary"
                    >
                  <EditIcon />
                    
                    </Button>
                    <Button
                      onClick={() => handleDeleteRow(index)}
                      variant="contained"
                      color="secondary"
                    >
                     <DeleteIcon />
                    </Button>
                  </>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleAddRow} variant="contained" color="primary">
        Add Data
      </Button>
    </TableContainer>
  );
};

export default CustomizedTable;
