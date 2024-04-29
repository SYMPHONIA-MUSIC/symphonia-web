import api from 'axios';
import {RegistrationType} from "../../components/auth/Registration";

interface LoginRequest {
    email: string;
    password: string;
    type: string;
}

interface RegisterRequest {
    email: string;
    password: string;
    type: string;
    registrationInfoDTO: RegistrationInfoDto;
}

interface UsernameAvailabilityResponse {
    isAvailable: boolean;
    message: string;
}

interface RegistrationArtistInfoDto {
    type: RegistrationType;
    username: string;
    description: string;
}

interface RegistrationUserInfoDto {
    type: RegistrationType;
    likedArtistsId: string[];
    likedGenres: string[];
}

type RegistrationInfoDto = RegistrationArtistInfoDto | RegistrationUserInfoDto;

export interface RegisterResult {
    result: boolean;
    type: RegistrationType | null;
}

class AuthService {
    async login (email: string, password: string): Promise<boolean> {
        const requestBody: LoginRequest = { email, password, type: "artist" };

        try {
            const response = await api.post("http://localhost:8080/api/auth/basic/login", requestBody)

            if (response.status === 200) {
                window.location.href = "/panel";
                return true;
            } else {
                return false;
            }
        } catch (error) {
            if (api.isAxiosError(error)) {
                console.error('Login failed:', error.response?.statusText || error.message);
                return false;
            } else {
                console.error('Unexpected error:', error);
                return false;
            }
        }
    }

    async checkIfEmailExists(email: String): Promise<boolean> {
        try {
            const response = await api.get("http://localhost:8080/api/auth/basic/" + email, {})
            if (response.status === 200) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            if (api.isAxiosError(error)) {
                console.error('Registration failed:', error.response?.statusText || error.message);
                return false;
            } else {
                console.error('Unexpected error:', error);
                return false;
            }
        }
    }

    async registerArtist(email: string, password: string, username: string, description: string): Promise<RegisterResult> {
        const registrationInfoDTO: RegistrationArtistInfoDto = {
            type: "artist",
            username: username,
            description: description,
        };
        const requestBody: RegisterRequest = { email, password, type: "ARTIST", registrationInfoDTO };

        try {
            const response = await api.post("http://localhost:8080/api/auth/basic/registration", requestBody);
            if (response.status === 201) {
                return { result: true, type: 'artist' }
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

    async checkIfUsernameIsAvailable(username: string): Promise<UsernameAvailabilityResponse> {
        try {
            const response = await api.get("http://localhost:8080/api/user/info?username=" + username);
            if (response.status === 201) {
                return { isAvailable: true, message: 'Jméno je dostupné.' };
            } else if (response.status === 409) {
                return { isAvailable: false, message: 'Jméno je již obsazeno.' };
            } else {
                return { isAvailable: false, message: 'Neznámá chyba.' };
            }
        } catch (error) {
            if (api.isAxiosError(error)) {
                console.error('Kontrola dostupnosti jména:', error.response?.statusText || error.message);
                return { isAvailable: false, message: 'Chyba při kontrole dostupnosti jména.' };
            } else {
                console.error('Neočekávaná chyba:', error);
                return { isAvailable: false, message: 'Neočekávaná chyba.' };
            }
        }
    }

    async registerUser(email: string, password: string, username: string, likedArtistsId: string[], likedGenres: string[]): Promise<RegisterResult> {
        const registrationInfoDTO: RegistrationUserInfoDto = {
            type: "user",
            likedArtistsId: likedArtistsId,
            likedGenres: likedGenres
        }
        const requestBody: RegisterRequest = { email, password, type: "USER", registrationInfoDTO };

        try {
            const response = await api.post("http://localhost:8080/api/auth/basic/registration", requestBody);
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

    async requestResetLink(email: string): Promise<boolean> {
        const requestBody = {
            email: email
        };

        try {
            const response = await api.post("http://localhost:8080/api/auth/basic/password-reset/request", requestBody);
            return response.status === 200;
        } catch (error) {
            if (api.isAxiosError(error)) {
                console.error('Sending email message failed:', error.response?.statusText || error.message);
                return false;
            } else {
                console.error('Unexpected error:', error);
                return false;
            }
        }
    }

    async resetPassword(newPassword: string, token: string): Promise<boolean> {
        const requestBody = {
            newPassword: newPassword
        };

        try {
            const response = await api.patch("http://localhost:8080/api/auth/basic/password-reset/by-link/" + token, requestBody);
            return response.status === 200;
        } catch (error) {
            if (api.isAxiosError(error)) {
                console.error('Reset password failed:', error.response?.statusText || error.message);
                return false;
            } else {
                console.error('Unexpected error:', error);
                return false;
            }
        }
    }
}

export default new AuthService();