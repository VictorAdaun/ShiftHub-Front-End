import Logo from "../assets/EzLogo.svg"

type LayoutProps = {
    children: React.ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function AuthLayout(props: LayoutProps) {
    return (
        <div className="w-full">
            <div className="nav w-full h-20 flex items-center">
                <div className="ml-20">
                    <img src={Logo} alt="Instagram" />
                </div>
            </div>
            <>
                {props.children}
            </>
        </div>
    )
}

export default AuthLayout;