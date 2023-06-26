import { FC, SetStateAction, useState } from "react";
import axios from '../../utils/axios'
import { todoSearchUrl } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { setTodos } from "../../store/TodoSlice/TodoSlice";

const SearchBar: FC = ()=>{

    const [keyword,setKeyword] = useState('');
    const dispatch = useDispatch();

    const handleSearch = async (e: { target: { value: SetStateAction<string>; }; })=>{
        setKeyword(e.target.value);
        try {
            let res = await axios.get(todoSearchUrl+`/${e.target.value}`);
            dispatch(setTodos(res.data));        
        } catch (error) {
            
        }
    }

    return(
        <>
            <div className="search-bar">
                <input value={keyword} onChange={handleSearch} type="text" className="py-3 px-3 m-auto focus:outline-none  w-9/12 block rounded-3xl  shadow-2xl" placeholder="Search items" />
            </div>
        </>
    )
}

export default SearchBar;