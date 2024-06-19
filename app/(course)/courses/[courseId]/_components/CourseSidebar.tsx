import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Chapter, Course, UserProgress } from "@prisma/client"
import { redirect } from "next/navigation";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null
    })[]
  };
  progressCount: number
}

const CourseSidebar = async ({
  course,
  progressCount,
}: CourseSidebarProps) => {
  const {userId} = auth()

  if (!userId) {
    return redirect("/")
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      }
    }
  })

  return (
    <div>CourseSidebar</div>
  )
}

export default CourseSidebar