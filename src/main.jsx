import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/router'
import { BusinessContextProvider } from './context/BusinessContextProvider'
import { ThemeProvider } from '@mui/material'
import theme from './theme/theme'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ThemeProvider theme={theme}>
    <BusinessContextProvider>
      <RouterProvider router={router} />
    </BusinessContextProvider>
  </ThemeProvider>
  // </StrictMode>,
)
