import React, { FC, ReactNode, forwardRef, useEffect, useState, useRef, Ref } from 'react';
import '../tailwind.css'
import { motion, AnimatePresence } from 'framer-motion'
import { ExitIcon, SearchIcon } from './svg';
import { Key, KeyType } from './KeyHandler'
import { SearchContext, SearchProps } from '.';
import { SearchContent } from './SearchContent';

export const SearchWrapper = forwardRef(SearchWrapperRef);

function SearchWrapperRef(props: SearchProps & SearchContext, ref: React.ForwardedRef<HTMLDivElement>) {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const selectedRef = useRef<HTMLAnchorElement>();
    const listRef = useRef<HTMLUListElement>(null);
    const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(ev.target.value);
    }
    const placeholder = props.placeholder ?? 'Search something...';
    const darkMode = props.darkMode ?? false;
    const animate = props.animation?.animate ?? true;
    const duration = props.animation?.duration ?? 0.3;
    const keyNavigation = props.keyNavigation


    const handleSelected = (add: number) => {
        //*We want to use -1 as a special value to indicate that we are not selecting anything
        setSelectedIndex((prev) => prev < 0 ? 1000 : prev + add);
    }

    //* Reset selected index when mouse is over the list so we can use the mouse to select,
    //* and don't mess up with the keyboard selection and display multiple selected items
    useEffect(() => {
        if (!listRef.current) return;
        const list = listRef.current;
        const listener = (ev: MouseEvent) => {
            setSelectedIndex(-1);
        }
        list.addEventListener('mouseover', listener);
        return () => {
            list.removeEventListener('mouseover', listener);
        }
    }, [listRef])


    const handleClose = () => props.handleOpen(false);
    const handleEnter = () => {
        if (!listRef.current) return;
        const selected = listRef.current.querySelector('[data-slot="selected"') as HTMLDivElement;
        if (!selected) return;
        const parent = selected.parentElement as HTMLAnchorElement;
        if (!parent) return;
        parent.click();
    }
    return (
        <motion.section
            initial={{ opacity: animate ? 0 : 1, scale: animate ? 0.4 : 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: duration / 1.5 }}
            exit={{ opacity: animate ? 0 : 1, scale: animate ? 0.4 : 1 }}
            ref={ref} className={`w-[60%] dark:bg-slate-800 min-w-[350px] relative outline outline-1 outline-indigo-100 *:px-6 py-2 pb-0 rounded-md shadow-box dark:shadow-box-dark dark:outline-black bg-white h-[60vh] flex flex-col`}>
            <div className='flex items-center gap-x-6 text-gray-600 dark:text-gray-200 pb-2 pt-1'>
                <SearchIcon />
                <input autoFocus placeholder={placeholder} type='text' className='w-full dark:placeholder:text-gray-200 dark:bg-slate-800 bg-white dark:text-white font-medium outline-none py-2' value={query} onChange={onChange} />
                {
                    keyNavigation ?
                        <Key keyType={KeyType.ESC} onClick={handleClose} />
                        :
                        <ExitIcon onClick={handleClose} />
                }
            </div>
            <AnimatePresence>
                <ul ref={listRef}
                    className={`pt-2 pb-6 border-b-[1px] h-[80%] dark:border-b-gray-500 dark:border-t-gray-500 gap-y-2 flex flex-col dark:scrollbar-dark scrollbar border-b-gray-200 border-t-[1px] border-t-gray-200 overflow-y-auto`}
                >
                    <SearchContent selectedIndex={selectedIndex} animation={{ animate: animate }} query={query} {...props} placeholder={placeholder} darkMode={darkMode} />
                </ul>
            </AnimatePresence>
            {props.keyNavigation && <Navigation handleSelected={handleSelected} handleSelect={handleEnter} />}
        </motion.section>
    )
}

const Navigation: FC<{ handleSelected: (add: number) => void; handleSelect: () => void }> = (props) => {
    const handleUp = () => { props.handleSelected(-1) }
    const handleDown = () => { props.handleSelected(1) }
    const handleEnter = () => { props.handleSelect() }
    return (
        <ul className='h-[10%] justify-between flex items-center w-[90%] ml-[5%]'>
            <li className='flex gap-x-6'>
                <Key keyType={KeyType.UP} onClick={handleUp} />
                <Key keyType={KeyType.DOWN} onClick={handleDown} />
            </li>
            <li><Key keyType={KeyType.ENTER} onClick={handleEnter} /></li>

        </ul>
    )
}