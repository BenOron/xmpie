import React from "react";
import "./images.css";
import { BsStar } from "react-icons/bs";

const ImagePreview = (props) => {
  const { imagesToShow } = props;
  let localdb = [];

  //Update the localDb
  const updateLocaldb = () => {
    if (!localStorage.getItem("storageBookmarks")) {
      localStorage.setItem("storageBookmarks", "[]");
    }
    localdb = JSON.parse(localStorage.getItem("storageBookmarks"));
   
    if(localdb && localdb.length < 1){
      document.getElementsByClassName("bookmarkIcon")[0].classList.remove("showBtn");
    }
  };

  //chacking if imgSrc exist in localStorgae
  const foundInFavorites = (imgSrc) => {
    updateLocaldb();
    if (
      localdb &&
      localdb.length > 0 &&
      localdb.find((image) => image.previewURL === imgSrc)
    ) {
      return "true";
    }
  };

  const removeFromFav = (imgSrc) => {
    updateLocaldb();
    let newLocalDb = localdb.filter(function (image) {
      return image.previewURL !== imgSrc;
    });

    localStorage.setItem("storageBookmarks", JSON.stringify(newLocalDb));
    updateLocaldb();

  };

  const onBookmarkPress = (e) => {
    let elm = e?.currentTarget?.parentElement;

    //getting the src from image.
    let imgSrc = elm?.firstElementChild.src;

    //cheack if alrady exist in favorites then remove
    if (foundInFavorites(imgSrc) === "true") {
      removeFromFav(imgSrc);
      elm.removeAttribute("addtofav");

      return;
    }

    //adding to local storage
    addTolocalStorage(imgSrc);

    //adding attr to dom for css changes
    elm.setAttribute("addtofav", "true");
    document.getElementsByClassName("bookmarkIcon")[0].classList.add("showBtn");
  };

  //Add new entry to localStorage
  const addTolocalStorage = (imgSrc) => {
    localdb.push({
      id: new Date().getMilliseconds(),
      previewURL: imgSrc,
    });

    localStorage.setItem("storageBookmarks", JSON.stringify(localdb));
  };

  return (
    <>
      <div className="imagesBody">
        <div className="image">
          {imagesToShow.map((image) => {
            if (image) {
              return (
                <span
                  key={image.id}
                  addtofav={foundInFavorites(image.previewURL)}
                >
                  <img alt="notFound" src={image.previewURL}></img>
                  <BsStar
                    onClick={(e) => onBookmarkPress(e)}
                    className={"isFavIcon"}
                  ></BsStar>
                </span>
              );
            }
            return null;
          })}
        </div>
      </div>
    </>
  );
};

export default ImagePreview;
