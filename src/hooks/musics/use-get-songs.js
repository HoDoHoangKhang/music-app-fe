import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";

export const useGetSongs = (
    {
        search = "",
        genre = "",
        artist = "",
        album = "",
        is_premium = "",
        ordering = "title",
    } = {},
    options = {}
) => {
    return useQuery({
        queryKey: ["songs", search, genre, artist, album, is_premium, ordering],
        queryFn: async () => {
            const response = await axios.get(API_ENDPOINTS.SONGS, {
                params: {
                    search,
                    genre,
                    artist,
                    album,
                    is_premium,
                    ordering,
                },
            });
            return response.data;
        },
        initialData: { results: [], count: 0 },
        ...options,
    });
};
