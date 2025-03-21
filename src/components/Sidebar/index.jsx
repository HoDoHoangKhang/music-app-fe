// import { useNavigate } from "react-router-dom";
// import { assets } from "../../assets/assets";
// import {
//     Description,
//     Dialog,
//     DialogPanel,
//     DialogTitle,
// } from "@headlessui/react";
// import { useState } from "react";

// //icon
// import { FaArrowLeft } from "react-icons/fa6";
// import { FaPlus } from "react-icons/fa6";
// import { GrAttachment } from "react-icons/gr";
// import { RiEmotionHappyLine } from "react-icons/ri";
// import { IoChatbubblesOutline } from "react-icons/io5";
// const Sidebar_a = () => {
//     const [isOpen, setIsOpen] = useState(false);

//     const navigate = useNavigate();
//     return (
//         <div className=" flex-col gap-2 text-white lg:flex h-[100%]">
//             <div className="bg-[#121212] h-[100%] rounded">
//                 <div className="p-4 flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                         <IoChatbubblesOutline className="text-2xl" />
//                         <p className="font-semibold">Box chat</p>
//                     </div>
//                     <div className="flex items-center gap-3">
//                         <img
//                             className="w-5"
//                             src={assets.plus_icon}
//                             alt="plus_icon"
//                         />
//                     </div>
//                 </div>
//                 <div
//                     onClick={() => setIsOpen(true)}
//                     className="p-2 py-2 bg-white/4 m-2 rounded font-semibold flex gap-2 pl-2 items-center hover:cursor-pointer hover:bg-[#424242]"
//                 >
//                     <img
//                         src="https://img.saostar.vn/pc/1617420375728/saostar-8yu6gl1qba4r213r.png"
//                         alt=""
//                         className="w-12 rounded-full"
//                     />
//                     <div>
//                         <h1>Đom Đóm</h1>
//                         <p className="font-light">Hoang Khang: Share...</p>
//                     </div>
//                 </div>
//                 <div
//                     onClick={() => setIsOpen(true)}
//                     className="p-2 py-2 bg-white/4 m-2 rounded font-semibold flex gap-2 pl-2 items-center hover:cursor-pointer hover:bg-[#424242]"
//                 >
//                     <img
//                         src="https://th.bing.com/th/id/OIP.eegLpchavZrYUCu60PRoQAHaHa?rs=1&pid=ImgDetMain"
//                         alt=""
//                         className="w-12 rounded-full"
//                     />
//                     <div>
//                         <h1>Sky</h1>
//                         <p className="font-light">Hoang Khang: Share... </p>
//                     </div>
//                 </div>
//                 <Dialog
//                     open={isOpen}
//                     onClose={() => setIsOpen(false)}
//                     className="relative z-50 "
//                 >
//                     <div className="fixed inset-0 bg-black/70 flex w-screen items-center justify-center p-4">
//                         <DialogPanel className="bg-white/5 backdrop-blur-3xl w-2xl space-y-4  rounded-md h-[80vh] overflow-y-auto text-white">
//                             <DialogTitle className="sticky top-0 z-100 left-0 right-0 flex items-center justify-between bg-[#322E2E] px-6 py-3">
//                                 <div className="flex items-center gap-6">
//                                     <FaArrowLeft
//                                         onClick={() => {
//                                             setIsOpen(false);
//                                         }}
//                                         className="text-2xl text-white/60 cursor-pointer hover:text-white/30"
//                                     />
//                                     <div>
//                                         <p className="font-bold text-lg">
//                                             Sky(Fandom MTP)
//                                         </p>
//                                         <p className="text-sm text-white/50">
//                                             6 Online
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="flex items-center ">
//                                     <img
//                                         src="https://th.bing.com/th/id/R.b4300d4736d4b1037a7117fb2e08bfd7?rik=9LW7mu%2bxYOyGhA&pid=ImgRaw&r=0"
//                                         alt=""
//                                         className="w-10 h-10 rounded-full border-3 border-[white] z-20"
//                                     />
//                                     <img
//                                         src="https://th.bing.com/th/id/R.b4300d4736d4b1037a7117fb2e08bfd7?rik=9LW7mu%2bxYOyGhA&pid=ImgRaw&r=0"
//                                         alt=""
//                                         className="ml-[-10px] w-10 h-10 rounded-full border-3 border-[white] z-10"
//                                     />
//                                     <img
//                                         src="https://th.bing.com/th/id/R.b4300d4736d4b1037a7117fb2e08bfd7?rik=9LW7mu%2bxYOyGhA&pid=ImgRaw&r=0"
//                                         alt=""
//                                         className="ml-[-10px] w-10 h-10 rounded-full border-3 border-[white] z-5"
//                                     />
//                                     <div className="ml-[-10px] w-10 h-10 rounded-full bg-gray-600/60 text-center leading-9 hover:bg-gray-600/30 cursor-pointer">
//                                         +8
//                                     </div>
//                                 </div>
//                             </DialogTitle>
//                             <Description className="px-6 py-5 space-y-2">
//                                 <div className="flex gap-2 justify-start">
//                                     <img
//                                         src="https://th.bing.com/th/id/R.b4300d4736d4b1037a7117fb2e08bfd7?rik=9LW7mu%2bxYOyGhA&pid=ImgRaw&r=0"
//                                         alt=""
//                                         className="w-10 h-10 rounded-full"
//                                     />
//                                     <div className="px-2 py-1 rounded-md bg-white/5 backdrop-blur-3xl ">
//                                         <p className="leading-6 text-gray-300">
//                                             Hoang Khang
//                                         </p>
//                                         <p>
//                                             Hoang Khang Hoang Khang Hoang Khang
//                                         </p>
//                                         <p className="text-end text-gray-300">
//                                             19:09
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="flex gap-2 justify-end">
//                                     <div className="px-2 py-1 rounded-md bg-white/5 backdrop-blur-3xl max-w-[528px]">
//                                         <p className="leading-6 text-gray-300">
//                                             Hoang Khang
//                                         </p>
//                                         <p>
//                                             Lorem ipsum dolor sit amet
//                                             consectetur, adipisicing elit.
//                                             Deserunt sint cum reprehenderit
//                                             porro obcaecati magni saepe sunt
//                                             officiis quidem dolor non rem nam
//                                             laboriosam sequi, hic provident
//                                             nostrum consequatur ducimus?
//                                         </p>
//                                         <p className="text-start text-gray-300">
//                                             19:09
//                                         </p>
//                                     </div>
//                                     <img
//                                         src="https://th.bing.com/th/id/R.b4300d4736d4b1037a7117fb2e08bfd7?rik=9LW7mu%2bxYOyGhA&pid=ImgRaw&r=0"
//                                         alt=""
//                                         className="w-10 h-10 rounded-full"
//                                     />
//                                 </div>
//                                 <div className="flex gap-2 justify-start">
//                                     <img
//                                         src="https://th.bing.com/th/id/R.b4300d4736d4b1037a7117fb2e08bfd7?rik=9LW7mu%2bxYOyGhA&pid=ImgRaw&r=0"
//                                         alt=""
//                                         className="w-10 h-10 rounded-full"
//                                     />
//                                     <div className="px-2 py-1 rounded-md bg-white/5 backdrop-blur-3xl ">
//                                         <p className="leading-6 text-gray-300">
//                                             Hoang Khang
//                                         </p>
//                                         <p>
//                                             Hoang Khang Hoang Khang Hoang Khang
//                                         </p>
//                                         <p className="text-end text-gray-300">
//                                             19:09
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="flex gap-2 justify-end">
//                                     <div className="px-2 py-1 rounded-md bg-white/5 backdrop-blur-3xl max-w-[528px]">
//                                         <p className="leading-6 text-gray-300">
//                                             Hoang Khang
//                                         </p>
//                                         <p>
//                                             Lorem ipsum dolor sit amet
//                                             consectetur, adipisicing elit.
//                                             Deserunt sint cum reprehenderit
//                                             porro obcaecati magni saepe sunt
//                                             officiis quidem dolor non rem nam
//                                             laboriosam sequi, hic provident
//                                             nostrum consequatur ducimus?
//                                         </p>
//                                         <p className="text-start text-gray-300">
//                                             19:09
//                                         </p>
//                                     </div>
//                                     <img
//                                         src="https://th.bing.com/th/id/R.b4300d4736d4b1037a7117fb2e08bfd7?rik=9LW7mu%2bxYOyGhA&pid=ImgRaw&r=0"
//                                         alt=""
//                                         className="w-10 h-10 rounded-full"
//                                     />
//                                 </div>
//                             </Description>
//                             <div className="sticky bottom-0 left-0 right-0 p-3">
//                                 <div className="bg-[#322E2E]  p-3 rounded-sm">
//                                     <textarea
//                                         placeholder="Enter messager"
//                                         className="w-full outline-none mb-2"
//                                         rows="1"
//                                     />
//                                     <div className="flex justify-between items-center">
//                                         <div className="flex items-center gap-4">
//                                             <button className="bg-white cursor-pointer rounded-sm p-2">
//                                                 <FaPlus className="text-black" />
//                                             </button>
//                                             <button className="cursor-pointer">
//                                                 <RiEmotionHappyLine className="text-xl" />
//                                             </button>
//                                             <button className="cursor-pointer">
//                                                 <GrAttachment />
//                                             </button>
//                                         </div>
//                                         <button className="cursor-pointer bg-white text-black px-3 py-1 rounded-sm hover:bg-white/90">
//                                             Send now
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </DialogPanel>
//                     </div>
//                 </Dialog>
//             </div>
//         </div>
//     );
// };

// export default Sidebar_a;
import React, { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import LibraryItems from "./LibraryItems";

export const MusicSidebar = () => {
    const [activeCategory, setActiveCategory] = useState("artists");
    const [activeItem, setActiveItem] = useState("1");

    return (
        <div className="flex flex-col h-screen bg-music animate-fade-in min-w-[260px] overflow-auto">
            {/* Header */}
            <SidebarHeader
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            {/* <SidebarSearch /> */}
            <LibraryItems
                activeItem={activeItem}
                setActiveItem={setActiveItem}
            />
            {/* <MiniPlayer /> */}
        </div>
    );
};

export default MusicSidebar;
