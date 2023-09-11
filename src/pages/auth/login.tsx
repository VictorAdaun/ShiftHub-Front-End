import LoginImage from "../../assets/LoginIllustration.svg"
import Facebook from "../../assets/Facebook.svg"
import Google from "../../assets/Google.svg"
import Apple from "../../assets/Apple.svg"
import AuthLayout from "../../layouts/auth"

function Login() {
  return (
    <AuthLayout>
        <div className="login w-96 h-auto mx-auto text-center">
            <div className="login-image w-fit mx-auto">
                <img src={LoginImage} alt="Login" />
            </div>
            <p className="my-4">Let's log you in.</p>
            <button className="w-full py-2 border border-solid border-[#D0D5DD] rounded-md font-normal text-sm text-[#101323] flex items-center justify-center gap-5 mb-4">
                <img src={Facebook} alt="facebook"/>
                Login with Facebook
            </button>
            <button className="w-full py-2 border border-solid border-[#D0D5DD] rounded-md font-normal text-sm text-[#101323] flex items-center justify-center gap-5 mb-4">
                <img src={Google} alt="google"/>
                Login with Google
            </button>
            <button className="w-full py-2 border border-solid border-[#D0D5DD] rounded-md text-sm text-[#101323] flex items-center justify-center gap-5 mb-4">
                <img src={Apple} alt="apple"/>
                Login with Apple
            </button>
            <div className="hr w-auto flex items-center gap-2 mb-2">
                <hr className="w-full" />
                <em className="text-sm">OR</em>
                <hr className="w-full"/>
            </div>
            <button className="w-full py-2 border-none text-white bg-lydia rounded-md text-sm">Sign in with Password</button>
        </div>
    </AuthLayout>
  )
}

export default Login