import React, { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Webcam from 'react-webcam';
import styled from 'styled-components';
import { FiCamera } from 'react-icons/fi';
import { MdOutlineFlipCameraAndroid } from 'react-icons/md';
import { RootState } from '../store';
import { toggleDisplayCamera } from '../store/UserSlice';
import { setCurrentImage } from '../store/PostSlice';

const videoConstraints = {
  height: 720,
  width: 1280,
  facingMode: 'user',
};
const alternateVideoConstraints = {
  height: 720,
  width: 1280,
  facingMode: { exact: 'environment' },
};

const CameraWrapper = styled.section`
  position: fixed;
  top: 0;
  background: #171717;
  height: 100vh;
  width: 100vw;
  video {
    position: absolute;
    text-align: center;
    z-index: 8;
    height: 100vh;
    width: 100vw;
    object-fit: fill;
  }
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
  .camera {
    display: flex;
    flex-direction: column;
  }
  .camera-header {
    height: 5vh;
    position: fixed;
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    z-index: 10;
    .exit-btn {
      font-size: 2rem;
      background: none;
      border: none;
      color: white;
      position: relative;
      z-index: 10;
      margin-right: 0.3em;
    }
  }
  .camera-footer {
    position: fixed;
    width: 100vw;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    bottom: 1em;
    z-index: 10;
    .capture-btn {
      background: white;
      border-radius: 3em;
      border: solid 0.2rem #da0037;
    }
    .flip-btn {
      background: white;
      border-radius: 3em;
    }
  }
  .preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    .preview-snapshot {
      width: 95%;
      height: 83vh;
    }
    .preview-footer {
      margin-top: 1rem;
      button {
        height: 1.7em;
        padding: 0 0.7em 0 0.7em;
        margin-right: 1em;
        margin-left: 1em;
      }
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
  const [externalCam, setExternalCam] = useState(false);
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
  // if user wants to switch cameras
  const switchCams = () => {
    if (!externalCam) {
      setExternalCam(true);
    } else {
      setExternalCam(false);
    }
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
        <section className="camera">
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
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
            width="500"
            height="500"
            mirrored={!externalCam}
            videoConstraints={
              externalCam
                ? alternateVideoConstraints
                : videoConstraints
            }
            imageSmoothing
          />
          <footer className="camera-footer d-flex">
            <button
              type="button"
              className="flip-btn"
              onClick={switchCams}
            >
              <MdOutlineFlipCameraAndroid size="50px" />
            </button>
            <button
              type="button"
              className="capture-btn"
              onClick={capture}
            >
              <FiCamera size="50px" />
            </button>
            <p />
          </footer>
        </section>
      )}
    </CameraWrapper>
  );
}

export default WebcamComponent;
