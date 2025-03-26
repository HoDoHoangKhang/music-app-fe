export const formatDuration = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "00:00"; // Kiểm tra input hợp lệ

    const h = Math.floor(seconds / 3600); // Lấy số giờ
    const m = Math.floor((seconds % 3600) / 60); // Lấy số phút
    const s = Math.floor(seconds % 60); // Lấy số giây

    const mm = String(m).padStart(2, "0");
    const ss = String(s).padStart(2, "0");

    return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
};
export const getTotalDuration = (songs) => {
    if (!Array.isArray(songs) || songs.length === 0) return "0 min";

    // Tính tổng giây từ danh sách bài hát
    const totalSeconds = songs.reduce(
        (acc, song) => acc + (song.duration || 0),
        0
    );

    // Chuyển đổi tổng giây sang giờ và phút
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    // Trả về đúng định dạng
    if (hours > 0 && minutes > 0) return `${hours} hr ${minutes} min`;
    if (hours > 0) return `${hours} hr`;
    return `${minutes} min`;
};


export const formatFullName = (user) => {
    if (!user || !user) return "";

    const fullName = [user.first_name, user.last_name]
        .filter(Boolean)
        .join(" ");

    return fullName;
};