import React from 'react';
import './App.css';
import { makeStyles, CssBaseline, createTheme, ThemeProvider } from '@material-ui/core';
import IntakeRquest from '../pages/IntakeRequest.js/IntakeRequest';

const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: 'translateZ(0)'
      }
    }
  },
  props: {
    MuiIconButton: {
      disableRipple: true
    }
  }
})


const useStyles = makeStyles({
  appMain: {
    // paddingLeft: '320px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      {/* <SideMenu /> */}
      <div className={classes.appMain}>
        {/* <Header /> */}

        <IntakeRquest />
      </div>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
