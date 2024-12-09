import { Button } from "@/components/ui/button"
import * as XLSX from 'xlsx'

interface FileExportProps {
  students: { name: string; class: string; stars: number }[]
}

export default function FileExport({ students }: FileExportProps) {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(students.map(s => ({
      '姓名': s.name,
      '班级': s.class,
      '星星': s.stars
    })))
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "学生星星")
    XLSX.writeFile(workbook, "学生星星.xlsx")
  }

  return (
    <Button onClick={handleExport}>导出Excel</Button>
  )
}

