'use client'
import {Html} from '@react-three/drei' 
import styled from 'styled-components'

const LoaderContainer = styled.div`
  /* HTML: <div class="loader"></div> */
  .loader {
    width: 6px;
    color: #fff;
    aspect-ratio: 1;
    border-radius: 50%;
    box-shadow: 
      19px -19px 0 0px, 38px -19px 0 0px, 57px -19px 0 0px,
      19px 0     0 5px, 38px 0     0 5px, 57px 0     0 5px,
      19px 19px  0 0px, 38px 19px  0 0px, 57px 19px  0 0px;
    transform: translateX(-38px);
    animation: l26 2s infinite linear;
  }
  @keyframes l26 {
    12.5% {box-shadow: 
      19px -19px 0 0px, 38px -19px 0 0px, 57px -19px 0 5px,
      19px 0     0 5px, 38px 0     0 0px, 57px 0     0 5px,
      19px 19px  0 0px, 38px 19px  0 0px, 57px 19px  0 0px}
    25%   {box-shadow: 
      19px -19px 0 5px, 38px -19px 0 0px, 57px -19px 0 5px,
      19px 0     0 0px, 38px 0     0 0px, 57px 0     0 0px,
      19px 19px  0 0px, 38px 19px  0 5px, 57px 19px  0 0px}
    50%   {box-shadow: 
      19px -19px 0 5px, 38px -19px 0 5px, 57px -19px 0 0px,
      19px 0     0 0px, 38px 0     0 0px, 57px 0     0 0px,
      19px 19px  0 0px, 38px 19px  0 0px, 57px 19px  0 5px}
    62.5% {box-shadow: 
      19px -19px 0 0px, 38px -19px 0 0px, 57px -19px 0 0px,
      19px 0     0 5px, 38px 0     0 0px, 57px 0     0 0px,
      19px 19px  0 0px, 38px 19px  0 5px, 57px 19px  0 5px}
    75%   {box-shadow: 
      19px -19px 0 0px, 38px -19px 0 5px, 57px -19px 0 0px,
      19px 0     0 0px, 38px 0     0 0px, 57px 0     0 5px,
      19px 19px  0 0px, 38px 19px  0 0px, 57px 19px  0 5px}
    87.5% {box-shadow: 
      19px -19px 0 0px, 38px -19px 0 5px, 57px -19px 0 0px,
      19px 0     0 0px, 38px 0     0 5px, 57px 0     0 0px,
      19px 19px  0 5px, 38px 19px  0 0px, 57px 19px  0 0px}
  }
`

export const Loader = () => {
  return (
    <Html>

        <LoaderContainer className="w-full h-full flex justify-center items-center">
          <div className="loader w-full"></div>
        </LoaderContainer>
    </Html>
  )
}
