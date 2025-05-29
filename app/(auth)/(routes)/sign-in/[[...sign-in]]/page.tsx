'use client'

import { SignIn, useSignIn } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

export default function Page() {
    const router = useRouter()
    const { signIn, isLoaded } = useSignIn()
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (window.history.scrollRestoration) {
            window.history.scrollRestoration = 'manual'
        }
        sessionStorage.clear()
    }, [])

    const handleGuestSignIn = async () => {
        try {
            setIsLoading(true)
            const response = await fetch('/api/auth/guest-signin', {
                method: 'POST',
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Something went wrong')
            }

            const { identifier, password } = await response.json()

            if (signIn) {
                await signIn.create({
                    identifier,
                    password,
                })
                
                // Force a hard refresh after successful sign-in
                window.location.href = searchParams?.get('redirect_url') || '/'
            }
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex flex-col items-center space-y-4'>
            <div className="w-full max-w-sm">
                <SignIn
                    appearance={{
                        elements: {
                            rootBox: 'mx-auto w-full',
                            card: 'shadow-md',
                        },
                    }}
                    fallbackRedirectUrl={searchParams?.get('redirect_url') || '/'}
                    signUpUrl='/sign-up'
                />
                {isLoaded && (
                    <div className='flex items-center gap-2 justify-center mt-4'>
                        <div className='text-muted-foreground'>or</div>
                        <Button
                            variant='outline'
                            onClick={handleGuestSignIn}
                            disabled={isLoading}
                            className='text-muted-foreground'
                        >
                            {isLoading ? 'Signing in...' : 'Continue as Guest'}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
