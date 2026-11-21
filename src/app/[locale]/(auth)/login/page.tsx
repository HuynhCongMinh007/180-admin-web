import { LoginForm } from '@/app/[locale]/(auth)/login/login-form'

const LOGIN_BACKGROUND_URL =
  'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/Salk_institute_2014.jpg/1920px-Salk_institute_2014.jpg'

export default function Login() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGIN_BACKGROUND_URL}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-black/50" />

      <h1 className="text-xl font-medium tracking-wide text-white">
        180 Studio Admin
      </h1>
      <LoginForm />
    </main>
  )
}
