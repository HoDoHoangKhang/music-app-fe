import { createApiInstance } from "./authService";

const API_BASE_URL = "http://127.0.0.1:8000/api/music";
const api = createApiInstance(API_BASE_URL);

export const getAlbums = async () => {
    try {
        const response = await api.get(`/albums/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching albums:", error);
        return [];
    }
};

export const getSongs = async () => {
    try {
        const response = await api.get(`/songs/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching songs:", error);
        return [];
    }
};

export const getSongsFromAlbum = async (id) => {
    try {
        const response = await api.get(`/albums/${id}/songs/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching songs from album:", error);
        return [];
    }
};

export const getAlbumFromId = async (id) => {
    try {
        const response = await api.get(`/albums/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching album from id:", error);
        return [];
    }
};

// Toggle like/unlike cho bài hát
export const toggleSongLike = async (songId) => {
    try {
        const response = await api.post(`/songs/${songId}/like-toggle/`);
        console.log(`${songId} ${response.data}`);
        return response.data;
    } catch (error) {
        console.error("Error toggling song like:", error);
        return null;
    }
};

// Toggle like/unlike cho album
export const toggleAlbumLike = async (albumId) => {
    try {
        const response = await api.post(`/albums/${albumId}/like-toggle/`);
        return response.data;
    } catch (error) {
        console.error("Error toggling album like:", error);
        return null;
    }
};

// Kiểm tra trạng thái like của bài hát
export const checkSongLikeStatus = async (songId) => {
    try {
        const response = await api.get(`/likes/check/song/${songId}/`);
        return response.data.liked;
    } catch (error) {
        console.error("Error checking song like status:", error);
        return false;
    }
};

// Kiểm tra trạng thái like của album
export const checkAlbumLikeStatus = async (albumId) => {
    try {
        const response = await api.get(`/likes/check/album/${albumId}/`);
        return response.data.liked;
    } catch (error) {
        console.error("Error checking album like status:", error);
        return false;
    }
};

// Lấy toàn bộ playlists của user
export const getUserPlaylist = async () => {
    try {
        const response = await api.get(`/my-playlists/`);
        return response.data;
    } catch (error) {
        console.error("Error get user playlist:", error);
        return false;
    }
};

// Lấy 1 playlist của user
export const getUserPlaylistDetail = async (playlistId) => {
    try {
        const response = await api.get(`/my-playlists/${playlistId}/`);
        return response.data;
    } catch (error) {
        console.error("Error get user playlist detail:", error);
        return false;
    }
};
