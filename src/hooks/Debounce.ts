import { useState, useEffect } from "react"

export const useDebounce = ({
  value,
  seconds,
}: {
  value: string
  seconds: number
}) => {
  const [decounceValue, setDecounceValue] = useState("")
  useEffect(() => {
    const setTimeOutID = setTimeout(() => {
      setDecounceValue(value)
    }, seconds)
    return () => {
      clearTimeout(setTimeOutID)
    }
  }, [value, seconds])
  return decounceValue
}
