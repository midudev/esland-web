import { useState, useEffect, useRef } from "preact/hooks"
import ProgressiveNumber from "./Up";

export default ({ initial, final, decimals, duration }:
  { initial: number, final: number, decimals?: number, duration?: number }
) => {
  const [count, setCount] = useState(initial.toString());
  const [step, setStep] = useState(0);
  const generator: any = useRef(null);
  useEffect(() => {
    generator.current = new ProgressiveNumber(initial, final, decimals, duration);
    generator.current.resolve((value: string) => setCount(value))
  }, []);
  useEffect(() => {
    const timeout = generator.current.schedule((value: string, step: number) => {
      setCount(value);
      setStep(step);
    }, false)
    return () => clearTimeout(timeout);
  }, [step])

  return <span>{count}</span>
}