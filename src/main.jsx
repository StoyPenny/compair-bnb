import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App.jsx';
    import './index.css';
    import { ThemeProvider, createTheme } from '@mui/material/styles';
    import { CssBaseline } from '@mui/material';

    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
        primary: {
          main: '#00b084',
        },
        secondary: {
          main: '#f48fb1',
        },
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
        text: {
          primary: '#fff',
          secondary: 'rgba(255, 255, 255, 0.7)',
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              color: '#fff',
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              color: '#fff',
            },
          },
        },
        MuiRating: {
          styleOverrides: {
            iconFilled: {
              color: '#00b084',
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#90caf9',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#90caf9',
              },
            },
          },
        },
        MuiInputLabel: {
          styleOverrides: {
            root: {
              color: 'rgba(255, 255, 255, 0.7)',
              '&.Mui-focused': {
                color: '#90caf9',
              },
            },
          },
        },
      },
    });

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </React.StrictMode>,
    )
