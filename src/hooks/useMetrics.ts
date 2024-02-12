import { useEffect, useRef, useState } from "preact/hooks"
import editionsInfo from "@/data/editions-info.json"

export const useMetrics = ({edicion}:{edicion:string}) => {
    const [metrics, setMetrics] = useState({views:0,news:0,media:0})
    const [isIntersecting, setIsIntersecting] = useState(false)
    const numerosRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(!isIntersecting) return
        const _metric = editionsInfo[Number(edicion)-1].metrics
        setMetrics(_metric)
    },[edicion,isIntersecting])


    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.intersectionRatio > 0) {
            setIsIntersecting(true)
            }
        }
        )
        if (!numerosRef.current) return
    
        observer.observe(numerosRef.current)

        return () => {
        if (!numerosRef.current) return
        observer.unobserve(numerosRef.current)
        }
    }, [])

    return {
        numerosRef,
        metrics
    }
}