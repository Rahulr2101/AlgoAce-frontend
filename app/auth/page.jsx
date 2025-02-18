"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { login, register } from "@app/auth/apis/auth"

export default function Page() {
  const [isLogin, setIsLogin] = useState(true)
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleUserLogin = async (e) => {
    e.preventDefault()
    try {
      console.log("email:", email);
      const res = await login(email, password)
      console.log(res);
      if(res.success){
        router.push('/')
      }
    } catch (err) {
      console.error('Login failed:', err)
    }
  }

  const handleUserRegister = async (e) => {
    e.preventDefault() 
    try {
      await register(userName, password, email) 
      router.push('/')
    } catch (err) {
      console.error('Registration failed:', err)
    }
  }

  return (
    <div className="flex min-h-[100dvh]  flex-col">
      <header className="bg-gray-900 px-4 py-3 shadow">
        <div className="container mx-auto flex items-center justify-between">
          <Link href='/' className="flex items-center" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="ml-2 font-bold text-white">AlgoAce</span>
          </Link>
          <Button
            variant="ghost"
            onClick={() => setIsLogin(prev => !prev)}
            className="text-sm font-medium text-white">
            {isLogin ? "Sign Up" : "Login"}
          </Button>
        </div>
      </header>
      <main className="flex-1 bg-muted">
        <div className="container mx-auto grid grid-cols-1 gap-8 py-12 md:grid-cols-2 md:gap-16 lg:py-24">
          {isLogin ? (
            <div className="rounded-lg bg-background p-6 shadow-sm md:p-8">
              <h2 className="mb-4 text-2xl font-bold">Login</h2>
              <form className="space-y-4" onSubmit={handleUserLogin}>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </div>
          ) : (
            <div className="rounded-lg bg-background p-6 shadow-sm md:p-8">
              <h2 className="mb-4 text-2xl font-bold">Sign Up</h2>
              <form className="space-y-4" onSubmit={handleUserRegister}>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </form>
            </div>
          )}
          <div className="rounded-lg bg-background p-6 shadow-sm md:p-8 space-y-4">
            <h2 className="mb-4 text-2xl font-bold">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </h2>
            <p className="mb-6 text-muted-foreground">
              {isLogin ? "Sign up to get started with our platform." : "Log in to access your account."}
            </p>
            <Button
              variant={isLogin ? "outline" : "default"}
              onClick={() => setIsLogin(prev => !prev)}
              className="w-full">
              {isLogin ? "Sign Up" : "Login"}
            </Button>
            {isLogin?(<Button
              variant="default"
              onClick={() => {
                setEmail("abc@gmail.com")
                setPassword("123")
              }}
              className="w-full">
              Test Account
            </Button>):(<></>)}
          </div>
        </div>
      </main>
    </div>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}