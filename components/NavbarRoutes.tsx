"use client"

import { useAuth, UserButton } from "@clerk/nextjs"
import { usePathname, useRouter } from "next/navigation"
import React from "react"
import { LogOut } from "lucide-react"
import Link from "next/link"

import { Button } from "./ui/button"
import { isTeacher } from "@/lib/teacher"
import SearchInput from "./SearchInput"

const NavbarRoutes = () => {
	const {userId} = useAuth()
	const pathname = usePathname()
	const router = useRouter()

	const isTeacherPage = pathname?.startsWith("/teacher")
	const isCoursePage = pathname?.includes("/courses")
	const isSearchPage = pathname === "/search"

	return (
		<>
			{isSearchPage && (
				<div className="hidden md:block">
					<SearchInput />
				</div>
			)}
			<div className='flex gap-x-2 ml-auto'>
				{isTeacherPage || isCoursePage ? (
					<Link href='/'>
						<Button size="sm" variant="ghost">
							<LogOut className='h-4 w-4 mr-2' />
							{isTeacherPage ? "Exit Teacher Mode" : "Exit Course"}
							
						</Button>
					</Link>
				) : isTeacher(userId) ? (
					<Link href='/teacher/courses'>
						<Button size="sm" variant="ghost">
							Teacher mode
						</Button>
					</Link>
				) : null}
				<UserButton 
					afterSignOutUrl="/sign-in"
					appearance={{
						elements: {
							userButtonAvatarBox: "h-8 w-8"
						}
					}}
				/>
			</div>
		</>
	)
}

export default NavbarRoutes
