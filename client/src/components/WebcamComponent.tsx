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
      // navigate('/newPost');
    }
  }, [webcamRef, dispatch, navigate]);
  return (
    <CameraWrapper>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button type="button" onClick={capture}>
        Capture Photo
      </button>
    </CameraWrapper>
  );
}

export default WebcamComponent;
