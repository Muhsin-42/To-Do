import { FC } from "react";


const SearchBar: FC = ()=>{
    return(
        <>
            <div className="search-bar mt-4">
                <input type="text" className="py-3 px-3 m-auto focus:outline-none  w-9/12 block rounded-3xl  shadow-2xl" placeholder="Search items" />
            </div>
        </>
    )
}

export default SearchBar;