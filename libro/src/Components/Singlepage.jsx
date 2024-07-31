import React, { useEffect, useState,useContext } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Snackbar, Alert } from '@mui/material';
import { Form, useLocation } from 'react-router-dom';
import Navbaruser from './Navbaruser';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Singlepage = ({ book}) => {
  const {username}=useContext(UserContext);
  const [form, setForm] = useState({
    _id: book ? book._id || '' : '',
    Name: book ? book.Name || '' : '',
    Image: book ? book.Image || '' : '',
    Author: book ? book.Author || '' : '',
    Description: book ? book.Description || '' : '',
  });

  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const location = useLocation();



  useEffect(() => {
    if (location.state && location.state.val) {
      setForm({
        ...form,
        bookId:location.state.val._id,
        Image: location.state.val.Image,
        Name: location.state.val.Name,
        Author: location.state.val.Author,
        Description: location.state.val.Description,
      });
    }
  }, [location.state]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleRent = async(bookname) => {try{
    const status='pending';
    console.log(username);
    console.log(bookname);
    console.log(status);

    const response=await axios.post('http://localhost:3000/addrequest',{Email:username,
      Book:bookname,Status:status});
    console.log('Rental request created:', response.data); 
  }
   
   
      catch(error) {
        console.error('Error creating rental request:', error);
      };
  };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setForm((prevState) => ({ ...prevState, [name]: value }));
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Simulate sending a request to the admin
    // onRent(form);
    handleClose();
    setSnackbarOpen(true);
  };

  return (
    <><Navbaruser/>
      <Card sx={{ display: 'flex', padding: 2, marginBottom: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
          <CardMedia
              component="img"
              sx={{ width: '100%', height: 'auto' }}
              image={form.Image}
              alt={form.Name}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <CardContent>
              <Typography component="h1" variant="h4" gutterBottom>
                {form.Name}
              </Typography>
              <Typography component="h2" variant="h6" gutterBottom>
                {form.Author}
              </Typography>
              <Typography variant="body1" paragraph>
                {form.Description}
              </Typography>
              {/* <Typography variant="body2" color="textSecondary">
                <strong>Published:</strong> {book.publishedDate}
              </Typography>
               */}
              <Button variant="contained" color="primary" onClick={handleClickOpen} sx={{ marginTop: 2 }}>
                Rent
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rent {form.Name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to rent {form.Name}. We will send updates occasionally.
          </DialogContentText>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
           
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary" onClick={()=>{handleRent(form.Name)}}>
                Submit
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Rent request sent successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Singlepage;