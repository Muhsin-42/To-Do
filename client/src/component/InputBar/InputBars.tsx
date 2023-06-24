import { FC } from "react";


const InputBars: FC = () =>{
    return(
        <>
            <div className="flex flex-col w-10/12 mx-auto mb-3 gap-3">
                <input type="text" className="w-11/12 mx-auto py-3 px-5 shadow-2xl rounded-2xl focus:outline-none" placeholder="Enter Task" />
                <div className="w-11/12 mx-auto  flex justify-between">
                    <input type="text" className="w-8/12 py-3 px-5 focus:outline-none shadow-2xl rounded-2xl" placeholder="Description (optional)" />
                    <button className="bg-purple-500 shadow-2xl text-white py-3 px-5 font-bold rounded-3xl w-3/12">ADD TODO</button>
                </div>
                    
            </div>
        </>
    )
}

export default InputBars;