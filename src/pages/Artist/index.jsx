// React
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//component
import AlbumItem from "../../components/AlbumItem";
import ArtistItem from "../../components/ArtistItem";
import ArtistDetail from "./ArtistDetail";
import Title from "../../components/Title";
import SongRow from "../../components/SongRow";

import { formatFullName } from "../../utils/format";
import { useGetSongs } from "../../hooks/musics/use-get-songs";
import { useGetAlbums } from "../../hooks/musics/use-get-albums";
import { useGetArtists } from "../../hooks/users/use-get-artists";
import { useGetArtist } from "../../hooks/users/use-get-artist";

const Artist = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Lấy id từ URL
    const detailRef = useRef(null); // Xử lý cuộn scroll về đầu trang

    const {
        data: songs,
        isLoading: songsLoading,
        error: songsError,
    } = useGetSongs({
        artist: id,
    });
    const {
        data: albums,
        isLoading: albumsLoading,
        error: albumsError,
    } = useGetAlbums({
        artist: id,
    });

    const {
        data: artists,
        isLoading: artistsLoading,
        error: artistsError,
    } = useGetArtists();

    const {
        data: artistDetail,
        isLoading: artistDetailLoading,
        error: artistDetailError,
    } = useGetArtist({
        id: id,
    });

    useEffect(() => {
        if (detailRef.current) {
            detailRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [id]);

    if (
        artistDetailLoading ||
        songsLoading ||
        albumsLoading ||
        artistsLoading
    ) {
        return <div>Loading...</div>;
    }
    if (artistDetailError || songsError || albumsError || artistsError) {
        return (
            <div className="text-red-500">Error loading data</div>
        );
    }
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
                    {songs.length > 0 ? (
                        songs.map((item, index) => (
                            <SongRow
                                key={index}
                                song={item}
                                albumTitle={item?.album?.title}
                                albumReleaseDate={item?.album?.release_date}
                                index={index}
                            />
                        ))
                    ) : (
                        <div className="text-gray-500">No songs available</div>
                    )}
                    <button className=" mt-2 font-bold text-gray-400 hover:text-white cursor-pointer">
                        See more
                    </button>
                </div>
                <div className="px-6">
                    <Title title={"Albums"} onClick={() => navigate(`/`)} />
                    <div className="flex overflow-auto over">
                        {albums.length > 0 ? (
                            albums?.map((album) => (
                                <AlbumItem
                                    key={album.id}
                                    name={album.title}
                                    id={album.id}
                                    image={album.cover_image}
                                />
                            ))
                        ) : (
                            <div className="text-gray-500">
                                No albums available
                            </div>
                        )}
                    </div>
                </div>
                <div className="px-6">
                    <Title
                        title={"Fans also like"}
                        onClick={() => navigate(`/`)}
                    />
                    <div className="flex overflow-auto over">
                        {artists.length > 0 ? (
                            artists.map((artist) => (
                                <ArtistItem
                                    key={artist.id}
                                    id={artist.id}
                                    avatar={artist?.user?.avatar}
                                    name={artist?.user?.last_name}
                                />
                            ))
                        ) : (
                            <div className="text-gray-500">
                                No artists available
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Artist;
