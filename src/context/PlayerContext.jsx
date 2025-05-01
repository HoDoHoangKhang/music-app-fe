import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    // =========== THÊM CHO VOLUME ============
    const volumeBg = useRef();
    const volumeBar = useRef();
    const [volume, setVolume] = useState(0.5);

    const [songs, setSongs] = useState([]);
    const [track, setTrack] = useState(null);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 },
    });

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/music/songs/"
                );
                setSongs(response.data);
                setTrack(response.data[0]);
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };
        fetchSongs();
    }, []);

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    const playWithId = async (id) => {
        const selectedTrack = songs.find((song) => song.id === id);
        if (selectedTrack) {
            setTrack(selectedTrack);
            setTimeout(() => {
                audioRef.current?.play();
                setPlayStatus(true);
            }, 100);
        }
    };

    const previous = async () => {
        const currentIndex = songs.findIndex((song) => song.id === track?.id);
        if (currentIndex > 0) {
            setTrack(songs[currentIndex - 1]);
            setTimeout(() => {
                audioRef.current?.play();
                setPlayStatus(true);
            }, 100);
        }
    };

    const next = async () => {
        const currentIndex = songs.findIndex((song) => song.id === track?.id);
        if (currentIndex < songs.length - 1) {
            setTrack(songs[currentIndex + 1]);
            setTimeout(() => {
                audioRef.current?.play();
                setPlayStatus(true);
            }, 100);
        }
    };

    const seekSong = (e) => {
        if (audioRef.current && seekBg.current) {
            audioRef.current.currentTime =
                (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
                audioRef.current.duration;
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width =
                    Math.floor(
                        (audioRef.current.currentTime /
                            audioRef.current.duration) *
                            100
                    ) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60),
                    },
                });
            };
        }
    }, [audioRef.current]);

    // Khi volume thay đổi, cập nhật audio
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
        if (volumeBar.current) {
            volumeBar.current.style.width = volume * 100 + "%";
        }
    }, [volume]);

    // Hàm xử lý khi click vào thanh volume
    const changeVolume = (e) => {
        if (!volumeBg.current) return;
        const rect = volumeBg.current.getBoundingClientRect();
        const clickX = e.clientX - rect.left; // vị trí click so với thanh
        let newVolume = clickX / rect.width;
        // Giữ volume trong khoảng [0,1]
        if (newVolume < 0) newVolume = 0;
        if (newVolume > 1) newVolume = 1;
        setVolume(newVolume);
    };
    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        songs,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,

        volumeBg,
        volumeBar,
        volume,
        setVolume,
        changeVolume,
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
