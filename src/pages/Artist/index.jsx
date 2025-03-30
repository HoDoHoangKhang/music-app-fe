// React
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//component
import AlbumItem from "../../components/AlbumItem";
import ArtistItem from "../../components/ArtistItem";
import ArtistDetail from "./ArtistDetail";
import Title from "../../components/Title";
import SongRow from "../../components/SongRow";
import {
    getAlbumsFromArtist,
    getArtistDetail,
    getArtists,
    getFollowStatus,
    getSongsFromArtist,
} from "../../api/userService";
import { formatFullName } from "../../utils/format";

const Artist = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Lấy id từ URL
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
    const fullNameArtist = formatFullName(artistDetail.user);
    return (
        <div className="pb-4" ref={detailRef}>
            <ArtistDetail
                id={artistDetail.id}
                backropImage={artistDetail.backdrop_img}
                name={fullNameArtist}
            />
            <div>
                <div className="px-6">
                    <h1 className="my-5 font-bold text-2xl">Popular</h1>
                    {songs.map((item, index) => (
                        <SongRow
                            key={index}
                            song={item}
                            albumTitle={item?.album?.title}
                            albumReleaseDate={item?.album?.release_date}
                            index={index}
                        />
                    ))}
                    <button className=" mt-2 font-bold text-gray-400 hover:text-white cursor-pointer">
                        See more
                    </button>
                </div>
                <div className="px-6">
                    <Title title={"Albums"} onClick={() => navigate(`/`)} />
                    <div className="flex overflow-auto over">
                        {albums.map((item) => (
                            <AlbumItem
                                key={item.id}
                                name={item.title}
                                id={item.id}
                                image={`http://127.0.0.1:8000${item.cover_image}`}
                            />
                        ))}
                    </div>
                </div>
                <div className="px-6">
                    <Title
                        title={"Fans also like"}
                        onClick={() => navigate(`/`)}
                    />
                    <div className="flex overflow-auto over">
                        {artists.map((item) => (
                            <ArtistItem
                                key={item.id}
                                id={item.id}
                                avatar={item?.user?.avatar}
                                name={item?.user?.last_name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Artist;
