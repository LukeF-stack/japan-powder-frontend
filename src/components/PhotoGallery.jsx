import React, { useEffect, useState } from "react";
import "../App.css";

function PhotoGallery(props) {
  const [gallery, setGallery] = useState([]);
  const [activePhoto, setActivePhoto] = useState({});
  const [isShown, setShown] = useState(false);
  //const [destination, setDestination] = useState({});
  useEffect(() => {
    //console.log(props);
    getPhotos(props);
  }, [props]);

  const showModal = (photo) => {
    setActivePhoto(photo);
    setShown(true);
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
      const images = [];
      destination.photos.forEach((photo) => {
        images.push(
          <li key={photo} onClick={() => showModal(photo)}>
            <div
              className="photo-result"
              style={{ backgroundImage: `url(${photo})` }}
            ></div>
          </li>
        );
      });
      setGallery(images);
      setActivePhoto(images[0].key);
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
          <img src={activePhoto} alt={activePhoto} className="displayed-img" />
        </div>
      ) : null}
    </div>
  );
}

export default PhotoGallery;
