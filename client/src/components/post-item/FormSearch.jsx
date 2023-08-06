import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const FormSearch = ({ setOpenSearch = () => { } }) => {
    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    const handleSubmitSearch = (e) => {
        e.preventDefault()
        navigate(`/list-all-post?query=${query}`)
        setOpenSearch()
    }
    return (
        <>
            <form onSubmit={handleSubmitSearch} className='w-full relative my-10'>
                <input type="text" onChange={(e) => { setQuery(e.target.value) }}
                    className='w-full py-3 px-5 outline-none border rounded-lg
                                focus:shadow-[0px_0px_0px_3px_rgba(51,_159,_254,_0.5)]' placeholder='search...' />
                <button
                    onClick={() => { navigate(`/list-all-post?query=${query}`) }}
                    className='absolute right-5 top-1/2 -translate-y-2/4'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            </form>
        </>
    );
};

export default FormSearch;