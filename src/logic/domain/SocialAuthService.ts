import api from "axios";
import {RegisterResult} from "./AuthService";

export interface RegistrationGoogleData {
    idToken: string;
    predictableUsername: string;
}

export interface RegistrationFacebookData {
    accessToken: string;
    predictableUsername: string;
}

export interface GoogleCheckResponse {
    authTypes: RegistrationActionType;
    registrationData: RegistrationGoogleData | null;
    errorMessage: string | null;
}

export interface FacebookCheckResponse {
    authTypes: RegistrationActionType;
    registrationData: RegistrationFacebookData | null;
    errorMessage: string | null;
}

export interface GoogleAuthRequest {
    idToken: string;
}

export interface FacebookAuthRequest {
    accessToken: string;
}

interface RegistrationByGoogle {
    idToken: string;
    username: string;
    likedArtistsId: string[];
    likedGenres: string[];
}

interface RegistrationByFacebook {
    accessToken: string;
    username: string;
    likedArtistsId: string[];
    likedGenres: string[];
}

export type RegistrationActionType = 'REGISTER' | 'LOGIN' | null;

class SocialAuthService {
    async sendGoogleIdToken(idToken: string): Promise<GoogleCheckResponse> {
        const requestBody: GoogleAuthRequest = { idToken }

        try {
            const response = await api.post("http://localhost:8080/api/auth/google", requestBody)

            if (response.status === 200) {
                return response.data;
            } else {
                return { authTypes: null, registrationData: null, errorMessage: 'Neočekávaná chyba, zkuste to později' };
            }
        } catch (error) {
            if (api.isAxiosError(error)) {
                console.error('Login Google failed:', error.response?.statusText || error.message);
                if (error.response?.status === 409) {
                    return {
                        authTypes: null,
                        registrationData: null,
                        errorMessage: 'Tento účet s tímto e-mailem již existuje, není možné se zaregistrovat'
                    };
                } else {
                    return {
                        authTypes: null,
                        registrationData: null,
                        errorMessage: 'Neočekávaná chyba, zkuste to později'
                    };
                }
            } else {
                console.error('Unexpected error:', error);
                return { authTypes: null, registrationData: null, errorMessage: 'Neočekávaná chyba, zkuste to později' };
            }
        }
    }

    async sendFacebookAccessToken(accessToken: string): Promise<FacebookCheckResponse> {
        const requestBody: FacebookAuthRequest = { accessToken }

        try {
            const response = await api.post("http://localhost:8080/api/auth/facebook", requestBody)

            if (response.status === 200) {
                return response.data;
            } else {
                return { authTypes: null, registrationData: null, errorMessage: 'Neočekávaná chyba, zkuste to později' };
            }
        } catch (error) {
            if (api.isAxiosError(error)) {
                console.error('Login Facebook failed:', error.response?.statusText || error.message);
                return {
                    authTypes: null,
                    registrationData: null,
                    errorMessage: 'Neočekávaná chyba, zkuste to později'
                }
            } else {
                console.error('Unexpected error:', error);
                return { authTypes: null, registrationData: null, errorMessage: 'Neočekávaná chyba, zkuste to později' };
            }
        }
    }


    async registerUserByGoogle(idToken: string, username: string, likedArtistsId: string[], likedGenres: string[]): Promise<RegisterResult> {
        const requestBody: RegistrationByGoogle = {
            idToken: idToken,
            username: username,
            likedArtistsId: likedArtistsId,
            likedGenres: likedGenres
        }

        try {
            const response = await api.post("http://localhost:8080/api/auth/google/registration", requestBody);
            if (response.status === 201) {
                return { result: true, type: 'user' }
            } else {
                return { result: false, type: null };
            }
        } catch (error) {
            if (api.isAxiosError(error)) {
                console.error('Registration failed:', error.response?.statusText || error.message);
                return { result: false, type: null };
            } else {
                console.error('Unexpected error:', error);
                return { result: false, type: null };
            }
        }
    }

    async registerUserByFacebook(accessToken: string, username: string, likedArtistsId: string[], likedGenres: string[]): Promise<RegisterResult> {
        const requestBody: RegistrationByFacebook = {
            accessToken: accessToken,
            username: username,
            likedArtistsId: likedArtistsId,
            likedGenres: likedGenres
        }

        try {
            const response = await api.post("http://localhost:8080/api/auth/facebook/registration", requestBody);
            if (response.status === 201) {
                return { result: true, type: 'user' }
            } else {
                return { result: false, type: null };
            }
        } catch (error) {
            if (api.isAxiosError(error)) {
                console.error('Registration failed:', error.response?.statusText || error.message);
                return { result: false, type: null };
            } else {
                console.error('Unexpected error:', error);
                return { result: false, type: null };
            }
        }
    }
}

export default new SocialAuthService();