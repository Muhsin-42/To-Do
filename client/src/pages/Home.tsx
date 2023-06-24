import { FC } from "react";
import { SearchBar, InputBars } from "../component";

const Home: FC = () =>{
    return (
        <div className=" h-screen flex  bg-purple-50">
            <div className="lg:w-6/12 my-10 mx-auto bg-white  rounded-2xl shadow-2xl flex flex-col justify-between">
                <SearchBar/>

                <InputBars/>
            </div>
        </div>
    )
}

export default Home;