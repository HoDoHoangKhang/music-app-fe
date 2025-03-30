import { createApiInstance } from "./authService";

const API_BASE_URL = "http://127.0.0.1:8000/api/users";
const api = createApiInstance(API_BASE_URL);

export const getSongsFromArtist = async (id) => {
    try {
        const response = await api.get(`/artists/${id}/songs/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching songs from artist:", error);
        return [];
    }
};

export const getAlbumsFromArtist = async (id) => {
    try {
        const response = await api.get(`/artists/${id}/albums/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching albums from artist:", error);
        return [];
    }
};

export const getArtists = async () => {
    try {
        const response = await api.get(`/artists/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching artists:", error);
        return [];
    }
};

export const getArtistDetail = async (id) => {
    try {
        const response = await api.get(`/artists/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching artist detail:", error);
        return [];
    }
};

export const getFollowStatus = async (id) => {
    if (!id) {
        return null;
    }

    try {
        const response = await api.get(`/artists/${id}/follow-status/`);
        return response.data.isFollowing;
    } catch (error) {
        console.error("Error fetching follow status:", error);
        return null;
    }
};

export const toggleFollow = async (id) => {
    try {
        const response = await api.post(`/artists/${id}/follow-toggle/`, {});
        return response.data.isFollowing;
    } catch (error) {
        console.error("Error toggling follow status:", error);
        return null;
    }
};
