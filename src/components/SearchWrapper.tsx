import React, { ReactNode, forwardRef, useEffect, useState } from 'react';
import '../tailwind.css'
import { motion, AnimatePresence } from 'framer-motion'
import { ExitIcon, SearchIcon } from './svg';
import { SearchContext, SearchProps } from '.';
import { SearchContent } from './SearchContent';

export const SearchWrapper = forwardRef(SearchWrapperRef);

function SearchWrapperRef(props: SearchProps & SearchContext, ref: React.ForwardedRef<HTMLDivElement>) {
    const [query, setQuery] = useState('');
    const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(ev.target.value);
    }
    const placeholder = props.placeholder ?? 'Search something...';
    const darkMode = props.darkMode ?? false;

    return (
        <section ref={ref} className={`w-[60%] outline outline-1 outline-indigo-100 *:px-6 py-2 rounded-md shadow-box bg-white h-[60vh] flex flex-col`}>
            <div className='flex items-center gap-x-6 text-gray-600 pb-2 pt-1'>
                <SearchIcon />
                <input placeholder={placeholder} type='text' className='w-full font-medium outline-none py-2' value={query} onChange={onChange} />
                <ExitIcon onClick={() => props.handleOpen(false)} />
            </div>
            <AnimatePresence>
                <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`pt-2 pb-6 border-b-[1px] h-[75%] gap-y-2 flex flex-col dark:scrollbar-dark scrollbar border-b-gray-200 border-t-[1px] border-t-gray-200 overflow-y-auto`}
                >
                    <SearchContent query={query} {...props} placeholder={placeholder} darkMode={darkMode} />
                </motion.ul>
            </AnimatePresence>
        </section>
    )
}