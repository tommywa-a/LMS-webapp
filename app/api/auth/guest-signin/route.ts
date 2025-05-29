import { createClerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const clerk = createClerkClient({
	secretKey: process.env.CLERK_SECRET_KEY!,
})

export async function POST() {
	try {
		// Generate a unique identifier for the guest
		const now = new Date();
const pad = (n) => n.toString().padStart(2, '0');

// Timestamp: YYYYMMDD_HHMMSS
const timestamp = 
  `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}_` +
  `${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}`;

// Add prefix and a random 4-digit number
const randomNum = Math.floor(1000 + Math.random() * 9000); // ensures 4 digits
const uniqueId = `guest_${timestamp}_${randomNum}`;

		const email = `${uniqueId}@temporary.com`
		const username = `${uniqueId}`
		const password = `pass_${uniqueId}!`

		// Create a guest user
		const user = await clerk.users.createUser({
			emailAddress: [email],
			username,
			password,
			firstName: 'Guest',
			lastName: 'User',
			skipPasswordChecks: true,
			publicMetadata: {
				isGuest: true,
			},
		})

		// Return credentials for password-based sign-in
		return NextResponse.json({
			identifier: username,
			password,
		})
	} catch (error: any) {
		console.error('Error creating guest access:', error)
		return NextResponse.json(
			{ error: error.message || 'Failed to create guest sign-in' },
			{ status: 500 }
		)
	}
}
