import { useProgressiveNumber } from '@/hooks/useProgressiveNumber'
import { useEffect} from 'preact/hooks'

export const CountUp = (
  { initial, final, decimals, duration }:
  { initial: number, final: number, decimals?: number, duration?: number }
) => {
  const [count, setCount] = useProgressiveNumber(initial, duration, decimals)

  useEffect(() => {
    setCount(String(final))
  }, [final])

  return <span>{count}</span>
}