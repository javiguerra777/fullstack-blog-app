import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import { FiCamera } from 'react-icons/fi';
import { RootState } from '../store';
import { toggleDisplayCamera } from '../store/UserSlice';
import { setCurrentImage } from '../store/PostSlice';

const videoConstraints = {
  width: 1200,
  height: 1600,
  facingMode: 'user',
};

const CameraWrapper = styled.section`
  position: fixed;
  top: 0;
  background: #171717;
  height: 100vh;
  width: 100vw;
  button {
    cursor: pointer;
  }
  .option-btn {
    font-size: 1.2rem;
    background: #444444;
    color: #ededed;
    border: none;
    border-radius: 5px;
    transition: all 0.35s ease;
    cursor: pointer;
    &:hover {
      background: #da0037;
      transition: all 0.35s ease;
    }
  }
  .camera-header {
    height: 5%;
    position: fixed;
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    z-index: 10;
    .exit-btn {
      background: none;
      border: none;
      color: white;
      position: relative;
      right: 1em;
      z-index: 10;
    }
  }
  .camera-footer {
    position: fixed;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    bottom: 1em;
    z-index: 10;
    .capture-btn {
      background: white;
      border-radius: 3em;
      border: solid 0.2rem #da0037;
    }
  }
  .preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    .preview-snapshot {
      width: 100%;
      height: 37em;
    }
    .preview-footer {
      margin-top: 1rem;
    }
  }
`;
function WebcamComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const { image } = useSelector(
    (state: RootState) => state.post,
    shallowEqual,
  );
  const [previewImage, setPreviewImage] = useState(false);
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      dispatch(setCurrentImage(imageSrc));
      setPreviewImage(true);
    }
  }, [webcamRef, dispatch]);
  // if user wants to close the camera without taking a photo
  const exitCamera = () => {
    dispatch(setCurrentImage(''));
    dispatch(toggleDisplayCamera());
  };
  // if user does not want to retake photo
  const continueToUpload = () => {
    dispatch(toggleDisplayCamera());
    navigate('/uploadImage');
  };
  // if user wants to retake photo
  const retakePhoto = () => {
    setPreviewImage(false);
  };
  return (
    <CameraWrapper>
      {previewImage ? (
        <section className="preview">
          <h1>Would you like to retake this photo?</h1>
          <img
            className="preview-snapshot"
            src={image}
            alt="img camera"
          />
          <footer className="preview-footer">
            <button
              className="option-btn"
              type="button"
              onClick={retakePhoto}
            >
              Yes
            </button>
            <button
              className="option-btn"
              type="button"
              onClick={continueToUpload}
            >
              No
            </button>
          </footer>
        </section>
      ) : (
        <>
          <header className="camera-header d-flex">
            <section className="exit-btn-container">
              <button
                type="button"
                className="exit-btn"
                onClick={exitCamera}
              >
                x
              </button>
            </section>
          </header>
          {/* it is a video html tag */}
          <Webcam
            audio={false}
            height="100%"
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
            width="100%"
            videoConstraints={videoConstraints}
            imageSmoothing
          />
          <footer className="camera-footer d-flex">
            <button
              type="button"
              className="capture-btn"
              onClick={capture}
            >
              <FiCamera size="50px" />
            </button>
          </footer>
        </>
      )}
    </CameraWrapper>
  );
}

export default WebcamComponent;
