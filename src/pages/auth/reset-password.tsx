import left from "../../assets/left.svg"
import AuthLayout from "../../layouts/auth"

function ResetPassword() {
  return (
    <AuthLayout>
        <div className="login w-96 h-auto mx-auto text-center">
            <h2 className="mt-24 mb-2 text-2xl">Reset password</h2>
            <p className="mb-8 text-[#667085]">Enter your email to reset your password</p>

            <form className="w-full">
                <div className="field flex flex-col items-start gap-2 mb-6">
                    <label htmlFor="email" className="text-sm">Email Address</label>
                    <input type="email" name="email" id="email" placeholder="Enter your email" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                </div>

                <button className="w-full py-2 border-none text-white bg-lydia rounded-md text-sm">Continue</button>

                <p className="text-sm mt-4 text-left text-lydia flex gap-2">
                    <img src={left} alt="left-arrow"/>
                    Go back to the previous step</p>
            </form>
        </div>
    </AuthLayout>
  )
}

export default ResetPassword;