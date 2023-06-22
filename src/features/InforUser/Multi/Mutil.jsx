import React, { useState } from "react";
import "../../../sass/InforUser/Mutil.scss";
import { gallegy } from "../../Admin/svg/IconSvg";
const Mutil = ({ mutilImg }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleImageChange = (e) => {
    if (e.target.files) {
      mutilImg(e.target.files);
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return <img src={photo} alt="" key={photo} />;
    });
  };

  return (
    <div className="mutil">
      <div>
        <input
          type="file"
          id="file"
          hidden
          multiple
          onChange={handleImageChange}
        />
        <div className="label-holder">
          <label htmlFor="file" className="label">
            <div className="icon">{gallegy}</div>
          </label>
        </div>
        {selectedFiles.length === 0 ? (
          ""
        ) : (
          <div className="result">{renderPhotos(selectedFiles)}</div>
        )}
      </div>
    </div>
  );
};

export default Mutil;
