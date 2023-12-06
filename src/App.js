import './App.css';
import Customer from './pages/Customer';
import Engineer from './pages/Engineer';
import Login from './pages/Login';
import Admin from './pages/Admin';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { ThemeProvider, createTheme } from '@mui/material';



function App() {
      const defaultMaterialTheme = createTheme();

  return (
    <div>
      <ThemeProvider theme={defaultMaterialTheme}>
        <Router>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/customer' element={<Customer/>}/>
            <Route path='/engineer' element={<Engineer/>}/>
            <Route path='/admin' element={<Admin/>}/>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
