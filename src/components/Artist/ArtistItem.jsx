import React from 'react'

const ArtistItem = () => {
  return (
      <div className="rounded-sm p-3 hover:bg-zinc-700/30 transition-colors group cursor-pointer  min-w-[180px] max-w-[180px]">
          <img
              src="https://th.bing.com/th/id/OIP.bnYhHEnCqJj9HrZmZUijrgHaE8?rs=1&pid=ImgDetMain"
              alt=""
              className="aspect-square rounded-full object-cover mb-2"
          />
          <div>
              <h3 className="font-semibold text-sm truncate ">Rober</h3>
              <p className="text-xs text-gray-400 truncate">Artist</p>
          </div>
      </div>
  );
}

export default ArtistItem
