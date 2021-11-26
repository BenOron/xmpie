import React, { useEffect, useState } from "react";
import { getPhotosFromServer } from "../utils";
import ImagePreview from "./ImagePreview";
import "./searchBar.css";
import { FaRegBookmark } from "react-icons/fa";

const SearchBar = (props) => {
  const [imagesToShow, setImagesToShow] = useState();
  const [favorites, setFavorites] = useState([]);
  const slideUpStyle = imagesToShow && imagesToShow.length > 0 ? "slideUp" : " ";


  const getPhotos = (e) => {
    if (e.target.value.length > 2) {
      getPhotosFromServer(e.target.value).then((results) =>
        setImagesToShow(results)
      );
    } else {
      setImagesToShow(false);
    }
  };
 

  const showFavorites = () => {    
    if (localStorage.getItem("storageBookmarks")) {
        setImagesToShow(JSON.parse(localStorage.getItem("storageBookmarks")));
      }
  };

  useEffect(() => {
    if (localStorage.getItem("storageBookmarks")) {
        setFavorites(JSON.parse(localStorage.getItem("storageBookmarks")));
      }
  }, []);

  return (
    <div className={" searchImageBar " + slideUpStyle}>
      <input
        type="search"
        id="header-search"
        placeholder="Search Images"
        name="searchImage"
        onChange={(e) => getPhotos(e)}
      />
      {localStorage.getItem("storageBookmarks") && JSON.parse(localStorage.getItem("storageBookmarks")).length >0 && <FaRegBookmark
        onClick={showFavorites}
        className="bookmarkIcon fa-solid"
      ></FaRegBookmark>}
      {imagesToShow && imagesToShow.length > 0 && <ImagePreview imagesToShow={imagesToShow} />}
    </div>
  );
};

export default SearchBar;
