import axios from 'axios';

class DataService {
    static async updatePhoto(photo: File, serviceName: string): Promise<boolean> {
        const formData = new FormData();
        formData.append('photo', photo);

        try {
            const response = await axios.patch('http://localhost:8080/api/' + serviceName + '/info/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.status === 200;
        } catch (error) {
            console.error('Failed to update artist photo:', error);
            return false;
        }
    }
}

export default DataService;