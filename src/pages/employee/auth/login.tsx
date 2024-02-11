import Google from "../../assets/svgs/auth/Google.svg"
import PrimaryButton from "../../../components/button/primary-button"
import SecondaryButton from "../../../components/button/secondary-button"
import AuthLayout from "../../../layouts/auth"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import constants from "../../../utils/constants"
import FormError from "../../../components/form/form-error"
import Welcome from "../../../assets/svgs/auth/LoginIllustration.svg";
import Logo from "../../../assets/svgs/auth/EzLogo.svg"
import { useMutation } from "react-query"
import axiosInstance from "../../../utils/axios"
import Loader from "../../assets/whiteLoader.gif"
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useAuthContext } from "../../../context/auth"
// import { AxiosError } from "axios"

// interface IFormInput {
//     email: string,
//     password: string
// }

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

    const handleSignin = (data) => {
        console.log(data)
    }

    return (
        <div>
            {/* <div className="login w-[80%] md:w-full max-w-[425px] h-[100vh] flex items-center justify-center mx-auto text-center flex-col">
                <div className="mb-4">
                    <img className="mx-auto" src={Welcome} alt="welcome to shifthub" />
                    <h2 className="font-bold text-[24px]">Welcome to Shifthub!</h2>
                    <p className="text-grayscale-60">Your password can be found in the invite sent from your manager</p>
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
                    </div>

                    <PrimaryButton type="submit">
                        Continue
                    </PrimaryButton>
                </form>
            </div> */}

            <div className="setup w-[80%] md:w-full max-w-[425px] h-[100vh] flex items-center justify-center mx-auto flex-col">
                <div className="mr-auto mb-4">
                    <img src={Logo} alt="logo"/>
                </div>
                <h2 className="text-[20px] font-bold mr-auto">Let’s set you up</h2>
                <p className="text-grayscale-60">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

                <div className="w-full my-4">
                    <div className="flex justify-between">
                        <div className="h-[50px] w-[50px] bg-grayscale-100 text-grayscale-0 rounded-full flex items-center justify-center">
                            DA
                        </div>
                        <p className="text-lydia">Upload</p>
                    </div>
                    <div className="mt-2">
                        <p className="font-bold">Your avatar</p>
                        <p className="text-grayscale-60 text-sm">PNG or JPG no bigger than 580px wide and tall.</p>
                    </div>
                </div>

                <form className="w-full">
                    <div className="field flex flex-col items-start gap-2 mb-6">
                        <label htmlFor="firstName" className="text-sm">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="John" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                    </div>

                    <div className="field flex flex-col items-start gap-2 mb-6">
                        <label htmlFor="lastName" className="text-sm">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Doe" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                    </div>

                    <div className="field flex flex-col items-start gap-2 mb-6">
                        <label htmlFor="address" className="text-sm">Address</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Please type in your address" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                    </div>

                    <PrimaryButton type="submit">
                        Sign In
                    </PrimaryButton>
                </form>

            </div>
        </div>
    )
}

export default Login