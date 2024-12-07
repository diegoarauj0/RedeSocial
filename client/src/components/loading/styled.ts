import styled from "styled-components"

export default {
    Parent:styled.div`
        width: 100px;
        height: 120px;
    `,
    Loading:styled.div`
        @keyframes Loading {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        animation: Loading 0.8s infinite;
        border: 10px solid transparent;
        border-top-color: ${props => props.theme.color2};
        border-radius: 100%;
        width: 100px;
        height: 100px;
    `, 
    P:styled.p`
        text-align: center;
        font-family: ${props => props.theme.SegoeUI};
        color: ${props => props.theme.color2};
        font-weight: 700;
    `
}