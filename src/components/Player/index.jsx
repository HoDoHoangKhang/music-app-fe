import React from 'react'
import {
    FaHeart,
    FaPlay,
    FaRandom,
    FaStepBackward,
    FaStepForward,
    FaRedo,
    FaVolumeUp,
} from "react-icons/fa";
const Player = () => {
  return (
      <div className="h-[14%] bg-[#121212] border-t border-zinc-800 flex items-center px-4">
          <div className="flex items-center w-1/3">
              <img
                  src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=60&h=60"
                  alt="Now Playing"
                  className="w-14 h-14 rounded object-cover"
              />
              <div className="ml-4">
                  <h4 className="text-sm font-semibold text-white">
                      Current Song
                  </h4>
                  <p className="text-xs text-gray-400">Artist Name</p>
              </div>
              <button className="ml-4 text-gray-400 hover:text-white">
                  <FaHeart />
              </button>
          </div>

          <div className="flex-1 flex flex-col items-center">
              <div className="flex items-center space-x-6">
                  <button className="text-gray-400 hover:text-white">
                      <FaRandom />
                  </button>
                  <button className="text-gray-400 hover:text-white">
                      <FaStepBackward />
                  </button>
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform">
                      <FaPlay />
                  </button>
                  <button className="text-gray-400 hover:text-white">
                      <FaStepForward />
                  </button>
                  <button className="text-gray-400 hover:text-white">
                      <FaRedo />
                  </button>
              </div>
              <div className="w-full max-w-xl flex items-center space-x-4 mt-2">
                  <span className="text-xs text-gray-400">0:00</span>
                  <div className="flex-1 h-1 bg-gray-600 rounded-full">
                      <div className="w-1/3 h-full bg-gray-200 rounded-full relative">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100"></div>
                      </div>
                  </div>
                  <span className="text-xs text-gray-400">3:45</span>
              </div>
          </div>

          <div className="w-1/3 flex items-center justify-end space-x-4">
              <FaVolumeUp className="text-gray-400" />
              <div className="w-24 h-1 bg-gray-600 rounded-full">
                  <div className="w-1/2 h-full bg-gray-200 rounded-full"></div>
              </div>
          </div>
      </div>
  );
}

export default Player;
