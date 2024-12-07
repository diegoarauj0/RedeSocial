import Styled from "./styled"

interface DisplayDataProps {
    date:Date
    hours?:boolean
}

function DisplayData(props:DisplayDataProps) {
    return ( <Styled.DisplayDate className="displayData">{`${props.date.getDate() < 10?"0"+props.date.getDate():props.date.getDate()}/${props.date.getMonth() + 1 < 10?"0"+(props.date.getMonth() + 1):props.date.getMonth() + 1}/${props.date.getFullYear()}${props.hours === true?`, ${props.date.getHours() > 9?props.date.getHours():"0"+props.date.getHours()}:${props.date.getMinutes() > 9?props.date.getMinutes():"0"+props.date.getMinutes()}`:""}`}</Styled.DisplayDate> )
}

export { DisplayData }
export type { DisplayDataProps }