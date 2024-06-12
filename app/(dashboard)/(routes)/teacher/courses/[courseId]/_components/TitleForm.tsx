"use client"

import React, { useState } from 'react'
import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface TitleFormProps {
  initialData: {
    title: string
  }
  courseId: string
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  })
})

const TitleForm = ({
  initialData,
  courseId
}: TitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => {
    setIsEditing((current) => !current)
  }

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  const {isSubmitting, isValid} = form.formState

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
        Course Title
        <Button onClick={toggleEdit} variant={'ghost'}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className='w-4 h-4 mr-2' />
              Edit Title
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p className='text-sm mt-2'>
          {initialData.title}
        </p>
      ) : (
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="E.g. 'Advanced Web Development'"
                      {...field}
                      autoFocus
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-x-2'>
              <Button
                disabled={isSubmitting || !isValid}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}

export default TitleForm