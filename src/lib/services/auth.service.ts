'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { api } from '@/lib/api'
import { ApiRequestError } from '@/lib/api/api-error'
import { ENDPOINTS } from '@/lib/constants/endpoints'
import {
  loginSchema,
  type LoginResponse,
  type LoginValues,
} from '@/lib/types/login'

export async function login(payload: LoginValues) {
  const parsed = loginSchema.safeParse(payload)
  if (!parsed.success) return { error: 'Email hoặc mật khẩu không hợp lệ' }

  try {
    const res = await api.post<LoginResponse>(ENDPOINTS.LOGIN, parsed.data)
    const cookieStore = await cookies()

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    }
    cookieStore.set('accessToken', res.data.accessToken, cookieOptions)
    cookieStore.set('refreshToken', res.data.refreshToken, cookieOptions)
  } catch (error) {
    if (error instanceof ApiRequestError && error.status !== 0) {
      return { error: error.message }
    }
    return { error: 'Không kết nối được server, vui lòng thử lại' }
  }

  redirect('/home')
}
