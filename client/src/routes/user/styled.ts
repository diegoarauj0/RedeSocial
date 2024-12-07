import styled from "styled-components"

export default {
    Main:styled.main`
        background-color:${props => props.theme.backgroundColor1};
        width: 100%;
        min-height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .loading {
            width: 100%;
            height: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            align-content: center;

            p {
                width: 100%;
            }
        }

        .notFound {
            width: 80%;
            max-width: 400px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
            align-content: center;
        }

        section {
            width: 100%;
        }
    `,
    Center:styled.div`
        max-width: 800px;
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        border-right: 2px solid ${props => props.theme.color1};
        border-left: 2px solid ${props => props.theme.color1};

        .publish {
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.4s;
            width: 90%;
            height: 50px;
            background-color: ${props => props.theme.color2};
            color: white;
            text-decoration: none;
            font-weight: 500;
            font-family: ${props => props.theme.SegoeUI};
            border-radius: 10px;
            margin-bottom: 30px;

            &:hover {
                transform: translate(0px, -3px);
            }

            img {
                height: 70%;
                margin: 0px 5px;
                filter: invert(100%);
            }
        }
    `
}