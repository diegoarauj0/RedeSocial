import styled from "styled-components"

export default {
    Bio:styled.p`
        color: ${props => props.theme.color4};
        font-weight: 600;
        font-family: ${props => props.theme.SegoeUI};
        font-size: 13px;
        margin-top: 30px;
    `
}