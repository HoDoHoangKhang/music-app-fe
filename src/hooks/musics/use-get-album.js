import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";

export const useGetAlbum = ({ id = "" } = {}, options = {}) => {
    return useQuery({
        queryKey: ["albums", id],
        queryFn: async () => {
            const response = await axios.get(`${API_ENDPOINTS.ALBUMS}${id}/`);
            return response.data;
        },
        initialData: { results: [], count: 0 },
        enabled: !!id, // <- chỉ fetch khi có id và tránh lỗi khi id trống
        ...options,
    });
};
