"use client"
import useSWR from "swr"

const URL = "/files/tmasa.json"

const tmasaSample =  {
  "suffix": null,
  "tokucd": "20",
  "tnamen": "ＣＣＳ",
  "tnamek": "CCS",
  "ryakun": "ＣＣＳ",
  "ryakuk": "CCS",
  "toroku": "190325",
  "syusei": "190325",
  "syukei": "20",
  "gyosyu": "  ",
  "oyacd": "0",
  "kocd": "0",
  "add_ymd": "2023-10-31 13:40:06.843",
  "edit_ymd": "2023-10-31 13:40:06.843"
}
export type Tmasa = (typeof tmasaSample)

export const useTamasa = () => {
  const { data, isLoading, error } = useSWR<Tmasa[]>(
    "tmasa", 
    async () => {
      const res = await fetch(URL)
      const data = await res?.json() 
      return data 
    }
  )
  return { data, error, isLoading }
}