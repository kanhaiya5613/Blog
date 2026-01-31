import React from "react";
import appwriteService from "../appWrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id: id, title, featuredImage }) {

  if (!id) return null;
  //console.log(featuredImage);
  
  return (
    <Link to={`/post/${id}`} className="w-full block h-full">
      <div className="w-full h-full bg-gray-100 rounded-xl p-4 hover:shadow-lg transition flex flex-col">
                <div className="w-full aspect-video mb-4 overflow-hidden h-45 rounded-xl">
          {featuredImage ? (
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title || "Post image"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        <h2 className="text-xl font-bold line-clamp-2">
          {title || "Untitled Post"}
        </h2>
      </div>
    </Link>
  );
}
export default PostCard;
