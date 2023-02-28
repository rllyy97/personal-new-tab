import moment from "moment"
import { useEffect, useState } from "react"

const Clock = () => {

  const [date, setDate] = useState(moment())
  const tick = () => setDate(moment())

  useEffect(() => {
    const timerId = setInterval(tick, 1000)
    return function cleanup() {clearInterval(timerId)}
  }, [])

  return (
    <div style={{opacity: '0.15'}}>
      <h1>{date.format('hh:mm A')}</h1>
    </div>
  )
}

export default Clock