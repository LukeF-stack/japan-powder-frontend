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
    document
      .querySelector(`.${props.selector}-page`)
      .classList.add("photo-view");
  };

  const nextPhoto = () => {
    //console.log(activePhoto);
    if (activePhoto.index < photoList.length - 1) {
      setActivePhoto(photoList[activePhoto.index + 1]);
    } else {
      //console.log("set to 0");
      setActivePhoto(photoList[0]);
    }
  };

  const previousPhoto = () => {
    if (activePhoto.index > 0) {
      setActivePhoto(photoList[activePhoto.index - 1]);
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
            document
              .querySelector(`.${props.selector}-page`)
              .classList.remove("photo-view");
            setShown(false);
          }}
        >
          <div className="modal-close"> &#10799;</div>
        </div>
      ) : null}

      {isShown ? (
        <div className="gallery-modal-photo">
          {activePhoto.index > 0 ? (
            <div
              className="modal_arrow"
              onClick={() => {
                previousPhoto();
              }}
            >
              <img src="/images/arrow_left.svg" alt="right arrow" />
            </div>
          ) : null}
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
