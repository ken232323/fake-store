import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css';

const theme = createTheme({
  primaryColor: "teal",
  colors: {
    teal: [
      "#D4F5EE", // 0 - highlight / badge bg
      "#AAEADB",
      "#7ADCC9",
      "#44CCB3",
      "#1DB99C",
      "#0F9B82", // 5 - primary buttons (default shade)
      "#0C7D69",
      "#096052",
      "#06433A",
      "#032720",
    ],
  },
  primaryShade: 5,
});



createRoot(document.getElementById('root')).render(
  <MantineProvider theme={theme}>
    <App />
  </MantineProvider>,
)
