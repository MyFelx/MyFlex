import React from "react";
import styled from "styled-components";

const StyledBlurDiv = styled.div`
  filter: blur(${(props) => props.blurDegree});
`;

const BlurDiv = (props) => {
  return (
    <div>
      <StyledBlurDiv blurDegree={props.blurDegree}>
        {props.children}
      </StyledBlurDiv>
    </div>
  );
};

export default BlurDiv;