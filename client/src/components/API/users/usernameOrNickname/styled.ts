import styled from "styled-components"

export default {
    UsernameOrNickname:styled.div`
    `,
    Username:styled.p`
        color: ${props => props.theme.color3};
        font-weight: 600;
        font-size: 2vh;
        font-family: ${props => props.theme.SegoeUI};
    `,
    Nickname:styled.p`
        color: ${props => props.theme.color4};
        font-weight: 700;
        font-size: 2.6vh;
        font-family: ${props => props.theme.SegoeUI};
    `
}  