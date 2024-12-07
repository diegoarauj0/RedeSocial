import styled from "styled-components"

export default {
    Post:styled.section`
        width: 100%;
        padding: 5px 15px;

        a.publish {
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.4s;
            height: 50px;
            background-color: ${props => props.theme.color2};
            color: white;
            text-decoration: none;
            font-weight: 500;
            font-family: ${props => props.theme.SegoeUI};
            border-radius: 10px;
            margin-bottom: 20px;

            &:hover {
                transform: translate(0px, -3px);
            }

            img {
                height: 70%;
                margin: 0px 5px;
                filter: invert(100%);
            }
        }
        
    `,
    Header:styled.header`
        display: flex;
        justify-content: space-between;
        height: 45px;
        margin-bottom: 10px;

        .deleted {
            font-size: 20px;
            color: ${props => props.theme.color4};
            font-family: ${props => props.theme.SegoeUI};
            font-weight: 500;
        }

        .nickname {
            font-size: 13px;
        }

        .delete {
            height: 100%;
            width: 45px;
            background-color: transparent;
            border: none;
            outline: none;
            cursor: pointer;

            img {
                width: 80%;
                height: 80%;
                filter: invert(100%);
            }
        }

        .username {
            font-size: 11px;
        }

        a {
            margin-bottom: 10px;
            display: block;
            text-decoration: none;
        }
    `,
    Main:styled.main`
        margin-bottom: 15px;
        color: ${props => props.theme.color4};
        font-family: ${props => props.theme.SegoeUI};
        font-weight: 500;

        a {
            text-decoration: none;
            color: ${props => props.theme.color4};
            display: block;
        }
    `,
    Footer:styled.footer`
        padding-bottom: 10px;
        margin-top: 10px;
        margin-bottom: 7px;
        border-bottom: 2px solid ${props => props.theme.color1};
    `,
    Children:styled.div`
        a {
            text-decoration: none;
        }
    `,
    ParentPost:styled.div`
        section {
            padding:0px;
            margin-bottom: 10px;

            main {
                margin-left: 22px;
                padding-left: 28px;
                border-left: 2px solid white;
            }

        }
    `,
    ChildrenCount:styled.div`
    
    `
}