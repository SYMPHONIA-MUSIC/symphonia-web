import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import PasswordResetPage from './pages/PasswordResetPage';
import PasswordChangingPage from "./pages/PasswordChangingPage";
import Panel from './pages/Panel';


function App() {

  return (
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route>
                <Route path="/artist/login" element={<LoginPage />} />
                <Route path="/artist/registration" element={<RegistrationPage />} />
                <Route path="/password-reset" element={<PasswordResetPage />}/>
                <Route path="/password-changing" element={<PasswordChangingPage />}/>
                <Route path="/author/panel" element={<Panel />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
  );
}

export default App;
