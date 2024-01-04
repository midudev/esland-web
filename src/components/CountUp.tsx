import { useProgressiveNumber } from '@/hooks/useProgressiveNumber'
import { useEffect } from 'preact/hooks'

export const CountUp = (
  { initial, final, decimals, duration }:
  { initial: number, final: number, decimals?: number, duration?: number }
) => {
  const [count, setCount] = useProgressiveNumber(initial, duration, decimals)

  useEffect(() => {
    setCount(final)
  }, [])

  return <span>{count}</span>
}