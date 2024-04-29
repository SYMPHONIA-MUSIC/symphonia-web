import React from 'react';
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {GoogleLogin} from "@react-oauth/google";
import {useTheme} from "@mui/material/styles";
import {FacebookLoginButton, GoogleLoginButton} from "react-social-login-buttons";
import MyFacebookLoginButton from "../../utils/FacebookCustomButton";
import {LoginSocialFacebook, LoginSocialGoogle} from "reactjs-social-login";

const SocialLogin: React.FC = () => {
    const theme = useTheme()

    return (
        <Box
            p={4}
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{
                width: '100%',
                textAlign: 'center',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', marginBottom: '15px' }}>
                <Box sx={{ borderBottom: `2px solid ${theme.palette.text.primary}`, flexGrow: 1 }} />
                <Typography
                    sx={{
                        mx: 2,
                        color: theme.palette.text.primary,

                    }}
                >
                    Nebo
                </Typography>
                <Box sx={{ borderBottom: `2px solid ${theme.palette.text.primary}`, flexGrow: 1 }} />
            </Box>

             <LoginSocialGoogle client_id={"*"}
                           onReject={(error) => {
                                 console.log(error);
                             }}
                            onResolve={(response) => {
                                console.log(response);
                           }}>
                 <GoogleLoginButton />
             </LoginSocialGoogle>
            <LoginSocialFacebook appId={"*"}
                                 onReject={(error) => {
                                     console.log(error);
                                 }}
                                 onResolve={(response) => {
                                     console.log(response);
                                 }
                                 }>
                <FacebookLoginButton />
            </LoginSocialFacebook>
        </Box>
    )
}

export default SocialLogin;