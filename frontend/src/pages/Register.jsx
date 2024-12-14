import AuthInput from '../components/auth/AuthInput';

export default function Register() {
  return (
    <form action="" className="flex flex-col gap-5 w-1/2 mx-auto">
      <h2 className="text-2xl font-semibold text-[#162D3A">
        Welcome  👋  <br /> Create an account
      </h2>
      <p className="text-[#162D3A] text-sm">
        Today is a new day. It's your day. You shape it.<br />
        Sign up to start managing your projects.
      </p>
      <div className="flex gap-4">
        <AuthInput
          id="firstName"
          type="text"
          placeholder="First Name"
          label="First Name"
        />
        <AuthInput
          id="lastName"
          type="text"
          placeholder="Last Name"
          label="Last Name"
        />
      </div>
      <AuthInput
        id="email"
        type="email"
        placeholder="Example@email.com"
        label="Email"
      />
      <AuthInput
        id="password"
        type="password"
        placeholder="At least 8 characters"
        label="Password"
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
