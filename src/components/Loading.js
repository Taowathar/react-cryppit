import React from 'react'
import logo from "../img/clogo.jpg";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

const Image = styled.img`
  animation: ${spin} 1s infinite;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: ${props => props.marginLeft}rem;
`;


const Loading = ({marginLeft, marginTop}) => {
    return (
        <div
          className="d-flex justify-content-center"
          style={{ marginLeft: `${marginLeft}rem`, marginTop: `${marginTop}rem`, }}
        >
          <h1>
            {" "}
            <Image src={logo} marginLeft={parseFloat(marginLeft)/12}></Image>
            <br></br>
            Loading...
          </h1>
        </div>
    )
}

export default Loading
