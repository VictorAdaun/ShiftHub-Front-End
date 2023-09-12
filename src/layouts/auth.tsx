import Logo from "../assets/svgs/auth/EzLogo.svg"

type LayoutProps = {
    children: React.ReactNode
}

function AuthLayout(props: LayoutProps) {
    return (
        <div className="w-full">
            <div className="nav w-full h-20 flex items-center">
                <div className="ml-20">
                    <img src={Logo} alt="Shifthub logo" />
                </div>
            </div>
            <>
                {props.children}
            </>
        </div>
    )
}

export default AuthLayout;