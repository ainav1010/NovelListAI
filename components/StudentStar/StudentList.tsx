import { Button } from "@/components/ui/button"

interface Student {
  name: string
  stars: number
}

interface StudentListProps {
  students: Student[]
  addStar: (name: string) => void
  removeStar: (name: string) => void
}

export default function StudentList({ students, addStar, removeStar }: StudentListProps) {
  return (
    <ul className="space-y-2">
      {students.map(student => (
        <li key={student.name} className="flex items-center justify-between bg-gray-100 p-2 rounded">
          <span>{student.name}</span>
          <div className="flex items-center space-x-2">
            <span>星星: {student.stars}</span>
            <Button size="sm" onClick={() => addStar(student.name)}>+</Button>
            <Button size="sm" variant="outline" onClick={() => removeStar(student.name)}>-</Button>
          </div>
        </li>
      ))}
    </ul>
  )
}

