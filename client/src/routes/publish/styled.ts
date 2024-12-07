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
        section {
            padding:0px;
            margin-bottom: 10px;

            main {
                margin-left: 22px;
                padding-left: 28px;
                border-left: 2px solid white;
            }
        }

        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        padding: 5px 15px;
        max-width: 600px;
        width: 100%;
        border-right: 2px solid ${props => props.theme.color1};
        border-left: 2px solid ${props => props.theme.color1};
    `,
    Form:styled.div`
        width: 100%;

        .error {
            color: red;
            font-family: ${props => props.theme.SegoeUI};
            margin-bottom: 3px;
        }

        form {
            margin-top: 10px;
            width: 100%;

            label {
                display: none;
            }

            textarea {
                max-width: 100%;
                min-width: 100%;
                min-height: 50px;
                height: auto;
                background-color: transparent;
                border: none;
                outline: none;
                border-bottom: 2px solid ${props => props.theme.color1};
                margin-bottom: 5px;
                color: ${props => props.theme.color4};
                font-family: ${props => props.theme.SegoeUI};
                font-weight: 500;
                font-size: 16px;
            }

            button:hover {
                transform: translate(0,-2px);
            }

            button {
                margin-top: 10px;
                display: flex;
                border: none;
                outline: none;
                cursor: pointer;
                font-size: 14px;
                justify-content: center;
                align-items: center;
                transition: 0.4s;
                width: 100%;
                height: 50px;
                background-color: #34c517;
                color: white;
                text-decoration: none;
                font-weight: 600;
                font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                border-radius: 10px;
            }
        }
    `
}