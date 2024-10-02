// src/pages/Home.js
import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const Home = () => {
  return (
    <HomeContainer>
      <h1>Welcome to CropCart</h1>
      <p>Your marketplace for fresh agricultural goods.</p>
    </HomeContainer>
  );
};

export default Home;
