'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import StudentList from '@/components/StudentStar/StudentList'
import { useStudents } from '@/components/StudentStar/hooks/useStudents'
import FileUpload from '@/components/StudentStar/FileUpload'
import FileExport from '@/components/StudentStar/FileExport'

const Index: React.FC = () => {
  
  const { students, classes, currentClass, setCurrentClass, addStar, removeStar, setStudents } = useStudents()
  const [newStudent, setNewStudent] = useState({ name: '', class: '' })

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.class) {
      setStudents(prev => [...prev, { ...newStudent, stars: 0 }])
      setNewStudent({ name: '', class: '' })
    }
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">学生集星星系统</h1>
      
      <div className="mb-4">
        <FileUpload setStudents={setStudents} />
      </div>

      <div className="mb-4">
        <Select value={currentClass} onValueChange={setCurrentClass}>
          <SelectTrigger>
            <SelectValue placeholder="选择班级" />
          </SelectTrigger>
          <SelectContent>
            {classes.map(cls => (
              <SelectItem key={cls} value={cls}>{cls}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4 flex space-x-2">
        <Input 
          placeholder="学生姓名" 
          value={newStudent.name} 
          onChange={e => setNewStudent(prev => ({ ...prev, name: e.target.value }))}
        />
        <Input 
          placeholder="班级" 
          value={newStudent.class} 
          onChange={e => setNewStudent(prev => ({ ...prev, class: e.target.value }))}
        />
        <Button onClick={handleAddStudent}>添加学生</Button>
      </div>

      <StudentList 
        students={students.filter(s => s.class === currentClass)} 
        addStar={addStar} 
        removeStar={removeStar} 
      />

      <div className="mt-4">
        <FileExport students={students} />
      </div>
    </main>
  );
};

export default Index;
