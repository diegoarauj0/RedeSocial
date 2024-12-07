import Styled from "styled-components"

export default {
    UserBanner:Styled.div`
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
        width: 100%;
        height: 250px;

        button {
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;
            width: 100%;
            height: 100%;
            position: relative;
            filter: opacity(0%);
        }

        button:hover {
            filter: opacity(100%);
        }

        button > img {
            position: absolute;
            width: 50px;
            height: 50px;
            left: 1%;
            top: 1%;
            filter: invert(100%);
        }
    `,
}