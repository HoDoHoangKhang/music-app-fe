import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";

export const useGetArtists = ({} = {}, options = {}) => {
    return useQuery({
        queryKey: ["artists"],
        queryFn: async () => {
            const response = await axios.get(API_ENDPOINTS.ARTISTS, {
                params: {},
            });
            return response.data;
        },
        initialData: { results: [], count: 0 },
        ...options,
    });
};
