import Google from "../../assets/svgs/auth/Google.svg"
import AuthLayout from "../../layouts/auth"
import PrimaryButton from "../../components/button/primary-button"
import SecondaryButton from "../../components/button/secondary-button"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import constants from "../../utils/constants"
import FormError from "../../components/form/form-error"
import { useNavigate } from "react-router-dom"

interface IFormInput {
    name: string,
    email: string,
    password: string,
    confirm_password: string
}

const schema = yup
    .object({
        fullName: yup.string().required(constants.FIELD_REQUIRED_MESSAGE),
        email: yup.string().required(constants.FIELD_REQUIRED_MESSAGE).email("This field should contain a valid email"),
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

function Signup() {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(schema) });

    const handleSignup = (data: IFormInput) => {
        console.log(data)

        localStorage.setItem("signup", JSON.stringify(data))

        navigate("/onboarding/")
    }

    const socialMediaSignup = () => {
        console.log("inactive")
    }

    return (
        <AuthLayout>
            <div className="login w-[80%] md:w-full max-w-[425px] h-auto mx-auto my-8 text-center">
                <h1 className="my-4 text-2xl">Join us!</h1>
                <SecondaryButton onClick={socialMediaSignup} className="mb-3 !py-[11px]">
                    <div className="flex items-center justify-center gap-5">
                        <img src={Google} alt="google" />
                        <span>Login with Google</span>
                    </div>
                </SecondaryButton>
                <div className="hr w-auto flex items-center gap-2 mb-2">
                    <hr className="w-1/4" />
                    <em className="text-sm">Or, sign up with your email</em>
                    <hr className="w-1/4" />
                </div>

                <form className="w-full" onSubmit={handleSubmit(handleSignup)}>
                    <div className="field flex flex-col items-start gap-2 mb-6">
                        <label htmlFor="fullName" className="text-sm">Name</label>
                        <input
                            {...register("fullName")}
                            type="text"
                            name="fullName"
                            id="fullName"
                            placeholder="e.g John Doe"
                            className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                        {errors.fullName && <FormError error={errors.fullName.message}></FormError>}
                    </div>

                    <div className="field flex flex-col items-start gap-2 mb-6">
                        <label htmlFor="email" className="text-sm">Email Address</label>
                        <input
                            {...register("email")}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                        {errors.email && <FormError error={errors.email.message}></FormError>}
                    </div>

                    <div className="flex flex-col md:flex-row md:gap-4">
                        <div className="field w-full flex flex-col items-start gap-2 mb-6">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <input
                                {...register("password")}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                            {errors.password && <FormError error={errors.password.message}></FormError>}
                        </div>

                        <div className="field w-full flex flex-col items-start gap-2 mb-6">
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
                    </div>

                    <div className="remember-me flex items-center mb-4">
                        <input type="checkbox" defaultChecked name="remember" id="remember" className="w-4 h-4 mr-2 accent-lydia" />
                        <p className="text-sm">I accept the Terms and Conditions</p>
                    </div>

                    <PrimaryButton type="submit">Sign up</PrimaryButton>

                    <p className="text-sm mt-4 text-left text-[#667085]">Already have an account? <em className="text-lydia not-italic">Log in</em></p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Signup