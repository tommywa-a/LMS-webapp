"use client"

import React, { useState } from 'react'
import * as z from "zod"
import axios from "axios"
import MuxPlayer from '@mux/mux-player-react'

import { Button } from "@/components/ui/button"
import { ImageIcon, Pencil, PlusCircle, Video } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Chapter, Course, MuxData } from '@prisma/client'
import Image from 'next/image'
import { FileUpload } from '@/components/FileUpload'

interface ChapterVideoFormProps {
  initialData: Chapter & {muxData?: MuxData | null}
  courseId: string
  chapterId: string
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
})

const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => {
    setIsEditing((current) => !current)
  }

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
      toast.success("Chapter updated successfully")
      toggleEdit()
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Chapter Video
        <Button onClick={toggleEdit} variant={'ghost'}>
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className='w-4 h-4 mr-2' />
              Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && 
          (
            <>
              <Pencil className='w-4 h-4 mr-2' />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.videoUrl ? (
          <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
            <Video className='h-10 w-10 text-slate-500'/>
          </div>
        ) : (
          <div className='relative aspect-video mt-2'>
            <MuxPlayer
              playbackId={initialData?.muxData?.playbackId || ""}
            />
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url })
              }
            }}
          />
          <div className='text-xs text-muted-foreground mt-4'>
            <p>Upload this chapter&apos;s video.</p>
            <p className='text-emerald-500 font-bold'>Please, don&apos;t forget to click on &quot;Upload 1 file&quot; after selecting your video.</p>
          </div>
        </div>
      )}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few minutes to process. Please refresh the page if the video does not appear.
        </div>
      )}
    </div>
  )
}

export default ChapterVideoForm