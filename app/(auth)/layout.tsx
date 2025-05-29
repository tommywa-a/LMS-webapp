'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter()

	useEffect(() => {
		// Clear any stale state on mount
		window.sessionStorage.clear()
		window.localStorage.removeItem('clerk-db')
	}, [])

	return (
		<div className='h-full flex items-center justify-center'>{children}</div>
	)
}

export default AuthLayout
