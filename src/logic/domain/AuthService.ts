import api from 'axios';

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest {
    email: string;
    password: string;
}

class AuthService {
    async login (email: string, password: string): Promise<boolean> {
        const requestBody: LoginRequest = { email, password };

        try {
            const response = await api.post("http://localhost:8080/api/auth/artist/login", requestBody)

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

    async register(email: string, password: string): Promise<boolean> {
        const requestBody: RegisterRequest = { email, password };

        try {
            const response = await api.post("http://localhost:8080/api/auth/artist/register", requestBody);
            if (response.status === 201) {
                window.location.href = "/panel";
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