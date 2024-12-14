import React from 'react'

export default function Register() {
  return (
    <form action="">
      <h2 className="text-2xl font-semibold text-[#162D3A] mb-8">
        Welcome  👋  <br /> Create an account
      </h2>
      <p className="text-[#162D3A] text-sm mb-8">
        Today is a new day. It's your day. You shape it.<br />
        Sign up to start managing your projects.
      </p>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="First Name"
          className="w-1/2 h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-[#162D3A]"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-1/2 h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-[#162D3A]"
        />
      </div>
      <input
        type="email"
        placeholder="Email"
        className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-[#162D3A] mt-4"
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-[#162D3A] mt-4"
      />
      <button
        type="submit"
        className="w-full h-12 bg-[#162D3A] text-white rounded-xl hover:bg-[#0D1E26] mt-4"
      >
        Register
      </button>
    </form>
  )
}
