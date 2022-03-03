import moment from "moment"
import { useEffect, useState } from "react"
import styled from "styled-components"


const ClockContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
`

const Clock = () => {

    const [date, setDate] = useState(moment())

    const tick = () => setDate(moment())

    useEffect(() => {
        const timerId = setInterval(tick, 1000)
        return function cleanup() {clearInterval(timerId)}
    }, [])

    return (
        <ClockContainer>
            <h1>{date.format('hh:mm A')}</h1>
        </ClockContainer>
    )
}

export default Clock