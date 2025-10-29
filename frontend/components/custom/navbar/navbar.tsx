import { ClickUpLogo } from "@/public/svg/logo"
import './style.css'

const Navbar = () => {
    return (
        <nav className="navbar_outer_div">
            <div className="navbar_inner_div">
                <ClickUpLogo width="100" height="25"/>
                <div className="navbar_right_div" >
                   <button className="navbar_righ_div_button bg-[#f0f0f0] ">Login</button>
                   <button className="navbar_righ_div_button bg-black text-white">Sign Up</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
