import { redirect } from "next/navigation"

const ChapterIdPage = ({
  params
}: {
  params: { courseId: string, chapterId: string}
}) => {
  const { userId} = auth()

  if (!userId) {
    return redirect("/")
  }
  
  return (
    <div>ChapterIdPage</div>
  )
}

export default ChapterIdPage