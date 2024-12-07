import Styled from "./styled"

export function Loading() {
    return (
        <Styled.Parent className="loading">
            <Styled.Loading></Styled.Loading>
            <Styled.P>Carregando...</Styled.P>
        </Styled.Parent>
    )
}