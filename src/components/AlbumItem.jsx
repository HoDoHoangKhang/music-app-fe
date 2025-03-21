import { useNavigate } from "react-router-dom"


const AlbumItem = ({image,name,desc,id}) => {

  const navigate = useNavigate()
  return (
      <div
          onClick={() => navigate(`/album/${id}`)}
          className="min-w-[180px] max-w-[180px] p-2 rounded cursor-pointer hover:bg-[#ffffff26] transition-all duration-200 ease-in-out"
      >
          <img className="rounded" src={image} alt="image" />
          <p className="font-bold mt-2 mb-1">{name}</p>
          <p className="text-slate-200 text-sm">{desc}</p>
      </div>
  );
}

export default AlbumItem