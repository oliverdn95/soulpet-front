import { Outlet } from "react-router-dom";
import banner from "../../assets/banner-home.png";

export function Home() {
    return (
        <div className="home">
            <img src={banner} alt="SoulPet Banner" className="w-100" />
            <Outlet/>
        </div>
    );
}