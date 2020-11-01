import React, { useEffect, useState } from "react";
import "../App.css";

function PhotoGallery(props) {
  const [gallery, setGallery] = useState([]);
  const [photoList, setPhotoList] = useState({});
  const [activePhoto, setActivePhoto] = useState({});
  const [isShown, setShown] = useState(false);
  //const [destination, setDestination] = useState({});
  useEffect(() => {
    //console.log(props);
    getPhotos(props);
  }, []);

  const showModal = (photo) => {
    //const photo = { index: photoIndex, src: photoSrc };
    setActivePhoto(photo);
    setShown(true);
  };

  const nextPhoto = () => {
    //console.log(activePhoto);
    //console.log(photoList);
    // const photo = photoList.filter(function (result) {
    //   if (activePhoto.index <= photoList.length + 1) {
    //     return result.index === activePhoto.index + 1;
    //   } else {
    //     return result.index === "0";
    //   }
    // });
    //console.log(photoList);
    if (activePhoto.index < photoList.length - 1) {
      setActivePhoto(photoList[activePhoto.index + 1]);
    } else {
      console.log("set to 0");
      setActivePhoto(photoList[0]);
    }
  };

  const getPhotos = async (props) => {
    //console.log("id is", props.id);
    try {
      const response = await fetch(
        `https://dsbn3.sse.codesandbox.io/api/${props.db}/${props.id}`
      );
      const destination = await response.json();
      //setDestination(destination);
      //console.log(destination);
      const imageObjs = [];
      const images = [];
      let index = 0;
      destination.photos.forEach((photo) => {
        const photoObj = {};
        photoObj["index"] = index;
        photoObj["src"] = photo;
        photoObj["el"] = (
          <li key={index} onClick={() => showModal(photoObj)}>
            <div
              className="photo-result"
              style={{ backgroundImage: `url(${photo})` }}
            ></div>
          </li>
        );
        //console.log(photoObj.index);
        images.push(photoObj);
        imageObjs.push(photoObj.el);
        index += 1;
      });
      //console.log(images);
      setPhotoList(images);
      setGallery(imageObjs);
      // setActivePhoto(images[0].src);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <div className="grid-container">
        <ul className="photo-grid">{gallery}</ul>
      </div>
      {isShown ? (
        <div
          className="gallery-modal"
          onClick={(e) => {
            //console.log(e.target.children);
            setShown(false);
          }}
        ></div>
      ) : null}

      {isShown ? (
        <div className="gallery-modal-photo">
          <div className="modal_arrow">
            <img src="/images/arrow_left.svg" alt="right arrow" />
          </div>
          <img
            src={activePhoto.src}
            alt={activePhoto.src}
            className="displayed-img"
          />
          <div
            className="modal_arrow"
            onClick={() => {
              //console.log(gallery);
              nextPhoto();
            }}
          >
            <img src="/images/arrow_right.svg" alt="right arrow" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PhotoGallery;
