import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Webcam from 'react-webcam';
import styled from 'styled-components';
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
  background: white;
  height: 100vh;
  width: 100vw;
  .camera-header {
    background: black;
    height: 5vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
  .camera-footer {
    background: black;
    height: 5vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;
function WebcamComponent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      dispatch(setCurrentImage(imageSrc));
      dispatch(toggleDisplayCamera());
      navigate('/uploadImage');
    }
  }, [webcamRef, dispatch, navigate]);
  return (
    <CameraWrapper>
      <header className="camera-header d-flex">
        <section className="exit-btn-container">
          <button
            type="button"
            className="exit-btn"
            onClick={() => dispatch(toggleDisplayCamera())}
          >
            x
          </button>
        </section>
      </header>
      {/* This is the webcam */}
      <Webcam
        audio={false}
        height={600}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <footer className="camera-footer d-flex">
        <button
          type="button"
          className="capture-btn"
          onClick={capture}
        >
          Capture Photo
        </button>
      </footer>
    </CameraWrapper>
  );
}

export default WebcamComponent;
