"use client"

import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useUser } from "@clerk/nextjs";

interface CourseEnrollButtonProps {
  price: number
  courseId: string
}

const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()
  
  const onClick = async () => {
    try {
      setIsLoading(true)

      if (user?.primaryEmailAddress?.emailAddress.endsWith("@temporary.com")) {
        toast.error("You have to sign up with a real email address to enroll in courses.")
        return
      }

      const response = await axios.post(`/api/courses/${courseId}/checkout`)

      window.location.assign(response.data.url)
    } catch {
      toast.error("Something went wrong while enrolling in the course.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      Enroll for {formatPrice(price)}
    </Button>
  )
}

export default CourseEnrollButton