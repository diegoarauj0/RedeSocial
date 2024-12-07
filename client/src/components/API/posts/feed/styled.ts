import styled from "styled-components"

export default {
    Feed:styled.div`
        width: 100%;

        a {
            text-decoration: none;
        }
    `,
    Controls:styled.div`
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 10px;

        button {
            border: none;
            outline: none;
            cursor: pointer;
            border-radius: 5px;
            padding: 7px 18px;
            font-family: ${props => props.theme.SegoeUI};
            color: ${props => props.theme.color4};
            font-weight: 600;
            background-color: ${props => props.theme.color2};
        }
    `
}