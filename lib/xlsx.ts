import xlsx, { IJsonSheet } from "json-as-xlsx"

export function downloadToExcel() {
  const columns: IJsonSheet[] = [
    {
      sheet: "bumon", 
      columns: [
        { label: "部門CD", value: "bcd" }, 
        { label: "部門名", value: "bumon name" }, 
        { label: "支社", value: "ssy" }, 
        { label: "部", value: "bu" }, 
      ], 
      content: [], 
    }, 
  ]
  const settings = {
    fileName: "bumon excel", 
  }

  xlsx(columns, settings)
}