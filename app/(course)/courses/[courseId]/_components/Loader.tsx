"use client"

import {PuffLoader} from "react-spinners"
import React from "react"

const Loader = () => {
  return (
    <div className="
    h-[calc(100vh-80px)] w-full bg-white flex flex-col items-center justify-center">
      <PuffLoader color="#0369a1" size={100} />
    </div>
  )
}

export default Loader