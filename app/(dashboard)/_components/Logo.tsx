"use client"

import React from 'react'
import Image from 'next/image'
import {useRouter} from 'next/navigation'

const Logo = () => {
  const router = useRouter()
  const onClick = () => {
    return router.push("/")
  }

  return (
    <Image
      height={130}
      width={130}
      alt='Logo'
      src='/logo.svg'
      onClick={onClick}
      className='cursor-pointer'
    />
  )
}

export default Logo