import { useEffect } from 'react'

function useDebouncedEffect(callback: () => any, delay?: number, deps?: any[]) {
  useEffect(() => {
    const timer = setTimeout(callback, delay || 500)
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, delay, ...deps || []])
}

export default useDebouncedEffect