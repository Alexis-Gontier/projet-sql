import AuthInput from '../components/auth/AuthInput';

export default function LoginForm() {
  return (
    <form className="w-1/2 mx-auto">
      <h2 className="text-2xl font-semibold text-[#162D3A] mb-8">
        Welcome Back  👋  <br /> Login to your account
      </h2>
      <p className="text-[#162D3A] text-sm mb-8">
        Today is a new day. It's your day. You shape it.<br />
        Sign in to start managing your projects.
      </p>
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
      <div className="mb-4 text-end">
        <a href="#" className="text-[#162D3A] hover:underline">
          Forgot password?
        </a>
      </div>
      <button
        type="submit"
        className="w-full h-12 bg-[#162D3A] text-white rounded-xl hover:bg-[#0D1E26] focus:ring-[] focus:ring-2 focus:outline-none"
      >
        Login
      </button>
    </form>
  );
}
