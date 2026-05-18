import React, { useState } from 'react'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { handleRegister } = useAuth()

  const submitForm = async (event) => {
    event.preventDefault()

    const payload = {
      username,
      email,
      password,
    }

    await handleRegister(payload)
    
  }

  return (
    <section className="relative min-h-screen bg-[#030712] px-4 py-10 text-slate-100 overflow-hidden flex items-center justify-center sm:px-6 lg:px-8">
      {/* Ambient Futuristic Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px] animate-pulse duration-4000" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-indigo-600/15 blur-[150px] animate-pulse duration-3000" />
      
      {/* Subtle Digital Grid Overlay Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10" />

      <div className="w-full max-w-md relative group">
        {/* Animated Card Border Glow */}
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-500 opacity-30 blur transition duration-1000 group-hover:opacity-50" />
        
        {/* Main High-Tech Glass Container */}
        <div className="relative w-full rounded-2xl border border-white/10 bg-[#0b1329]/80 p-8 shadow-2xl backdrop-blur-xl">
          
          {/* Top Tech Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium tracking-wider text-cyan-400 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            Auth Gateway // v3.0
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-400">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Initialize your security parameters to access the core network.
          </p>

          <form onSubmit={submitForm} className="mt-8 space-y-5">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                Username
              </label>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter futuristic alias"
                  required
                  className="w-full rounded-xl border border-slate-800 bg-[#070c19]/90 px-4 py-3.5 text-slate-100 placeholder-slate-600 outline-none transition duration-300 focus:border-cyan-500 focus:bg-[#091124] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="identity@network.com"
                required
                className="w-full rounded-xl border border-slate-800 bg-[#070c19]/90 px-4 py-3.5 text-slate-100 placeholder-slate-600 outline-none transition duration-300 focus:border-cyan-500 focus:bg-[#091124] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="mb-2 block text-xs font-semibold uppercase tracking-widest text-slate-400">
                Access Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full rounded-xl border border-slate-800 bg-[#070c19]/90 px-4 py-3.5 text-slate-100 placeholder-slate-600 outline-none transition duration-300 focus:border-cyan-500 focus:bg-[#091124] focus:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3.5 font-bold tracking-wide text-slate-950 shadow-lg shadow-cyan-500/20 transition duration-300 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-400/40 hover:scale-[1.01] active:scale-[0.99] focus:outline-none"
            >
              Register Terminal
            </button>
          </form>

          {/* Footer Navigation */}
          <p className="mt-8 text-center text-sm text-slate-500">
            Already mapped into our systems?{' '}
            <Link to="/login" className="font-semibold text-cyan-400 transition hover:text-cyan-300 hover:underline decoration-cyan-500/50 underline-offset-4">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Register