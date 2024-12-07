import styled from "styled-components"

export default {
    Main:styled.main`
        min-width: 100vw;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${(props) => props.theme["backgroundColor1"]};
    `,
    Section:styled.section`
        width: 800px;

        header {
            margin-bottom: 10px;
        }

        h2 {
            margin-bottom: 10px;
            font-family: ${props => props.theme.SegoeUI};
            color: ${props => props.theme.color4};
        }

        form {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
        }

        form > div {
            transition: 0.1s;
            width: 100%;
            border-bottom: 2px solid ${props => props.theme.backgroundColor3};
            margin-bottom: 10px;
        }

        form > div:hover {
            transition: 0.2s;
            border-bottom-color: ${props => props.theme.color2};
        }

        form > div > input {
            width: 100%;
            height: 40px;
            border: none;
            font-family: ${props => props.theme.SegoeUI};
            padding: 3px 5px;
            color: ${props => props.theme.color4};
            font-weight: 600;
            background-color: ${props => props.theme.backgroundColor3};
            border-radius: 7px;
            margin-bottom: 6px;
        }

        form > div > div {
            color: red;
            font-family: ${props => props.theme.SegoeUI};
            margin-bottom: 3px;
        }

        form > button {
            transition: 0.4s;
            font-family: ${props => props.theme.SegoeUI};
            background-color: ${props => props.theme.backgroundColor3};
            outline: none;
            border: none;
            font-weight: 600;
            padding: 15px;
            width: 100%;
            border-radius: 15px;
            cursor: pointer;
            color: ${props => props.theme.color4};
            margin-bottom: 10px;
        }

        form > button:hover {
            transition: 0.2s;
            transform: scale(1.02);
        }

        form > div > label {
            color: ${props => props.theme.color4};
            font-family: ${props => props.theme.SegoeUI};
            font-weight: 600;
            display: block;
            margin-bottom: 3px;
        }

        form > div > input:focus-visible {
            outline: 3px solid ${props => props.theme.color2};
        }

        @media (max-width: 820px) {
            & {
                width: 95%;
            }
        }

        @media (max-height: 520px) {
            form > button {
                width: 49%;
                margin: 0px auto;
            }
        } 

        @media (max-height: 470px) {
            h2 {
                display: none;

            }
        } 

        @media (max-height: 420px) {
            header {
                display: none;
                
            }
        } 
    `
}