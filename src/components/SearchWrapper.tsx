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
    const animate = props.animation?.animate ?? true;
    const duration = props.animation?.duration ?? 0.3;

    return (
        <motion.section
            initial={{ opacity: animate ? 0 : 1, scale: animate ? 0.4 : 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: duration / 1.5 }}
            exit={{ opacity: animate ? 0 : 1, scale: animate ? 0.4 : 1 }}
            ref={ref} className={`w-[60%] dark:bg-slate-800 min-w-[350px] outline outline-1 outline-indigo-100 *:px-6 py-2 rounded-md shadow-box dark:shadow-box-dark dark:outline-black bg-white h-[60vh] flex flex-col`}>
            <div className='flex items-center gap-x-6 text-gray-600 dark:text-gray-200 pb-2 pt-1'>
                <SearchIcon />
                <input placeholder={placeholder} type='text' className='w-full dark:placeholder:text-gray-200 dark:bg-slate-800 bg-white dark:text-white font-medium outline-none py-2' value={query} onChange={onChange} />
                <ExitIcon onClick={() => props.handleOpen(false)} />
            </div>
            <AnimatePresence>
                <ul
                    className={`pt-2 pb-6 border-b-[1px] h-[80%] dark:border-b-gray-500 dark:border-t-gray-500 gap-y-2 flex flex-col dark:scrollbar-dark scrollbar border-b-gray-200 border-t-[1px] border-t-gray-200 overflow-y-auto`}
                >
                    <SearchContent animation={{ animate: animate }} query={query} {...props} placeholder={placeholder} darkMode={darkMode} />
                </ul>
            </AnimatePresence>
        </motion.section>
    )
}