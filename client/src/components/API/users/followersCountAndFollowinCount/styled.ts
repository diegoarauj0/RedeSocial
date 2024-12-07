import styled from "styled-components"

export default {
    FollowersCountAndFollowingCount:styled.div`
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-around;

        div > a {
            transition: 0.5s;
            color: ${props => props.theme.color5};
            text-decoration: none;
            border-bottom: 2px solid ${props => props.theme.color1};
            font-family: ${props => props.theme.SegoeUI};
            font-weight: 500;
            margin: 5px 0px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding: 10px 20px;
        }

        div > a:hover {
            transition: 0.2s;
            border-bottom-color: transparent;
            background-color: ${props => props.theme.color1};
            border-radius: 10px;
        }
    `,
    Following:styled.div`
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        align-content: center;
    `,
    Followers:styled.div`
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        align-content: center;
    `,
    Count:styled.p`
        width: 100%;
        text-align: center;
        color: ${props => props.theme.color4};
        font-weight: 900;
    `,
    Text:styled.text`
        width: 100%;
        text-align: center;
        font-family: ${props => props.theme.SegoeUI};;
        color: ${props => props.theme.color4};
        font-weight: 600;
        font-size: 13px;
    `
}