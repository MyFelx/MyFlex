import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { PlusCircleFilled, CheckCircleFilled, MinusCircleFilled, InfoCircleFilled } from '@ant-design/icons'
import IMDB from './IMDbRating'
import { Typography, Popover } from 'antd';
import FadeIn from 'react-fade-in';
const { Text } = Typography;
const MOVIE_STATE = {
    ADD: 'add',
    REMOVE: 'remove'
}
const PosterStyle = styled.img`
    height: auto;
    box-shadow: 0 2px 5px #ccc;
    width: 100%;
    height: 100%;
    border-radius: 7px;
    object-fit: cover;
`
const HoverDiv = styled.div`
    background-color : rgba(0,0,0,0.5);
    /* opacity: ${(props) => props.Opacity};  */
    height: 100%;
    top: 0%;
    position: absolute;
    width:100%;
    border-radius: 7px;
    box-shadow: 0 2px 5px #ccc;
    /* display: flex;
    flex-direction: column;
    /* flex-grow: 10; */
    /* flex-wrap: wrap; */
    /* justify-content: space-around;  */
     /* display: flex; 
    flex-direction: row-reverse; */
    /* justify-content: center; */
    /* align-items: inherit;  */
    `
const TitleContainer = styled.div`
    margin-top: 10px;
    font-family: Roboto;
    width: 100%;
`
const IMDBContainer = styled.div`
    background-color: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0%;
    width: 100%;
`
const MainContainer = styled.div`
    position: relative;
    width: fit-content;
    margin: 15px;
    height: 320px;
    width: 200px;
    border-radius: 7px;
`
const CardContainer = styled.div`
    width: 100%;
    border-radius: 7px;
    position: relative;
    box-shadow: 0 2px 5px #ccc;
    height: 95%;
`
const ButtonsContainer = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    justify-content: space-around;
    padding: 30%;
    align-items: center;
`
const IconStyling = {
    fontSize: '60px',
    color: 'white',
    padding: '7px',
}
const StyledInfoIcon = styled(InfoCircleFilled)`
    position: absolute;
    font-size: 30px;
    right: 7%;
    top: 5%;
    color: white;
`
const fadeIn = {
    width: "200px",
    height: "300px",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-evenly",
    position: "absolute",
}

const MovieCard = (props) => {
    const [movieState, setMovieState] = useState(props.isInList ? MOVIE_STATE.ADD : MOVIE_STATE.REMOVE)
    let [isHovering, setIsHovering] = useState(false);
    const toggleHover = () => {
        setIsHovering(!isHovering)

    }
    const hoverDiv = isHovering &&
        <HoverDiv >
            <StyledInfoIcon />
            <ButtonsContainer >
                {movieState === MOVIE_STATE.REMOVE ?
                    <FadeIn><PlusCircleFilled style={IconStyling} onClick={() => {
                        setMovieState(MOVIE_STATE.ADD)
                        props.addToList && props.addToList(props.id)
                    }} /></FadeIn> :
                    [
                        <FadeIn><CheckCircleFilled style={IconStyling} /></FadeIn>,
                        <FadeIn><MinusCircleFilled style={IconStyling} onClick={() => {
                            setMovieState(MOVIE_STATE.REMOVE)
                            props.removeFromList && props.removeFromList(props.id)
                        }} /></FadeIn>
                    ]
                }
            </ButtonsContainer>
        </HoverDiv>
    return (
        <FadeIn>
            <MainContainer>
                <CardContainer onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
                    <PosterStyle draggable={false} src={props.posterSrc} />
                    {hoverDiv}
                    <IMDBContainer> <IMDB rating={props.moveiRating} /></IMDBContainer>
                </CardContainer>
                <TitleContainer > <Popover placement="bottom" content={props.title}><Text ellipsis={true} style={{ width: '200px' }}>Title: {props.title} </Text></Popover></TitleContainer>
            </MainContainer>
        </FadeIn>
    )
};
export default MovieCard