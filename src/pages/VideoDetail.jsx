import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaComment, FaShare } from "react-icons/fa";

const VideoDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [isLiked, setIsLiked] = useState(false);

    // Fake comments data
    const fakeComments = [
        {
            id: 1,
            user: {
                name: "Nguyễn Văn A",
                avatar: "https://i.pravatar.cc/150?img=1",
            },
            content: "Video rất hay, cảm ơn tác giả đã chia sẻ!",
            likes: 12,
            time: "2 giờ trước",
        },
        {
            id: 2,
            user: {
                name: "Trần Thị B",
                avatar: "https://i.pravatar.cc/150?img=2",
            },
            content:
                "Bài hát này thật sự rất ý nghĩa, tôi đã nghe đi nghe lại nhiều lần.",
            likes: 8,
            time: "3 giờ trước",
        },
        {
            id: 3,
            user: {
                name: "Lê Văn C",
                avatar: "https://i.pravatar.cc/150?img=3",
            },
            content:
                "MV đẹp quá, hình ảnh và âm nhạc hòa quyện với nhau thật tuyệt vời.",
            likes: 15,
            time: "5 giờ trước",
        },
    ];

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/music/videos/${id}/`
                );
                const data = await response.json();
                setVideo(data);
                setComments(fakeComments);
            } catch (error) {
                console.error("Lỗi khi tải video:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, [id]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment = {
            id: Date.now(),
            user: {
                name: "Người dùng hiện tại",
                avatar: "https://i.pravatar.cc/150?img=4",
            },
            content: newComment,
            likes: 0,
            time: "Vừa xong",
        };

        setComments([comment, ...comments]);
        setNewComment("");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
                Đang tải...
            </div>
        );
    }

    if (!video) {
        return (
            <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
                Không tìm thấy video
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto bg-zinc-900 text-white">
            <div className="container mx-auto px-4 py-8">
                {/* Video Player */}
                <div className="mb-8">
                    <div className="aspect-video w-full max-w-4xl mx-auto">
                        <video
                            src={
                                video.video_file.startsWith("/")
                                    ? `http://127.0.0.1:8000${video.video_file}`
                                    : video.video_file
                            }
                            controls
                            autoPlay
                            className="w-full h-full rounded-lg"
                        />
                    </div>
                </div>

                {/* Video Info */}
                <div className="max-w-4xl mx-auto mb-8">
                    <h1 className="text-3xl font-bold mb-2">{video.title}</h1>
                    <p className="text-gray-400 mb-4">{video.artist_name}</p>

                    <div className="flex items-center gap-4 mb-4">
                        <button
                            onClick={() => setIsLiked(!isLiked)}
                            className="flex items-center gap-2 text-gray-400 hover:text-white"
                        >
                            {isLiked ? (
                                <FaHeart className="text-red-500" />
                            ) : (
                                <FaRegHeart />
                            )}
                            <span>{video.likes || 0}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                            <FaComment />
                            <span>{comments.length}</span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                            <FaShare />
                            <span>Chia sẻ</span>
                        </button>
                    </div>

                    <div className="bg-zinc-800 rounded-lg p-4">
                        <h2 className="text-xl font-semibold mb-2">Mô tả</h2>
                        <p className="text-gray-400">{video.description}</p>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Bình luận</h2>

                    {/* Comment Form */}
                    <form onSubmit={handleCommentSubmit} className="mb-8">
                        <div className="flex gap-4">
                            <img
                                src="https://i.pravatar.cc/150?img=4"
                                alt="Avatar"
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={newComment}
                                    onChange={(e) =>
                                        setNewComment(e.target.value)
                                    }
                                    placeholder="Viết bình luận..."
                                    className="w-full bg-zinc-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </form>

                    {/* Comments List */}
                    <div className="space-y-6">
                        {comments.map((comment) => (
                            <div key={comment.id} className="flex gap-4">
                                <img
                                    src={comment.user.avatar}
                                    alt={comment.user.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div className="flex-1">
                                    <div className="bg-zinc-800 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold">
                                                {comment.user.name}
                                            </h3>
                                            <span className="text-sm text-gray-400">
                                                {comment.time}
                                            </span>
                                        </div>
                                        <p className="text-gray-300">
                                            {comment.content}
                                        </p>
                                        <div className="mt-2 flex items-center gap-4">
                                            <button className="text-gray-400 hover:text-white flex items-center gap-1">
                                                <FaHeart className="text-sm" />
                                                <span className="text-sm">
                                                    {comment.likes}
                                                </span>
                                            </button>
                                            <button className="text-gray-400 hover:text-white text-sm">
                                                Trả lời
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoDetail;
