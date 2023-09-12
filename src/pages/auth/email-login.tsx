import Google from "../../assets/svgs/auth/Google.svg"
import PrimaryButton from "../../components/button/primary-button"
import SecondaryButton from "../../components/button/secondary-button"
import AuthLayout from "../../layouts/auth"
import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()
    
    return (
        <AuthLayout>
            <div className="login w-96 h-auto mx-auto text-center">
                <p className="my-4 text-2xl">Welcome Back!</p>
                <SecondaryButton onClick={()=>console.log("")} className="mb-3 !py-[11px]">
                    <div className="flex items-center justify-center gap-5">
                        <img src={Google} alt="google" />
                        <span>Login with Google</span>
                    </div>
                </SecondaryButton>
                <div className="hr w-auto flex items-center gap-2 mb-2">
                    <hr className="w-2/4" />
                    <em className="text-sm">Or, sign in with your email</em>
                    <hr className="w-2/4"/>
                </div>

                <form className="w-full">
                    <div className="field flex flex-col items-start gap-2 mb-6">
                        <label htmlFor="email" className="text-sm">Email Address</label>
                        <input type="email" name="email" id="email" placeholder="Enter your email" className="w-full border border-solid border-[#D0D5DD] rounded-md py-2 text-sm placeholder:font-normal outline-none pl-2" />
                    </div>

                    <div className="field flex flex-col items-start gap-2 mb-6">
                        <label htmlFor="password" className="text-sm">Password</label>
                        <input type="password" name="password" id="password" placeholder="Enter your password" className="w-full border border-solid border-[#D0D5DD] rounded-md py-2 text-sm placeholder:font-normal outline-none pl-2" />
                    </div>
                    <PrimaryButton onClick={()=>navigate("/login/email")}>
                        Sign in with Email    
                    </PrimaryButton>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Login