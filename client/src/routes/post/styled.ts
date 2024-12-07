import styled from "styled-components"

export default {
    Main:styled.main`
        background-color:${props => props.theme.backgroundColor1};
        width: 100%;
        min-height: 100%;
        display: flex;
        justify-content: center;
    `,
    Center:styled.div`
        display: flex;
        padding-top: 20px;
        max-width: 600px;
        width: 100%;
        justify-content: center;
        align-items: flex-start;
        border-right: 2px solid ${props => props.theme.color1};
        border-left: 2px solid ${props => props.theme.color1};
    `
}