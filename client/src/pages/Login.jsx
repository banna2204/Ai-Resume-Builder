import { Lock, Mail, User2Icon, Key } from 'lucide-react'
import React from 'react'
import api from '../configs/api.js'
import { useDispatch } from 'react-redux'
import { login } from '../app/features/authSlice.js'
import toast from 'react-hot-toast'

const Login = () => {
  const dispatch = useDispatch()

  const query = new URLSearchParams(window.location.search)
  const urlState = query.get('state')
  const [state, setState] = React.useState(urlState || "login")

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    otp: ''
  })

  const [otpSent, setOtpSent] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  /* SEND OTP */
  const sendOtp = async () => {
    if (!formData.email) {
      return toast.error("Please enter email first")
    }

    try {
      setLoading(true)
      await api.post('/api/otp/send-otp', { email: formData.email })
      setOtpSent(true)
      toast.success("OTP sent to your email")
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  /* LOGIN / VERIFY & SIGNUP */
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const { data } = await api.post(`/api/users/${state}`, formData)

      dispatch(login(data))
      localStorage.setItem('token', data.token)
      toast.success(data.message)

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50'>
      <form
        onSubmit={handleSubmit}
        className="sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>

        <p className="text-gray-500 text-sm mt-2">
          Please {state} to continue
        </p>

        {/* NAME (SIGNUP ONLY) */}
        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full pl-6 gap-2">
            <User2Icon size={16} color='#6B7280' />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-none outline-none w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* EMAIL */}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full pl-6 gap-2">
          <Mail size={13} color='#6B7280' />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="border-none outline-none w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* PASSWORD */}
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full pl-6 gap-2">
          <Lock size={13} color='#6B7280' />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border-none outline-none w-full"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* SEND OTP (SIGNUP ONLY) */}
        {state !== "login" && !otpSent && (
          <button
            type="button"
            onClick={sendOtp}
            disabled={loading}
            className="mt-4 w-full h-11 rounded-full text-green-600 border border-green-500 hover:bg-green-50 transition"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        )}

        {/* OTP INPUT */}
        {state !== "login" && otpSent && (
          <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full pl-6 gap-2">
            <Key size={13} color='#6B7280' />
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              maxLength={6}
              className="border-none outline-none w-full"
              value={formData.otp}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading || (state !== "login" && !otpSent)}
          className="mt-4 w-full h-11 rounded-full text-white bg-green-500 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {state === "login" ? "Login" : "Verify & Sign up"}
        </button>

        <p
          onClick={() => {
            setState(prev => prev === "login" ? "register" : "login")
            setOtpSent(false)
            setFormData({ name: '', email: '', password: '', otp: '' })
          }}
          className="text-gray-500 text-sm mt-3 mb-11 cursor-pointer"
        >
          {state === "login" ? "Don't have an account?" : "Already have an account?"}
          <span className="text-green-500 hover:underline ml-1">
            click here
          </span>
        </p>
      </form>
    </div>
  )
}

export default Login
