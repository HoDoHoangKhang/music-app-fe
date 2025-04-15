//Cài reactjs + vite
    npm create vite@latest my-app --template react
    cd my-app
    npm install
    nom run dev

// Cài tailwind
    npm install tailwindcss @tailwindcss/vite
    // Thêm taiwind vào file vite.config.js
        import { defineConfig } from 'vite'
        import tailwindcss from '@tailwindcss/vite'
        export default defineConfig({
        plugins: [
            tailwindcss(),
        ],
        })
    //Thêm dòng này vào file css
        @import "tailwindcss";

//setup router
npm i react-dom react-router-dom

// tippyjs
npm i @tippyjs/react

// react-icon
npm install react-icons --save

//npm install @headlessui/react

Các chức năng đã làm
Đăng nhập
Hiển thị bài hát
Follow nghệ sĩ 
Hiển thị albumss
Hiển thị bài hát của 1 nghệ sĩ
Hiển thị bài hát của 1 album
Chơi nhạc
Like/unlike bài hát
Hiển thị chi tiết 1 playlist của 1 user
Hiển thị danh sách danh sách playlist của 1 user
Hiển thị Danh sách nghệ sĩ
Hiển thị danh sách bài hát của 1 nghệ sĩ
Hiển Hiển danh sách albums của 1 nghệ sĩ


import { createApiInstance } from "./authService";

const API_BASE_URL = "http://127.0.0.1:8000/api/music";
const api = createApiInstance(API_BASE_URL);

// Lấy danh sách albums
export const getAlbums = async () => {
    try {
        const response = await api.get(`/albums/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching albums:", error);
        return [];
    }
};

// Lấy danh sách bài hát
export const getSongs = async () => {
    try {
        const response = await api.get(`/songs/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching songs:", error);
        return [];
    }
};

// Lấy danh sách bài hát theo album
export const getSongsFromAlbum = async (id) => {
    try {
        const response = await api.get(`/albums/${id}/songs/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching songs from album:", error);
        return [];
    }
};

// Lấy albums theo artist
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


    const detailRef = useRef(null); // Xử lý cuộn scroll về đầu trang
    const [songs, setSongs] = useState([]);
    const [albums, setAlbunms] = useState([]);
    const [artists, setArtists] = useState([]);
    const [artistDetail, setArtistDetail] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const [songsData, albumsData, artistsData, artistDetailData] =
                await Promise.all([
                    getSongsFromArtist(id),
                    getAlbumsFromArtist(id),
                    getArtists(),
                    getArtistDetail(id),
                ]);
            setSongs(songsData);
            setAlbunms(albumsData);
            setArtists(artistsData);
            setArtistDetail(artistDetailData);
        };
        fetchData();
        // Xử lý cuộn scroll về đầu trang
        if (detailRef.current) {
            detailRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [id]);

albums.map((item) => (
                           
                        ))