import styled from "styled-components"

export default {
    Main:styled.main`
        background-color:${props => props.theme.backgroundColor1};
        width: 100%;
        min-height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: flex-start;
        padding: 10px;

        h2 {
            font-size: 22px;
            color: ${props => props.theme.color4};
            font-family: ${props => props.theme.SegoeUI};
            margin-bottom: 10px; 
            width: 100%;
        }

        .notFound {
            width: 80%;
            height: 100%;
            max-width: 400px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
            align-content: center;

            a {
                text-align: center;
            }
        }

        a {
            width: 100%;
            text-decoration: none;
            margin: 5px 0px;
        }

        .profile {
            background-color: ${props => props.theme.backgroundColor3};
            border-radius: 5px;
            padding: 10px;
            height: auto;
            width: 100%;
        }
    `,
    Controls:styled.div`
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