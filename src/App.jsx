import { useContext } from "react";
import Display from "./components/Display";
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
            <div className="h-[80%]">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel
                        defaultSize={25}
                        className="py-2 pl-2 pr-1 min-w-[250px]"
                    >
                        <Sidebar />
                    </ResizablePanel>
                    <ResizableHandle className="bg-[black]" />
                    <ResizablePanel
                        defaultSize={75}
                        className="py-2 pr-2 pl-1 min-w-[400px]"
                    >
                        <Display />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
            <Player />
            <audio ref={audioRef} src={track.file} preload="auto"></audio>
        </div>
    );
};


export default App;
