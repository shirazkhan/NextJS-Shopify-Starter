import React, {useState, useRef, useEffect} from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import Indicator from './Indicator';
import { InView } from 'react-intersection-observer';
import { PRIMARY_THEME_COLOR, DESKTOP_VIEW } from '../../GlobalVariables';

const MainContainer = styled.div`
    width: 100vw;
    height: 100%;
    position: relative;

    ${DESKTOP_VIEW}{
        width: 50vw;
        border-radius: 10px;
        position: sticky;
        top: 150px;
    }
    `;

const Container = styled.div`
    height: 400px;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    };

    @media only screen and (min-width: 600px) {
        height: 500px;
    }


    ${DESKTOP_VIEW}{
        border-radius: 10px;
        height: 500px;
    }
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 400px;
    position: relative;
    display: inline-block;
    scroll-snap-align: start;

    @media only screen and (min-width: 600px) {
        height: 500px;
    }

    ${DESKTOP_VIEW}{
        height: 500px;
    }
`;

const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <linearGradient id="g">
        <stop stop-color="${PRIMARY_THEME_COLOR}" offset="20%" />
        <stop stop-color="#edeef1" offset="50%" />
        <stop stop-color="#f6f7f8" offset="70%" />
        </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#FFFFFF" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>
`

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const renderImages = (images, variants, setImageIdx, myRef) => {

    return images.map((img,i) => {
            return <InView key = {img.id} ref = {myRef} onChange = {(inView) => inView ? setImageIdx(i) : null} threshold = {0.5} initialInView ={false}>
                    {({ inView, ref, entry }) => (
                        <ImageContainer id = {variants[0].handle}  $entry = {entry} ref = {ref} > {/* id = {variants.length <= 1 ? null : variants[i].handle} */}
                            <Image
                                placeholder = {'blur'}
                                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                                fill={true}
                                loading={i ? 'lazy' : 'eager'}
                                priority={i ? false : true}
                                src = {img.src}
                                alt={img.altText}
                                quality={10}
                                style={{objectFit: "cover"}}
                            />
                        </ImageContainer>
                    )}
                </InView>
        }
    )
}

export default function ProductImages({images, variants}) {

    const [imageIdx, setImageIdx] = useState(0);
    const myRef = useRef();
    return (
        <>
            <MainContainer className = 'scroll-container'>
                <Container>
                    {renderImages(images, variants, setImageIdx,myRef)}
                </Container>
                <Indicator quantity = {images.length} idx = {imageIdx} />
            </MainContainer>
        </>
    )
}
