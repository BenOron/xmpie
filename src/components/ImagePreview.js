import React from "react";
import "./images.css";
import { BsStar } from "react-icons/bs";

const ImagePreview = (props) => {
  const { imagesToShow } = props;
  let localdb = [];

  const foundInFavorites = (localdb, imgSrc) => {
    if (!localdb) {
      return;
    }

    if (JSON.parse(localStorage.getItem("storageBookmarks"))) {
      localdb = JSON.parse(localStorage.getItem("storageBookmarks"));
    }

    if (localdb.find((image) => image.previewURL === imgSrc)) {
      return "true";
    }
  };

  const removeFromFav = (imgSrc) => {
    if (JSON.parse(localStorage.getItem("storageBookmarks"))) {
      localdb = JSON.parse(localStorage.getItem("storageBookmarks"));
    }
    let newLocalDb = localdb.filter(function (image) {
      return image.previewURL !== imgSrc;
    });

    localStorage.setItem("storageBookmarks", JSON.stringify(newLocalDb));
  };

  const onBookmarkPress = (e) => {
    let imgSrc = e?.currentTarget?.parentElement?.firstElementChild?.src;
    if (JSON.parse(localStorage.getItem("storageBookmarks"))) {
      localdb = JSON.parse(localStorage.getItem("storageBookmarks"));
    }

    if (foundInFavorites(localdb, imgSrc) === "true") {
      removeFromFav(imgSrc);
      e.currentTarget.parentElement.removeAttribute("addtofav");
      return;
    }

    if (!localdb || e.currentTarget.parentElement.hasAttribute("addtofav")) {
      return;
    }

    if (!localStorage.getItem("storageBookmarks")) {
      localStorage.setItem("storageBookmarks", "[]");
    }

    localdb.push({
      id: new Date().getMilliseconds(),
      previewURL: imgSrc,
    });

    localStorage.setItem("storageBookmarks", JSON.stringify(localdb));

    e.currentTarget.parentElement.setAttribute("addtofav", "true");
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
                  addtofav={foundInFavorites(localdb, image.previewURL)}
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


