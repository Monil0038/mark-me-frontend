import { useState } from "react"
import { Link } from "react-router-dom"
import Logo from "@/assets/logo.png"
import { useNavigate } from "react-router-dom"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("https://mark-me-backend.onrender.com/faculty/login", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errText = await response.text()
        throw new Error(errText || "Login failed")
      }

      const data = await response.json()
      setSuccess("Login successful")
      console.log("API Response:", data)

      if (data.token) {
        localStorage.setItem("authToken", data.token)
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user))
      }

      navigate("/dashboard", { replace: true })
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* LEFT PANEL */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg> */}
          Mark Me
        </div>

        <img
          src={Logo}
          className="relative m-auto"
          width={301}
          height={60}
          alt="Vite"
        />
      </div>

      {/* RIGHT PANEL (FORM) */}
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-left">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password below <br />
              to log into your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border p-2 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-2 rounded-md"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white p-2 rounded-md hover:bg-primary/90"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Forgot password + Sign up buttons */}
          <div className="flex justify-between text-sm mt-2">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
            {/* <Link
              to="/sign-up"
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </Link> */}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking login, you agree to our{" "}
            <a
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
