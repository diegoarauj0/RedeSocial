import styled from "styled-components"

export default {
    SideBar:styled.div`
        width: 280px;
        background-color: ${(props) => props.theme.backgroundColor2};
        border-right: 1px solid ${(props) => props.theme.color1};
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        padding: 0px 20px;

        hr {
            width: 100%;
            height: 1px;
            border-color: ${props => props.theme.color1};
        }

        @media (max-width: 900px) {
            padding: 0px;
            width: 70px;

            hr {
                display: none;
            }
        }

        @media (max-width: 600px) {
            height: 70px;
            width: 100%;
            align-content: center;

            nav {
                justify-content: space-around;
            }
        }
    `,

    Main:styled.div`
        width: 100vw;
        height: 100vh;
        display: flex;

        @media (max-width: 600px) {
            flex-wrap: wrap;
            flex-direction: column-reverse;
        }
    `,

    Children:styled.div`
        width: calc(100% - 280px);
        overflow-y: auto;
        height: 100%;

        @media (max-width: 900px) {
            width: calc(100% - 70px);
        }

        @media (max-width: 600px) {
            width: 100%;
            height: calc(100% - 70px);
        }
    `,

    Start:styled.div`
        width: 100%;
        padding: 0px 3px;

        header {
            margin-top: 10px;
            margin-bottom: 5px;
        }

        header > h1 {
            text-align: center;
        }

        nav {
            padding-top: 20px;
            width: 100%;
            flex-wrap: wrap;
        }

        nav > a {
            transition: 0.4s;
            width: 100%;
            display: flex;
            align-items: center;
            color: ${props => props.theme.color4};
            font-family: ${props => props.theme.SegoeUI};
            font-weight: 500;
            text-decoration: none;
            margin-bottom: 15px;
            padding: 7px;
            border-bottom: 2px solid ${props => props.theme.color1};
        }

        button {
            width: 100%;
            border-bottom: none;
        }

        nav > a:hover {
            transition: 0.2s;
            border-bottom-color: transparent;
            border-radius: 15px;
            background-color: ${props => props.theme.color1};
        }

        nav > a > div {
            width: 30px;
            height: 30px;
            margin-right: 5px;
        }

        nav > a > div > img {
            filter: invert(100%);
        }

        .logoutButton {
            border-radius: 15px;
            height: 50px;
        }

        @media (max-width: 900px) {
            header {
                display: none;
            }

            nav > a {
                justify-content: center;
                border-bottom: none;
                flex-wrap: wrap;
            }

            nav > a > div {
                margin: 0px;
            }

            button {
                flex-wrap: wrap;
                justify-content: center;
                background-color: transparent;
            }

            button > img {
                margin: 0px;
                width: 35px;
                height: 35px;
            }

            .logoutButton {
                height: auto;
            }
        }

        @media (max-width: 600px) {
            display: flex;

            nav {
                display: flex;
                flex-wrap: nowrap;
                padding: 0px;
            }

            nav > a {
                margin: 0px;
                width: 50px;
            }

            button {
                width: 50px;
            }
        }
    `,

    End:styled.div`
        height: 150px;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 5px;
        align-items: center;

        a {
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.4s;
            width: 100%;
            height: 50px;
            background-color: ${props => props.theme.color2};
            color: white;
            text-decoration: none;
            font-weight: 500;
            font-family: ${props => props.theme.SegoeUI};
            border-radius: 10px;

            &:hover {
                transform: translate(0px, -3px);
            }

            img {
                height: 70%;
                margin: 0px 5px;
                filter: invert(100%);
            }
        }

        @media (max-width: 900px) {
            height: auto;
            justify-content: center;

            hr {
                margin-bottom: 10px;
            }

            div {
                margin: 0px;
            }

            a {
                display: none;
            }

            p {
                display: none;
            }

        }

        @media (max-width: 600px) {
            display: none;
        }
    `
}