import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import PasswordResetPage from './pages/PasswordResetPage';
import PasswordChangingPage from "./pages/PasswordChangingPage";
import PrivateRoutes from "./utils/PrivateRoutes";
import {UIProcessProvider} from "./contexts/UIProcessContext";
import GlobalLoadingAndAlerts from "./components/global/GlobalLoadingAndAlerts";
import AuthPage from "./pages/AuthPage";
import ArtistRegistrationPage from "./pages/ArtistRegistrationPage";

import axios from 'axios';
import UserRegistrationPage from "./pages/UserRegistrationPage";
import ArtistPanelPage from "./pages/ArtistPanelPage";

axios.defaults.withCredentials = true;
function App() {
  return (
        <ThemeProvider theme={theme}>
          <UIProcessProvider>
            <GlobalLoadingAndAlerts />
            <Router>
              <Routes>
                <Route>
                  <Route path="/password-reset" element={<PasswordResetPage />}/>
                  <Route path="/password-change" element={<PasswordChangingPage />}/>
                  <Route path="/auth/*" element={<AuthPage />} />
                  <Route path="/auth/artist-reg" element={<ArtistRegistrationPage />} />
                  <Route path="/auth/user-reg" element={<UserRegistrationPage />} />
                  <Route path="/artist/panel" element={<ArtistPanelPage />} />
                  {/*<Route element={<PrivateRoutes />}>*/}
                  {/*  <Route path="/artist/panel" element={<PanelPage />} />*/}
                  {/*</Route>*/}
                </Route>
              </Routes>
            </Router>
          </UIProcessProvider>
        </ThemeProvider>
  );
}

export default App;
