import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Typography, Paper } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import API from '../utils/API';
import { useAppContext } from '../utils/AppContext';
import { useUserContext } from "../utils/UserContext";
import { Alert } from '@material-ui/lab';

export default function SignUp(props) {
  const { setUserId } = useUserContext();
  const { userHasAuthenticated } = useAppContext();
  const [error, setError] = useState(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  )
  const [user, setUser] = useState(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  )

  const handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({...user, [name]: value});
  }
  
  const handleFormSubmit = async e => {
    e.preventDefault();
    console.log('user submitted');
 
    if (user.firstName === "") {
      setError({...error, firstName: "You need to input your Firstname"});
      await new Promise((resolve, reject) => setTimeout(resolve, 1500));
      setError({...error, firstName: ""});
    } 
    else if (user.lastName === "") {
      setError({...error, lastName: "You need to input your Lastname"});
      await new Promise((resolve, reject) => setTimeout(resolve, 1500));
      setError({...error, lastName: ""});
    } 
    else {
      const userFullname = `${user.firstName} ${user.lastName}`;
      API.saveUser({
        name: userFullname,
        email: user.email,
        password: user.password
      })
      .then(async res => {
        if (res.data.user !== undefined) {
          userHasAuthenticated(true);
          setUserId(res.data.user);
          props.history.push("/survey");
        } else {
          if (res.data.errors.email !== "") {
            setError({...error, email: res.data.errors.email});
            await new Promise((resolve, reject) => setTimeout(resolve, 1500));
            setError({...error, email: ""});
          } 
          if (res.data.errors.password !== "") {
            setError({...error, password: res.data.errors.password});
            await new Promise((resolve, reject) => setTimeout(resolve, 1500));
            setError({...error, password: ""});
          }
        }
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(./assets/images/LoginSignup.jpg)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      width: theme.spacing(9),
      height: theme.spacing(9),
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    signUp: {
      margin: theme.spacing(1, 0, 1),
    }
  }));

  const classes = useStyles();
  const routeChange = (e) => {
    props.history.push("/login");
  }

  return (
    <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={false} sm={4} md={7} className={classes.image}/>
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar} alt="Refresh Icon" src="./assets/images/logo100x100.png">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleInputChange}
              />
              {(error.firstName !== "") ? (<Alert severity="error">
                {error.firstName}
              </Alert>) : (<div></div>)}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleInputChange}
              />
              {(error.lastName !== "") ? (<Alert severity="error">
                {error.lastName}
                </Alert>) : (<div></div>)}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleInputChange}
              />
              {(error.email !== "") ? (<Alert severity="error">
              {error.email}
              </Alert>) : (<div></div>)}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleInputChange}
              />
              {(error.password !== "") ? (<Alert severity="error">
              {error.password}
              </Alert>) : (<div></div>)}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleFormSubmit}
          >
            Sign Up
          </Button>
          <Grid container justify="center">
            <Grid item className={classes.signUp}>
              <Link onClick={routeChange} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </Grid>
    </Grid>
  );
}