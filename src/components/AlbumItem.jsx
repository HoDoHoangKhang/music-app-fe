import { useNavigate } from "react-router-dom"


const AlbumItem = ({image,name,desc,id}) => {

  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(`/album/${id}`)} className="max-w-[200px] p-2 rounded cursor-pointer hover:bg-[#ffffff26]">
        <img className="rounded" src={image} alt="image" />
        <p className="font-bold mt-2 mb-1">{name}</p>
        <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  )
}

export default AlbumItem