import Google from "../../assets/Google.svg"
import AuthLayout from "../../layouts/auth"

function Signup() {
    return (
        <AuthLayout>
            <div className="login w-96 h-auto mx-auto my-8 text-center">
                <h1 className="my-4 text-2xl">Join us!</h1>
                <button className="w-full py-2 box-border border border-solid border-[#D0D5DD] rounded-md font-normal text-sm text-[#101323] flex items-center justify-center gap-5 mb-4">
                    <img src={Google} alt="google" />
                    Login with Google
                </button>
                <div className="hr w-auto flex items-center gap-2 mb-2">
                    <hr className="w-1/4" />
                    <em className="text-sm">Or, sign up with your email</em>
                    <hr className="w-1/4" />
                </div>

                <form className="w-full">
                    <div className="field flex flex-col items-start gap-2 mb-6">
                        <label htmlFor="name" className="text-sm">Name</label>
                        <input type="text" name="name" id="name" placeholder="e.g John Doe" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                    </div>

                    <div className="field flex flex-col items-start gap-2 mb-6">
                        <label htmlFor="email" className="text-sm">Email Address</label>
                        <input type="email" name="email" id="email" placeholder="Enter your email" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                    </div>

                    <div className="flex flex-row gap-4">
                        <div className="field w-full flex flex-col items-start gap-2 mb-6">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <input type="password" name="password" id="password" placeholder="Password" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                        </div>

                        <div className="field w-full flex flex-col items-start gap-2 mb-6">
                            <label htmlFor="cpassword" className="text-sm">Confirm Password</label>
                            <input type="password" name="cpassword" id="cpassword" placeholder="Password" className="w-full box-border border border-solid border-[#D0D5DD] text-[#667085] rounded-md py-2 text-sm placeholder:text-[#667085] outline-none pl-2" />
                        </div>
                    </div>

                    <div className="remember-me flex items-center mb-4">
                        <input type="checkbox" defaultChecked name="remember" id="remember" className="w-4 h-4 mr-2 accent-lydia" />
                        <p className="text-sm">I accept the Terms and Conditions</p>
                    </div>

                    <button className="w-full py-2 border-none text-white bg-lydia rounded-md text-sm">Sign up</button>

                    <p className="text-sm mt-4 text-left text-[#667085]">Already have an account? <em className="text-lydia not-italic">Log in</em></p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Signup