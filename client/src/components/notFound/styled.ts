import styled from "styled-components"

export default {
    Div:styled.div`

        p {
            text-align: center;
            color: #5610FF;
            font-size: 20px;
            font-weight: 700;
            font-family: ${props => props.theme.SegoeUI};
            margin-bottom: 10px;
        }

        a {
            font-size: 13px;
        }
    `,
    Img:styled.img`
        width: 100%;
    `
}