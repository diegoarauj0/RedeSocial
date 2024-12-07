import styled from "styled-components"

export default {
    LogoutButton:styled.button`
        transition: 0.4s;
        border: none;
        border-bottom: 2px solid rgb(206, 71, 71);
        background-color: transparent;
        padding: 7px;
        font-family: ${props => props.theme.SegoeUI};
        font-weight: 600;
        outline: none;
        cursor: pointer;
        color: ${props => props.theme.color4};
        display: flex;
        align-items: center;
        background-color: rgb(206, 71, 71);
        border-radius: 5px;

        img {
            filter: invert(100%);
            margin-right: 10px;
            height: 80%;
        }
    `
}