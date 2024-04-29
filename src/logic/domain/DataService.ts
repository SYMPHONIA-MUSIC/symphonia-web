import axios from 'axios';

class DataService {
    static async updateArtistPhoto(photo: File): Promise<boolean> {
        const formData = new FormData();
        formData.append('photo', photo);

        try {
            const response = await axios.patch('http://localhost:8080/api/artist/info/photo', formData, {
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