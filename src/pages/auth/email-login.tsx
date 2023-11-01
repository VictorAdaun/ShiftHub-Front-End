import Google from "../../assets/svgs/auth/Google.svg"
import PrimaryButton from "../../components/button/primary-button"
import SecondaryButton from "../../components/button/secondary-button"
import AuthLayout from "../../layouts/auth"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import constants from "../../utils/constants"
import FormError from "../../components/form/form-error"
import { useQuery, UseQueryResult } from "react-query"
import axiosInstance from "../../utils/axios"

interface IFormInput {
    email: string,
    password: string
}

const schema = yup
    .object({
        email: yup.string().required(constants.FIELD_REQUIRED_MESSAGE).email("This field should contain a valid email"),
        password: yup.string()
            .required(constants.FIELD_REQUIRED_MESSAGE),
    })
    .required();

function Login() {

    const navigate = useNavigate()

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm({ resolver: yupResolver(schema) });

    const handleSignin = (data: IFormInput) => {
        console.log(data)
    }

    // const loginQuery : UseQueryResult<IFormInput, unknown> = useQuery("login", 
    // () => {
    //     axiosInstance.get("https://jsonplaceholder.typicode.com/todos/1")
    //     .then((res) => 
    //         console.log(res)
    //     )
    // })

    return (
        <AuthLayout>
            <div className="login w-[80%] md:w-full max-w-[425px] h-auto mx-auto text-center">
                <h1 className="my-4 text-2xl">Welcome Back!</h1>
                <SecondaryButton onClick={()=>console.log("")} className="mb-3 !py-[11px]">
                    <div className="flex items-center justify-center gap-5">
                        <img src={Google} alt="google" />
                        <span>Login with Google</span>
                    </div>
                </SecondaryButton>
                <div className="hr w-auto flex items-center gap-2 mb-2">
                    <hr className="w-1/4" />
                    <em className="text-sm">Or, sign in with your email</em>
                    <hr className="w-1/4" />
                </div>

                <form className="w-full" onSubmit={handleSubmit(handleSignin)}>
                    <div className="field flex flex-col items-start gap-2 mb-6">
                        <label htmlFor="email" className="text-sm">Email Address</label>
                        <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        {...register("email")}
                        placeholder="Enter your email" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                        {errors.email && <FormError error={errors.email.message}></FormError>}
                    </div>

                    <div className="field flex flex-col items-start gap-2 mb-6">
                        <label htmlFor="password" className="text-sm">Password</label>
                        <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        {...register("password")}
                        placeholder="Enter your password" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                        {errors.password && <FormError error={errors.password.message}></FormError>}
                        <p className="text-lydia ml-auto text-sm">Forgot password?</p>
                    </div>

                    <div className="remember-me flex items-center mb-4">
                        <input type="checkbox" defaultChecked name="remember" id="remember" className="w-4 h-4 mr-2 accent-lydia" />
                        <p className="text-sm">Stay logged in</p>
                    </div>

                    <PrimaryButton onClick={() => navigate("/login/email")}>
                        Sign in
                    </PrimaryButton>

                    <p className="text-sm mt-4 text-left text-[#667085]">Don’t have an account? <Link to="/signup"><em className="text-lydia not-italic">Sign up</em></Link></p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Login