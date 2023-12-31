import React, { ReactNode, useEffect } from "react";
import { createRoot, } from 'react-dom/client'
import { SearchIcon } from "./svg";
import { SearchProps, SearchWrapper } from "./SearchWrapper";
import { SearchContext, SearchElement, SearchTriggered } from "./SearchElement";


export function SearchPrompt<T>(props: SearchProps<T> & SearchContext) {
    const placeholder = props.placeholder ?? 'Search something...';
    const { isOpen, handleOpen } = props;
    const onClick = () => {
        handleOpen();
    }
    return (
        <div id='search-prompt' onClick={onClick} className="outline cursor-pointer hover:outline-gray-400 text-gray-500 font-medium flex gap-x-4 min-w-[200px] w-10 py-2 px-2 outline-1 outline-gray-300 rounded bg-white">
            <SearchIcon />
            <p>{placeholder}</p>
        </div>
    )
}