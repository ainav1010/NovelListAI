import { useState, useEffect } from 'react'

interface Student {
  name: string
  class: string
  stars: number
}

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [classes, setClasses] = useState<string[]>([])
  const [currentClass, setCurrentClass] = useState<string>('')

  useEffect(() => {
    const uniqueClasses = Array.from(new Set(students.map(s => s.class)))
    setClasses(uniqueClasses)
    if (uniqueClasses.length > 0 && !currentClass) {
      setCurrentClass(uniqueClasses[0])
    }
  }, [students, currentClass])

  const addStar = (name: string) => {
    setStudents(prev => prev.map(s => s.name === name ? { ...s, stars: s.stars + 1 } : s))
  }

  const removeStar = (name: string) => {
    setStudents(prev => prev.map(s => s.name === name && s.stars > 0 ? { ...s, stars: s.stars - 1 } : s))
  }

  return { students, setStudents, classes, currentClass, setCurrentClass, addStar, removeStar }
}

