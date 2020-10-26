import React, { useEffect, useState } from "react";
import "../App.css";

function PhotoGallery(props) {
  const [gallery, setGallery] = useState([]);
  const [activePhoto, setActivePhoto] = useState({});
  //const [destination, setDestination] = useState({});
  useEffect(() => {
    console.log(props);
    getPhotos(props);
  }, [props]);

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
          <li key={photo} onClick={() => setActivePhoto(photo)}>
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
        <div className="gallery-modal">
          <img src={activePhoto} alt={activePhoto} className="displayed-img" />
        </div>
        <ul className="photo-grid">{gallery}</ul>
      </div>
    </div>
  );
}

export default PhotoGallery;
