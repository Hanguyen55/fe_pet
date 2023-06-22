import { Container } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import galleryApi from "../../../api/galleryApi";
import "../../../sass/Home/Gallery.scss";
export default function Gallery() {
  const [data, setData] = useState(null);
  useEffect(() => {
    galleryApi.getGalleryHome({ limit: 9 }).then((ok) => {
      setData(ok.data);
    });
  }, []);
  return (
    <div className="Gallery">
      <div className="heading">
        <div className="heading__title">
          <h3>Phòng trưng bày ảnh</h3>
        </div>
        <div className="heading__hr"></div>
      </div>
      <Container maxWidth="lg">
        <div className="post-grid">
          {data?.map((ok, index) => (
            <div className="grid-item" key={index}>
              <img src={ok.link} alt="" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
