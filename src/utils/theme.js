import { createTheme } from '@material-ui/core/styles'

const lightTheme = createTheme({
  palette: {
    type: 'light',
    primary: { main: '#115293' },
    secondary: { main: '#dc004e' },
    success: { main: '#4caf50' },
    error: { main: '#d32f2f' }
  }
})

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: { main: '#648dae' },
    secondary: { main: '#f48fb1' },
    success: { main: '#81c784' },
    error: { main: '#f44336' }
  }
})

export const getMuiTheme = (theme) => {
  return theme === 'dark' ? darkTheme : lightTheme
}
