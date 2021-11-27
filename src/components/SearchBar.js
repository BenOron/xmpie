import React, {  useState,useEffect } from "react";
import { getPhotosFromServer } from "../utils";
import ImagePreview from "./ImagePreview";
import "./searchBar.css";
import { FaRegBookmark } from "react-icons/fa";

const SearchBar = (props) => {
  const [imagesToShow, setImagesToShow] = useState();
  const [favorites, setFavorites] = useState([]);
  const slideUpStyle = imagesToShow && imagesToShow.length > 0 ? "slideUp" : " ";
  const showBookmarkBtn = favorites && favorites.length > 0 ? "showBtn" : ""; 

  const getPhotos = (e) => {
    if (e.target.value.length > 2) {
      getPhotosFromServer(e.target.value).then((results) =>
        setImagesToShow(results)
      );
    } else {
      setImagesToShow(false);
    }
  };

  // const showFavorites = () => {
  //   if (localStorage.getItem("storageBookmarks")) {
  //       setImagesToShow(JSON.parse(localStorage.getItem("storageBookmarks")));
  //     }
  // };

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem("storageBookmarks")));
  },[]);

  //Checking the localDb
  const updatingFavorites = () => {
    if (localStorage.getItem("storageBookmarks")) {
       setFavorites(JSON.parse(localStorage.getItem("storageBookmarks")));
       setImagesToShow(JSON.parse(localStorage.getItem("storageBookmarks")));
    }
  };

  return (
    <div className={" searchImageBar " + slideUpStyle}>
      <input
        type="search"
        id="header-search"
        placeholder="Search Images"
        name="searchImage"
        onChange={(e) => getPhotos(e)}
      />

        <FaRegBookmark
          onClick={updatingFavorites}
          className={showBookmarkBtn + " bookmarkIcon fa-solid"}
        ></FaRegBookmark>
      
      {imagesToShow && imagesToShow.length > 0 && (
        <ImagePreview imagesToShow={imagesToShow} />
      )}
    </div>
  );
};

export default SearchBar;
