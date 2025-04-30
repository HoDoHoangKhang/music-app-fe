import { useState, useEffect } from "react";
import { updatePlaylist } from "../../api/musicService";
import { toast } from "react-toastify";

const EditPlaylistModal = ({
    isOpen,
    onClose,
    playlistId,
    currentName,
    currentImage,
    onSuccess,
}) => {
    const [playlistName, setPlaylistName] = useState(currentName);
    const [coverImage, setCoverImage] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isOpen) {
            setPlaylistName(currentName);
            setCoverImage(null);
            setError("");
        }
    }, [isOpen, currentName]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!playlistName.trim()) {
            setError("Vui lòng nhập tên playlist");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", playlistName);
            if (coverImage) {
                formData.append("cover_image", coverImage);
            }

            const updatedPlaylist = await updatePlaylist(playlistId, formData);
            if (onSuccess && typeof onSuccess === "function") {
                onSuccess(updatedPlaylist);
            }
            onClose();
            toast.success("Cập nhật playlist thành công");
        } catch (error) {
            setError("Có lỗi xảy ra khi cập nhật playlist");
            toast.error("Có lỗi xảy ra khi cập nhật playlist");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverImage(file);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/35 bg-opacity-50 flex items-center justify-center z-1010101">
            <div className="bg-zinc-800 p-6 rounded-lg w-96 z-1010101">
                <h2 className="text-xl font-bold mb-4 text-white">
                    Chỉnh sửa Playlist
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            placeholder="Nhập tên playlist"
                            className="w-full px-3 py-2 bg-zinc-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Ảnh bìa
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-3 py-2 bg-zinc-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-zinc-700 rounded hover:bg-zinc-600 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition-colors"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPlaylistModal;
