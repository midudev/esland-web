import { useState, useEffect, useRef } from "preact/hooks"
import ProgressiveNumber from "./ProgressiveNumber";

export default ({ initial, final, decimals, duration }:
  { initial: number, final: number, decimals?: number, duration?: number }
) => {
  const [count, setCount] = useState(initial);
  const [step, setStep] = useState(0);
  const generator: any = useRef(null);
  useEffect(() => {
    generator.current = new ProgressiveNumber(initial, duration, decimals);
    generator.current.start(final)
  }, []);
  useEffect(() => {
    const timeout = generator.current.schedule((value: number, step: number) => {
      setCount(value);
      setStep(step);
    }, false)
    return () => clearTimeout(timeout);
  }, [step])

  return <span>{count}</span>
}