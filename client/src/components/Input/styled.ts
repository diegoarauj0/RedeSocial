import styled from "styled-components"

export default {
    Div:styled.div`
    `,
    Label:styled.label`
    `,
    Error:styled.div<{ invisible?:"true" | "false" }>`
        display: ${(props) => props.invisible === "true"?"none":"block"};
    `,
    Input:styled.input`
    `,
    Textarea:styled.textarea`
        height: 60px;
    `
}