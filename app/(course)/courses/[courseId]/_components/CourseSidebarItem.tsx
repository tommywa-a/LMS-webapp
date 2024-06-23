"use client"

import { CheckCircle, Lock, PlayCircle } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

interface CourseSidebarItemProps {
  label:string
  id: string
  isCompleted: boolean
  courseId: string
  isLocked: boolean
}

const CourseSidebarItem = ({
  label,
  id,
  isCompleted,
  courseId,
  isLocked,
}: CourseSidebarItemProps) => {
  const pathname = usePathname()
  const router = useRouter()

  const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle)

  const onClick = () => {
    router.push(`/course/${courseId}/chapters/${id}`)
  }

  return (
    <div>CourseSidebarItem</div>
  )
}

export default CourseSidebarItem