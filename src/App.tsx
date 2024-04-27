import React, {useEffect} from 'react';
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
import PanelPage from './pages/PanelPage';
import PrivateRoutes from "./utils/PrivateRoutes";
import {GoogleOAuthProvider} from "@react-oauth/google";


function App() {
  return (
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route>
                <Route path="/password-reset" element={<PasswordResetPage />}/>
                <Route path="/password-changing" element={<PasswordChangingPage />}/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route element={<PrivateRoutes />}>
                  <Route path="/artist/panel" element={<PanelPage />} />
                </Route>
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
  );
}

export default App;
