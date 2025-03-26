import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/music";

export const getAlbums = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/albums/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching albums:", error);
        return [];
    }
};

export const getSongs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/songs/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching songs:", error);
        return [];
    }
};


export const getSongsFromAlbum = async (id) => {
    try {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/music/albums/${id}/songs/`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching songs from album:", error);
        return [];
    }
};
export const getAlbumFromId = async (id) => {
    try {
        const response = await axios.get(
            `http://127.0.0.1:8000/api/music/albums/${id}/`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching album from id:", error);
        return [];
    }
};