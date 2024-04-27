export async function checkAuthentication(): Promise<boolean> {
    try {
        const response = await fetch("http://localhost:8080/api/auth/token/validate", {
            method: 'POST',
        });

        if (response.status === 200) {
            return true;
        } else if (response.status === 403) {
            return false;
        } else {
            console.error('Authentication failed with status:', response?.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error during authentication check:', error);
        return false;
    }
}