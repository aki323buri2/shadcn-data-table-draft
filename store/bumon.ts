"use client"
import useSWR from "swr"

const URL = "/files/bumon_lv5.json"

const bumonSample = {
  "lv5cd": "000100010001000100010001",
  "lv0cd": "1",
  "lv0nm": "全社",
  "lv1cd": "10001",
  "lv1nm": "東日本支社",
  "lv2cd": "100010001",
  "lv2nm": "(東)商品１部",
  "lv3cd": "1000100010001",
  "lv3nm": "(東)海老１課",
  "lv4cd": "10001000100010001",
  "lv4nm": "(東)海老１課",
  "lv5nm": "(東)海老１課",
  "bcd": "1101"
}

export type Bumon = (typeof bumonSample)

export const useBumon = () => {
  const { data, isLoading, error } = useSWR<Bumon[]>(
    "butho", 
    async () => {
      const res = await fetch(URL)
      const data = await res?.json() 
      return data 
    }
  )
  return { data, error, isLoading }
}