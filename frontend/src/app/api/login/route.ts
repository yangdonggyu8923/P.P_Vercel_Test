
import { UserData, UserDataPublic } from '@/types/UserData.type';
import { NextRequest, NextResponse } from "next/server"

export interface I_ApiUserLoginRequest {
	email: string;
	password: string;
}

export interface I_ApiUserLoginResponse {
	success: boolean;
	userData?: UserData;
	message?: string;
}

export const dynamic = 'force-dynamic';


export async function POST(request: NextRequest) {
	console.log(`3 - POST 정보 : 진입 성공?? `)
	const body = (await request.json()) as I_ApiUserLoginRequest;

	// trim all values
	const { email, password } = Object.fromEntries(
		Object.entries(body).map(([key, value]) => [key, value.trim()]),
	) as I_ApiUserLoginRequest;

	if (!email || !password) {
		const res: I_ApiUserLoginResponse = {
			success: false,
			message: 'Either login or password is missing',
		};

		return NextResponse.json(res, { status: 400 });
	}

	return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/login`, {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify({ email, password }),
	})
	.then(async (res)=>{
		return res.ok ?
		res.json().then((json)=>{
			const response = NextResponse.json({ success: true, message: "SUCCESS" }, { status: 200 })
			response.cookies.set({
				name: 'userData',
				value: JSON.stringify(json.data),
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
			})
			response.cookies.set({
				name: 'accessToken',
				value: json.accessToken,
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60),
			})
			response.cookies.set({
				name: 'refreshToken',
				value: json.refreshToken,
				path: '/',
				expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
			})
			return response

		})
		: NextResponse.json({success: false, message: (await res.json()).message}, {status: 401})
	})
	.catch(async (err) => {
		return NextResponse.json({success: false, message: err}, {status: 400})
	})
   
	

  }