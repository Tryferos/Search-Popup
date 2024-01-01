import { Root, createRoot } from "react-dom/client";
import { SearchWrapper } from "./SearchWrapper"
import React, { ReactElement, ReactNode, useEffect, useRef, useContext, createContext, Fragment, useState } from 'react';
import { SearchIcon } from "./svg";
import { AnimatePresence } from "framer-motion";
import { SearchContext, SearchProps } from ".";

type Props = SearchProps & SearchContext;

export function SearchPrompt(props: Props) {
    const placeholder = props.placeholder ?? 'Search something...';
    const ref = useRef<HTMLDivElement>(null);
    const { darkMode } = props;
    const onClick = () => {
        props.handleOpen(true);
    }
    useEffect(() => {
        if (!ref || !ref.current) return;
        const parentRef = ref.current.parentElement;
        if (!parentRef) return;
        if (darkMode) {
            parentRef.classList.add('dark');
            return;
        }
        parentRef.classList.remove('dark');

    }, [darkMode, ref])
    return (
        <div ref={ref} id='search-prompt' onClick={onClick}
            className={`outline cursor-pointer dark:bg-slate-800 dark:text-white dark:outline-black dark:hover:bg-slate-900 hover:outline-gray-900 text-gray-600 flex gap-x-4 min-w-[200px] w-10 py-2 px-2 outline-1 outline-gray-600 rounded bg-white`}>
            <SearchIcon />
            <p>{placeholder}</p>
        </div>
    )
}

export function SearchElement(props: SearchProps) {
    const [open, setIsOpen] = useState(false);
    const darkMode = props.darkMode ?? false;
    const handleOpen = (forceOpen?: boolean) => {
        console.log('trigger', forceOpen);
        setIsOpen(forceOpen ?? !open);
    }
    useEffect(() => {
        props.onOpenTrigger && props.onOpenTrigger(open);
    }, [open])
    return (
        <Fragment>
            {
                props.children ? <div id='search-prompt' onClick={() => handleOpen(true)}>{props.children}</div> :
                    <SearchPrompt {...props} darkMode={darkMode} handleOpen={handleOpen} isOpen={open} />
            }
            <section id='search-root' className="w-[100vw] h-[100vh] pointer-events-none fixed top-0 left-0 z-[10000]">
                <AnimatePresence>
                    {
                        open &&
                        <SearchTriggered {...props} darkMode={darkMode} isOpen={open} handleOpen={handleOpen} />
                    }
                </AnimatePresence>
            </section>
        </Fragment>
    )
}



export function SearchTriggered<T>(props: Props
) {
    const ref = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);
    const { isOpen, handleOpen } = props;
    const darkMode = props.darkMode ?? false;
    useEffect(() => {
        if (!isOpen) return;
        const root = document.getElementById('search-root');
        if (root) {
            root.style.pointerEvents = 'all';
        }
        const onClick = (ev: MouseEvent) => {
            const prompt = document.getElementById('search-prompt');
            if (!prompt) return;
            if (ref.current?.contains(ev.target as Node) ||
                (ev.target as HTMLElement).id == 'search-prompt' ||
                prompt.contains(ev.target as HTMLElement)) return;
            handleOpen(false);
        }
        document.addEventListener('click', onClick);
        return () => {
            const root = document.getElementById('search-root');
            if (root) {
                root.style.pointerEvents = 'none';
            }
            document.removeEventListener('click', onClick);
        }
    }, [])
    useEffect(() => {
        if (darkMode) {
            parentRef.current?.classList.add('dark');
            return;
        }
        parentRef.current?.classList.remove('dark');

    }, [darkMode, parentRef])
    if (!isOpen) return null;
    return (
        <div id='search-triggered' className="w-full h-full absolute pt-[5%] ">
            <div className="w-full absolute left-0 top-0 h-full bg-slate-100 bg-opacity-50"></div>
            <div ref={parentRef} className="absolute flex justify-center h-[100%] w-[100%]">
                <SearchWrapper ref={ref} {...props} />
            </div>
        </div>
    )
}