import { useEffect, useState } from "react"
import colors from "../../colors";
import { StatusDot } from "./styles";

interface LocalPortStatusProps {
  url: string;
}

const PingStatusDot = (props: LocalPortStatusProps) => {
  const { url } = props

  type PingStatus = 'loading' | 'online' | 'offline'
  const [pingStatus, setPingStatus] = useState<PingStatus>('loading')

  const Timeout = (time: number) => {
    let controller = new AbortController()
    setTimeout(() => controller.abort(), time * 1000)
    return controller
  }

  useEffect(() => {
    fetch(url, { signal: Timeout(1).signal }).then(res => {
      res?.status === 200 ? setPingStatus('online') : setPingStatus('offline')
    }).catch(() => setPingStatus('offline'))
  }, [url])

  const dotData = {
    loading: {
      fill: '',
      border: `2px dotted ${colors.grey}`,
    },
    online: {
      fill: colors.green,
      border: `0px`,
    },
    offline: {
      fill: '',
      border: `2px dotted ${colors.grey}`,
    }
  }

  return (
    <StatusDot fill={dotData[pingStatus].fill} border={dotData[pingStatus].border} />
  )
}

export default PingStatusDot