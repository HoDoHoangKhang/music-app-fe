import Navbar from "./Navbar";
import { albumsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import { songsData } from "../assets/assets";
import SongItem from "./SongItem";

const DisplayHome = () => {
    return (
        <div>
            <Navbar />
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
                    <button className="font-bold hover:underline hover:cursor-pointer">
                        Show all
                    </button>
                </div>
                <div className="flex overflow-auto">
                    {albumsData.map((item, index) => (
                        <AlbumItem
                            key={index}
                            name={item.name}
                            desc={item.desc}
                            id={item.id}
                            image={item.image}
                        />
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <h1 className="my-5 font-bold text-2xl">
                        Today&apos;s biggest hits
                    </h1>
                    <button className="font-bold hover:underline hover:cursor-pointer">
                        Show all
                    </button>
                </div>
                <div className="flex overflow-auto over">
                    {songsData.map((item, index) => (
                        <SongItem
                            key={index}
                            name={item.name}
                            desc={item.desc}
                            id={item.id}
                            image={item.image}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DisplayHome;
