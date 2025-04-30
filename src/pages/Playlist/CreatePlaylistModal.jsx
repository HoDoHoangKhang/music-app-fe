import { useState } from "react";
import { createPlaylist } from "../../api/musicService";

const CreatePlaylistModal = ({ isOpen, onClose, onSuccess, songId }) => {
    const [playlistName, setPlaylistName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!playlistName.trim()) {
            setError("Vui lòng nhập tên playlist");
            return;
        }

        try {
            // Tạo playlist mới và thêm bài hát vào playlist
            await createPlaylist(playlistName, songId);
            onSuccess();
            onClose();
        } catch (error) {
            setError("Có lỗi xảy ra khi tạo playlist");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/35 bg-opacity-50 flex items-center justify-center z-1010101">
            <div className="bg-zinc-800 p-6 rounded-lg w-96 z-1010101">
                <h2 className="text-xl font-bold mb-4 text-white">Tạo Playlist Mới</h2>
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
                            Tạo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePlaylistModal;
