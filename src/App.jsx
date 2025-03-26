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

const App = () => {
    const { audioRef, track } = useContext(PlayerContext);
    return (
        <div className="h-screen bg-black box-border text-[14px]">
            <Header />
            <div className="h-[76%]">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel
                        defaultSize={25}
                        className="pb-2 pl-2 pr-1 min-w-[250px]"
                    >
                        <Sidebar />
                    </ResizablePanel>
                    <ResizableHandle className="bg-[black]" />
                    <ResizablePanel
                        defaultSize={75}
                        className="pb-2 pr-2 pl-1 min-w-[400px]"
                    >
                        <Display />
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
        </div>
    );
};

export default App;
