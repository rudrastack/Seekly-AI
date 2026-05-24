import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { handleLogin } = useAuth()

  const user = useSelector((state) => state.auth.user)
  const loading = useSelector((state) => state.auth.loading)

  const navigate = useNavigate()

  const submitForm = async (event) => {
    event.preventDefault()

    const payload = {
      email,
      password,
    }

    await handleLogin(payload)
    navigate("/")
  }

  if(!loading && user) {
    return <Navigate to="/" replace />;
  }

   
  return (
    <section className="relative min-h-screen bg-[#030712] px-4 py-10 text-slate-100 overflow-hidden flex items-center justify-center sm:px-6 lg:px-8">
      {/* Ambient Futuristic Glow Orbs */}
      <div className="absolute top-1/3 right-1/4 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px] animate-pulse duration-4000" />
      <div className="absolute bottom-1/3 left-1/4 -z-10 h-96 w-96 rounded-full bg-cyan-600/15 blur-[150px] animate-pulse duration-3000" />
      
      {/* Subtle Digital Grid Overlay Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10" />

      <div className="w-full max-w-md relative group">
        {/* Animated Card Border Glow */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-500 opacity-30 blur transition duration-1000 group-hover:opacity-50" />
        
        {/* Main High-Tech Glass Container */}
        <div className="relative w-full rounded-2xl border border-white/10 bg-[#0b1329]/80 p-8 shadow-2xl backdrop-blur-xl">
          
          {/* Top Tech Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium tracking-wider text-indigo-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Secure Node // Verification
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-indigo-400">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Synchronize your credentials to re-establish secure uplink.
          </p>

          <form onSubmit={submitForm} className="mt-8 space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                Secure Email ID
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="identity@network.com"
                required
                className="w-full rounded-xl border border-slate-800 bg-[#070c19]/90 px-4 py-3.5 text-slate-100 placeholder-slate-600 outline-none transition duration-300 focus:border-indigo-500 focus:bg-[#091124] focus:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                Security Key
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full rounded-xl border border-slate-800 bg-[#070c19]/90 px-4 py-3.5 text-slate-100 placeholder-slate-600 outline-none transition duration-300 focus:border-indigo-500 focus:bg-[#091124] focus:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 px-4 py-3.5 font-bold tracking-wide text-slate-950 shadow-lg shadow-indigo-500/20 transition duration-300 hover:from-indigo-400 hover:to-blue-500 hover:shadow-indigo-400/40 hover:scale-[1.01] active:scale-[0.99] focus:outline-none"
            >
              Initialize Session
            </button>
          </form>

          {/* Footer Navigation */}
          <p className="mt-8 text-center text-sm text-slate-500">
            New node on the grid?{' '}
            <Link to="/register" className="font-semibold text-indigo-400 transition hover:text-indigo-300 hover:underline decoration-indigo-500/50 underline-offset-4">
              Register Alias
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login