import api from 'axios';

export interface CreateNewMusicDTO {
    title: string;
    albumId: string | null;
    genre: string;
    language: string;
}

export interface MusicInfoForArtistDTO {
    musicList: MusicInfo[];
}

export interface MusicInfo {
    id: string;
    photo: string;
    title: string;
    countOfListen: number;
}

export interface ChangeTitleDTO {
    musicId: string;
    title: string;
}

class MusicService {
    static baseUrl: string = 'http://localhost:8080/api/music';

    static async getLanguages(): Promise<string[]> {
        try {
            const response = await api.get(`${this.baseUrl}/enums/languages`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch languages:", error);
            throw error;
        }
    }

    static async getMusicGenres(): Promise<string[]> {
        try {
            const response = await api.get(`${this.baseUrl}/enums/music-genres`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch music genres:", error);
            throw error;
        }
    }

    static async createMusic(newMusic: CreateNewMusicDTO, musicFile: File, photoFile: File): Promise<{ isSuccess: boolean; message: string }> {
        const formData = new FormData();
        formData.append("title", newMusic.title);
        if (newMusic.albumId !== null) {
            formData.append("albumId", newMusic.albumId);

        }
        formData.append("genre", newMusic.genre);
        formData.append("language", newMusic.language);
        formData.append("musicFile", musicFile);
        formData.append("photoFile", photoFile);

        try {
            const response = await api.post(`${this.baseUrl}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                return { isSuccess: true, message: 'Music created successfully' };
            } else {
                return { isSuccess: false, message: 'Something went wrong, try later' }
            }
        } catch (error) {
            if (api.isAxiosError(error)) {
                console.error('Registration failed:', error.response?.statusText || error.message);
                return { isSuccess: false, message: 'Something went wrong, try later' }
            } else {
                console.error('Unexpected error:', error);
                return { isSuccess: false, message: 'Something went wrong, try later' }
            }
        }
    }

    static async getAllMusic(): Promise<MusicInfoForArtistDTO> {
        try {
            const response = await api.get(`${this.baseUrl}/artist/all-music`);
            return response.data;
        } catch (error) {
            console.error("Failed to fetch all music:", error);
            throw error;
        }
    }

    static async updateMusicTitle(changeTitleDTO: ChangeTitleDTO): Promise<void> {
        try {
            const response = await api.patch(`${this.baseUrl}/artist/update-title`, changeTitleDTO);
            console.log('Title updated successfully', response);
        } catch (error) {
            console.error("Failed to update music title:", error);
            throw error;
        }
    }

    static async updateMusicPhoto(musicId: string, oldHash: string, file: File): Promise<void> {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("oldHash", oldHash);
        formData.append("musicId", musicId);

        try {
            const response = await api.post(`${this.baseUrl}/artist/update-photo`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Photo updated successfully', response);
        } catch (error) {
            console.error("Failed to update music photo:", error);
            throw error;
        }
    }

    static async deleteMusic(musicId: string): Promise<void> {
        try {
            const response = await api.delete(`${this.baseUrl}/artist/delete`, { params: { musicId } });
            console.log('Music deleted successfully', response);
        } catch (error) {
            console.error("Failed to delete music:", error);
            throw error;
        }
    }
}

export default MusicService;
