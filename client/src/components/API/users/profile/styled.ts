import styled from "styled-components"

export default {
    Full:styled.section`
        padding: 0px 30px;
        padding-bottom: 20px;

        hr {
            width: 100%;
            height: 1px;
            border-color: ${props => props.theme.color1};
        }
    `,
    FullImages:styled.div`
        height: 315px;
        margin-bottom: 20px;

        .banner {
            width: calc(100% + 60px);
            margin: 0px -30px;
            height: 260px;
            box-shadow: inset 0px -20px 20px 4px black;
        }

        .avatar {
            width: 130px;
            height: 130px;
            margin-top: -65px;
            border: 7px solid ${props => props.theme.backgroundColor1};
        }
    `,
    FullUsernameOrNickname:styled.div`
        margin-top: -135px;
        margin-left: 135px;

        .nickname {
            font-size: 25px;
            text-shadow: 11px 7px 7px black;
        }

        .username {
            font-size: 17px;
        }
    `,
    FullButtons:styled.div`
        margin-top: 15px;
        display: flex;
        justify-content: flex-end;

        a {
            transition: 0.4s;
            text-decoration: none;
            color: ${props => props.theme.color4};
            font-weight: 600;
            font-size: 15px;
            font-family: ${props => props.theme.SegoeUI};
            padding: 7px 15px;
            background-color: ${props => props.theme.color2};
            border-radius: 20px;
            border: none;
            outline: none;

            &:hover {
                transition: 0.2s;
                transform: translate(0px, -3px);
            }
        }

        button {
            margin: 0px 5px;
        }
    `,
    FullBio:styled.div`
        margin-top: 45px;
    `,
    FullDisplayDate:styled.div`
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        flex-wrap: wrap;

        hr {
            width: 100%;
        }

        div {
            margin-right: 10px;
            display: flex;
            align-items: center;
            color: ${props => props.theme.color5};
            font-weight: 700;
            font-family: ${props => props.theme.SegoeUI};
            font-size: 14px;

            .displayData {
                margin: 10px 0px;
                margin-left: 6px;
                font-weight: 500;
                font-size: 13px;
            }
        }

        div > img {
            filter: invert(100%);
            height: 22px;
        }
    `,
    FullFollowersCountAndFollowinCount:styled.div`
    `,
    Block:styled.section`
        background-color: ${props => props.theme.backgroundColor2};
        width: 250px;
        height: 150px;
        border-radius: 15px;
        border: 3px solid ${props => props.theme.color1};

        a {
            text-decoration: none;
        }
    `,
    BlockUsernameOrNickname:styled.div`
        margin-top: -55px;
        margin-left: 75px;
    `,
    BlockImages:styled.div`
        .banner {
            border-radius: 15px;
            width: 100%;
            height: 100px;
        }

        .avatar {
            width: 60px;
            height: 60px;
            margin-top: -30px;
            margin-left: 10px;
            border: 4px solid ${props => props.theme.backgroundColor2};
        }
    `,
    Header:styled.div`
        display: flex;
        align-items: center;
        height: 45px;
        padding: 3px;
    `,
    HeaderImages:styled.div`
        height: 40px;
        width: 40px;
        margin-right: 10px;

    `,
    HeaderUsernameOrNickname:styled.div`
        height: 100%;
        display: flex;
        align-items: center;
    `
}