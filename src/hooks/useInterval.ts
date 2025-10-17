import { useEffect, useRef } from 'react'

const useInterval = (callback: () => void, delay?: number, enabled = true) => {
  const savedCallback = useRef<() => void>()

  // Remember the latest callback.
  useEffect(() => {
		if (!enabled) return
    savedCallback.current = callback
  }, [callback])
 
  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (!enabled) return
      savedCallback.current?.()
    }
    if (delay !== null && enabled) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay, enabled])
}

export default useInterval