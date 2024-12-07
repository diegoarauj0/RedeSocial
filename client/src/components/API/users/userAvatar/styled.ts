import Styled from "styled-components"

export default {
    UserAvatar:Styled.div`
        width: 100%;
        height: 100%;
        border-radius: 50%;
        position: relative;

        button {
            border-radius: 100%;
            position: absolute;
            background: #0000007a;
            border: none;
            outline: none;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            filter: opacity(0%);
            cursor: pointer;
        }

        button:hover {
            box-shadow: inset 0px 0px 20px 5px black;
            filter: opacity(100%);
        }

        button > img {
            width: 60%;
            height: 60%;
            filter: invert(100%);
        }
    `,
    Img:Styled.img`
        border-radius: 50%;
        width:100%;
        height: 100%;
    `
}