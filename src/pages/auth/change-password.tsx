import left from "../../assets/left.svg"
import AuthLayout from "../../layouts/auth"
import PrimaryButton from "../../components/button/primary-button";
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import constants from "../../utils/constants"
import FormError from "../../components/form/form-error"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useMutation } from "react-query"
import axiosInstance from "../../utils/axios"
import { AxiosError } from "axios"
import { useSearchParams } from "react-router-dom"
import Loader from "../../assets/whiteLoader.gif"
import { useNavigate } from "react-router-dom";

type IFormInput = {
    password: string,
    confirmPassword: string;
}

const schema = yup
    .object({
        password: yup.string().required(constants.FIELD_REQUIRED_MESSAGE).min(8, 'Not long enough')
            .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
            .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
            .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
            .matches(/^(?=.*[!@#%&])/, 'Must contain at least one special character'),
        confirmPassword: yup
            .string()
            .required(constants.FIELD_REQUIRED_MESSAGE)
            .test(
                "confirmPassword",
                "Passwords do not match",
                (value, validationContext) => {
                    const { parent } = validationContext;
                    return parent["password"] === value;
                }
            ),
    })
    .required();


function ChangePassword() {

    const [searchParams, setSearchParams] = useSearchParams();


    const navigate = useNavigate()


    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) });

    const passwordChangeRequest = (data) => {
        return axiosInstance.post(`/api/login/reset-password-complete/?passwordToken=${searchParams.get("passwordToken")}&userId=${searchParams.get("userId")}`, data)
    }

    const passwordChangeMutation = useMutation({
        mutationFn: passwordChangeRequest,
        onSuccess: (data) => {
            console.log(data.data.result.message)

            toast.success(data.data.result.message)

            reset()

            setTimeout(() => {
                navigate("/login/email")
            }, 1000);
        },
        onError: (err) => {
            console.log(err)

            if (err instanceof AxiosError) {
                toast.error(err.response.data?.message || "An error occured")
            }
        }
    })

    const handleChangePassword = (data: IFormInput) => {
        console.log(data)

        passwordChangeMutation.mutate(
            {
                ...data
            })
    }

    return (
        <AuthLayout>
            <ToastContainer />
            <div className="login w-[80%] md:w-full max-w-[425px] h-auto mx-auto text-center">
                <h2 className="mt-24 mb-2 text-2xl">Change password</h2>
                <p className="mb-8 text-[#667085]">Enter your new password</p>

                <form className="w-full" onSubmit={handleSubmit(handleChangePassword)}>
                    <div className="field flex flex-col items-start gap-2 mb-6">
                        <label htmlFor="password" className="text-sm">New Password</label>
                        <input
                            {...register("password")}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your new password"
                            className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                        {errors.password && <FormError error={errors.password.message}></FormError>}
                    </div>

                    <div className="field flex flex-col items-start gap-2 mb-6">
                        <label htmlFor="confirmPassword" className="text-sm">Confirm Password</label>
                        <input
                            {...register("confirmPassword")}
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                        {errors.confirmPassword && <FormError error={errors.confirmPassword.message}></FormError>}
                    </div>

                    <PrimaryButton type="submit">{passwordChangeMutation.isLoading ? <img className="h-[30px] w-[30px] mx-auto" src={Loader} alt="loader" /> : "Proceed"}</PrimaryButton>

                    <p 
                    onClick={()=> navigate("/login/reset-password")}
                    className="text-sm mt-4 text-left text-lydia flex gap-2 cursor-pointer">
                        <img src={left} alt="left-arrow" />
                        Go back to the previous step</p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default ChangePassword;