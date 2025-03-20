import { useNavigate } from "react-router-dom";
import "tippy.js/dist/tippy.css"; // optional

const Navbar = () => {
    const naviagte = useNavigate();
    return (
        <>
            <div className="flex items-center gap-2 mt-2">
                <p className="bg-white text-black px-4 py-1 rounded-2xl">All</p>
                <p className="bg-[#242424] cursor-pointer  px-4 py-1 rounded-2xl">
                    Music
                </p>
                <p className="bg-[#242424] cursor-pointer  px-4 py-1 rounded-2xl">
                    Podcasts
                </p>
            </div>
        </>
    );
};

export default Navbar;
