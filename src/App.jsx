import { useContext } from "react";
import Display from "./pages/Display";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import { PlayerContext } from "./context/PlayerContext";
import Header from "./components/Header";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import UserContextProvider from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, Route, Routes } from "react-router-dom";
import VideoDetail from "./pages/VideoDetail";

const App = () => {
    const { audioRef, track } = useContext(PlayerContext);
    const location = useLocation();
    const isChatPage = location.pathname === "/chat";

    return (
        <UserContextProvider>
            <div className="h-screen bg-black box-border text-[14px]">
                <Header />
                <div className="h-[76%]">
                    <ResizablePanelGroup direction="horizontal">
                        {!isChatPage && (
                            <>
                                <ResizablePanel
                                    defaultSize={25}
                                    className="pb-2 pl-2 pr-1 min-w-[250px]"
                                >
                                    <Sidebar />
                                </ResizablePanel>
                                <ResizableHandle className="bg-[black]" />
                            </>
                        )}
                        <ResizablePanel
                            defaultSize={isChatPage ? 100 : 75}
                            className="pb-2 pr-2 pl-1 min-w-[400px]"
                        >
                            <Routes>
                                <Route
                                    path="/video/:id"
                                    element={<VideoDetail />}
                                />
                                <Route path="*" element={<Display />} />
                            </Routes>
                        </ResizablePanel>
                    </ResizablePanelGroup>
                </div>
                <Player />
                {track && (
                    <audio
                        ref={audioRef}
                        src={track.file_url}
                        preload="auto"
                    ></audio>
                )}
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
        </UserContextProvider>
    );
};

export default App;
