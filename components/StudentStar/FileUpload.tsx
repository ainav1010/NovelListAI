import { useState } from 'react'
import { Button } from "@/components/ui/button"
import * as XLSX from 'xlsx'

interface FileUploadProps {
  setStudents: React.Dispatch<React.SetStateAction<{ name: string; class: string; stars: number }[]>>
}

export default function FileUpload({ setStudents }: FileUploadProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setFile(files[0])
    }
  }

  const handleImport = () => {
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet) as { 姓名: string; 班级: string }[]
        
        const newStudents = jsonData.map(row => ({
          name: row.姓名,
          class: row.班级,
          stars: 0
        }))

        setStudents(newStudents)
      }
      reader.readAsArrayBuffer(file)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="hidden" id="file-upload" />
      <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        选择文件
      </label>
      <span>{file ? file.name : '未选择文件'}</span>
      <Button onClick={handleImport} disabled={!file}>导入</Button>
    </div>
  )
}

