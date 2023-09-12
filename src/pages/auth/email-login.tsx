import Google from "../../assets/Google.svg"
import AuthLayout from "../../layouts/auth"

function Login() {
  return (
    <AuthLayout>
        <div className="login w-96 h-auto mx-auto text-center">
            <h1 className="my-4 text-2xl">Welcome Back!</h1>
            <button className="w-full box-border py-2 border border-solid border-[#D0D5DD] rounded-md font-normal text-sm text-[#101323] flex items-center justify-center gap-5 mb-4">
                <img src={Google} alt="google"/>
                Login with Google
            </button>
            <div className="hr w-auto flex items-center gap-2 mb-2">
                <hr className="w-1/4" />
                <em className="text-sm">Or, sign in with your email</em>
                <hr className="w-1/4"/>
            </div>

            <form className="w-full">
                <div className="field flex flex-col items-start gap-2 mb-6">
                    <label htmlFor="email" className="text-sm">Email Address</label>
                    <input type="email" name="email" id="email" placeholder="Enter your email" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                </div>

                <div className="field flex flex-col items-start gap-2 mb-6">
                    <label htmlFor="password" className="text-sm">Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                    <p className="text-lydia ml-auto text-sm">Forgot password?</p>
                </div>

                <div className="remember-me flex items-center mb-4">
                    <input type="checkbox" defaultChecked name="remember" id="remember" className="w-4 h-4 mr-2 accent-lydia" />
                    <p className="text-sm">Stay logged in</p>
                </div>

                <button className="w-full py-2 border-none text-white bg-lydia rounded-md text-sm">Sign in</button>

                <p className="text-sm mt-4 text-left text-[#667085]">Don’t have an account? <em className="text-lydia not-italic">Sign up</em></p>
            </form>
        </div>
    </AuthLayout>
  )
}

export default Login