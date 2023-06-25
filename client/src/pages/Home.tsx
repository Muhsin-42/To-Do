import { FC } from "react";
import { SearchBar, InputBars, TodoList } from "../component";

const Home: FC = () =>{
    return (
        <div className="h-screen flex  ">
            <div className="lg:w-6/12 md:w-7/12 sm:w-11/12 w-10/12 my-10 mx-auto primary-gradient py-8  rounded-2xl shadow-2xl flex flex-col justify-between">
                <SearchBar/>
                <TodoList/>
                <InputBars/>
            </div>
        </div>
    )
}

export default Home;