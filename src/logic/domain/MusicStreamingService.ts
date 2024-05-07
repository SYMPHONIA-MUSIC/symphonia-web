import api from 'axios';

class MusicStreamingService {
    static baseUrl: string = 'http://localhost:8080/api/music';

    static async getSafeUrlToMusic(id: string): Promise<string | null> {
        try {
            const response = await api.get(`${this.baseUrl}/${id}/access`);
            return response.data;
        } catch (error) {
            console.error('Error fetching safe music URL:', error);
            return null;
        }
    }
}

export default MusicStreamingService;
