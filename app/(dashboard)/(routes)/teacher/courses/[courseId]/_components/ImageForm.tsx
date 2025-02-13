"use client"

import React, { useState } from 'react'
import * as z from "zod"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { ImageIcon, Pencil, PlusCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { Course } from '@prisma/client'
import Image from 'next/image'
import { FileUpload } from '@/components/FileUpload'

interface ImageFormProps {
  initialData: Course
  courseId: string
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  })
})

const ImageForm = ({
  initialData,
  courseId
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => {
    setIsEditing((current) => !current)
  }

  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values)
      toast.success("Course updated successfully")
      toggleEdit()
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className='mt-6 border bg-slate-100 rounded-md p-4'>
      <div className='font-medium flex items-center justify-between'>
        Course Image
        <Button onClick={toggleEdit} variant={'ghost'}>
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className='w-4 h-4 mr-2' />
              Add an Image
            </>
          )}
          {!isEditing && initialData.imageUrl && 
          (
            <>
              <Pencil className='w-4 h-4 mr-2' />
              Edit Image
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.imageUrl ? (
          <div className='flex items-center justify-center h-60 bg-slate-200 rounded-md'>
            <ImageIcon className='h-10 w-10 text-slate-500'/>
          </div>
        ) : (
          <div className='relative aspect-video mt-2'>
            <Image
              alt="Upload"
              fill
              className="rounded-md object-cover"
              src={initialData.imageUrl}
            />
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url })
              }
            }}
          />
          <div className='text-xs text-muted-foreground mt-4'>
            <p>16:9 aspect ratio recommended</p>
            <p className='text-emerald-500 font-bold'>Please, don&apos;t forget to click on &quot;Upload 1 file&quot; after selecting your image.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageForm