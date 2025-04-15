import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";

export const useGetAlbums = (
    {
        artist = "",
    } = {},
    options = {}
) => {
    return useQuery({
        queryKey: ["albums", artist],
        queryFn: async () => {
            const response = await axios.get(API_ENDPOINTS.ALBUMS, {
                params: {
                    artist,
                },
            });
            return response.data;
        },
        initialData: { results: [], count: 0 },
        ...options,
    });
};
