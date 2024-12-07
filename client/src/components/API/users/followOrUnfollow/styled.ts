import styled from "styled-components"

export default {
    Follow:styled.button`
        border: none;
        outline: none;
        cursor: pointer;
        transition: 0.2s;
        color: ${props => props.theme.color4};
        font-weight: 600;
        font-size: 15px;
        font-family: ${props => props.theme.SegoeUI};
        padding: 7px 15px;
        border-radius: 20px;
        background-color: ${props => props.theme.color2};

        &:hover {
            transition: 0.2s;
            transform: translate(0px, -3px);
        }
    `,
    Unfollow:styled.button`
        border: none;
        outline: none;
        cursor: pointer;
        transition: 0.2s;
        color: ${props => props.theme.color4};
        font-weight: 600;
        font-size: 15px;
        font-family: ${props => props.theme.SegoeUI};
        padding: 7px 15px;
        border-radius: 20px;
        background: transparent;
        outline: 3px solid ${props => props.theme.color2};

        &:hover {
            transition: 0.2s;
            transform: translate(0px, -3px);
        }
    `
}