import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './ImageUpload.css';
import Button from '../UIElements/Button';

const ImageUpload = (props) => {
  const inputRef = useRef();
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const pickImageHandler = () => {
    inputRef.current.click();
  };

  const pickedHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }

    // 對應到form-hook的custom inputHandler 格式
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  useEffect(() => {
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    }; // load new file or done parsing
    fileReader.readAsDataURL(file);
  }, [file]);

  return (
    <div className="form-control">
      <input
        ref={inputRef}
        type="file"
        style={{ display: 'none' }}
        id={props.id}
        accept=".jpg, .png, jpeg"
        onChange={pickedHandler}
      />
      <div className={`${props.center && 'center'} image-upload`}>
        <div className="image-upload__preview">
          {previewUrl ? (
            <img src={previewUrl} alt="preview" />
          ) : (
            <p>Please Pick a Image</p>
          )}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          Pick Image
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

ImageUpload.propTypes = {
  id: PropTypes.string.isRequired,
  center: PropTypes.bool,
  onInput: PropTypes.func.isRequired,
  errorText: PropTypes.func,
};

export default ImageUpload;
