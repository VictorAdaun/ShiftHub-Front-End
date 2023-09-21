import left from "../../assets/left.svg"
import AuthLayout from "../../layouts/auth"
import PrimaryButton from "../../components/button/primary-button";
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import constants from "../../utils/constants"
import FormError from "../../components/form/form-error"

type IFormInput = {
  email: string
}

const schema = yup
  .object({
    email: yup.string().required(constants.FIELD_REQUIRED_MESSAGE).email("This field should contain a valid email")
  })
  .required();


function ResetPassword() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  const handleResetPassword = (data: IFormInput) => {
    console.log(data)
  }

  return (
    <AuthLayout>
      <div className="login w-[80%] md:w-full max-w-[425px] h-auto mx-auto text-center">
        <h2 className="mt-24 mb-2 text-2xl">Reset password</h2>
        <p className="mb-8 text-[#667085]">Enter your email to reset your password</p>

        <form className="w-full" onSubmit={handleSubmit(handleResetPassword)}>
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

          <PrimaryButton type="submit">Continue</PrimaryButton>

          <p className="text-sm mt-4 text-left text-lydia flex gap-2">
            <img src={left} alt="left-arrow" />
            Go back to the previous step</p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default ResetPassword;