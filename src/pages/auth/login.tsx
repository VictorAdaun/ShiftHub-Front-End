import LoginImage from "../../assets/svgs/auth/LoginIllustration.svg";
import Facebook from "../../assets/svgs/auth/Facebook.svg";
import Google from "../../assets/svgs/auth/Google.svg";
import Apple from "../../assets/svgs/auth/Apple.svg";
import AuthLayout from "../../layouts/auth";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/button/primary-button";
import SecondaryButton from "../../components/button/secondary-button";

function Login() {
  const navigate = useNavigate()

  const socialMediaLogin = () => {
    console.log("disabled")
  }

  return (
    <AuthLayout>
      <div className="login w-full max-w-[425px] h-auto mx-auto text-center">
        <div className="login-image w-fit mx-auto">
          <img src={LoginImage} alt="Login" />
        </div>
        <p className="my-4">Let's log you in.</p>
        <SecondaryButton onClick={socialMediaLogin} className="mb-3 !py-[11px]">
          <div className="flex items-center justify-center gap-5">
            <img src={Facebook} alt="facebook" />
            <span>Login with Facebook</span>
          </div>
        </SecondaryButton>
        <SecondaryButton onClick={socialMediaLogin} className="mb-3 !py-[11px]">
          <div className="flex items-center justify-center gap-5">
            <img src={Google} alt="google" />
            <span>Login with Google</span>
          </div>
        </SecondaryButton>
        <SecondaryButton onClick={socialMediaLogin} className="mb-3 !py-[11px]">
          <div className="flex items-center justify-center gap-5">
            <img src={Apple} alt="apple" />
            <span>Login with Apple</span>
          </div>
        </SecondaryButton>
        <div className="hr w-auto flex items-center gap-2 mb-6">
          <hr className="w-full" />
          <span className="text-body-large text-grayscale-60 font-normal">OR</span>
          <hr className="w-full" />
        </div>
        <PrimaryButton onClick={()=>navigate("/login/email")}>
          Sign in with Email    
        </PrimaryButton>
      </div>
    </AuthLayout>
  );
}

export default Login;
