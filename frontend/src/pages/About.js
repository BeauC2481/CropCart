// src/pages/About.js
import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

const About = () => {
  return (
    <AboutContainer>
      <h1>About CropCart</h1>
      <p>CropCart is a two-sided marketplace connecting agricultural suppliers and consumers.</p>
    </AboutContainer>
  );
};

export default About;
