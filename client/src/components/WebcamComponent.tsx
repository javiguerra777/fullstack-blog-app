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
  width: 1280,
  height: 600,
  facingMode: 'user',
};

const CameraWrapper = styled.section`
  position: fixed;
  top: 0;
  background: #171717;
  height: 100vh;
  width: 100vw;
  .camera-header {
    height: 5%;
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    .exit-btn {
      background: none;
      border: none;
      color: white;
    }
  }
  .camera-footer {
    height: 10%;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .capture-btn {
      background: white;
      border-radius: 3em;
      border: solid 0.2rem #da0037;
      position: absolute;
      bottom: 4rem;
      cursor: pointer;
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
        <div>
          <h1>Would you like to retake this photo?</h1>
          <img src={image} alt="img camera" />
          <button type="button" onClick={retakePhoto}>
            Yes
          </button>
          <button type="button" onClick={continueToUpload}>
            No
          </button>
        </div>
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

          <section className="webcam-container">
            <Webcam
              audio={false}
              height="85%"
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              videoConstraints={videoConstraints}
            />
          </section>
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
