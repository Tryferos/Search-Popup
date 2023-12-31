import { Root, createRoot } from "react-dom/client";
import { SearchWrapper } from "./SearchWrapper"
import React, { ReactElement, ReactNode, useEffect, useRef, useContext, createContext, Fragment } from 'react';
import { SearchIcon } from "./svg";
import { AnimatePresence } from "framer-motion";
import { SearchContext, SearchProps } from ".";

type Props = SearchProps & SearchContext;

export function SearchPrompt(props: Props) {
    const placeholder = props.placeholder ?? 'Search something...';
    const onClick = () => {
        props.handleOpen(true);
    }
    return (
        <div id='search-prompt' onClick={onClick}
            className={`outline cursor-pointer hover:outline-gray-400 text-gray-500 font-medium flex gap-x-4 min-w-[200px] w-10 py-2 px-2 outline-1 outline-gray-300 rounded bg-white`}>
            <SearchIcon />
            <p>{placeholder}</p>
        </div>
    )
}

export function SearchElement(props: SearchProps) {
    const [open, setIsOpen] = React.useState(true);
    const [root, setRoot] = React.useState<Root | null>(null);
    const handleOpen = (forceOpen?: boolean) => {
        setIsOpen(forceOpen ?? !open);
    }
    return (
        <Fragment>
            <SearchPrompt {...props} handleOpen={handleOpen} isOpen={open} />
            <section id='search-root' className="w-[100vw] h-[100vh] pointer-events-none fixed top-0 left-0 z-[10000]">
                <AnimatePresence>
                    {
                        open &&
                        <SearchTriggered {...props} isOpen={open} handleOpen={handleOpen} />
                    }
                </AnimatePresence>
            </section>
        </Fragment>
    )
}



export function SearchTriggered<T>(props: Props
) {
    const ref = useRef<HTMLDivElement>(null);
    const { isOpen, handleOpen } = props;
    useEffect(() => {
        if (!isOpen) return;
        const root = document.getElementById('search-root');
        if (root) {
            root.style.pointerEvents = 'all';
        }
        const onClick = (ev: MouseEvent) => {
            if (ref.current?.contains(ev.target as Node) ||
                (ev.target as HTMLElement).id == 'search-prompt' ||
                ((ev.target as HTMLElement).parentNode as HTMLElement).id == 'search-prompt') return;
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
    if (!isOpen) return null;
    return (
        <div id='search-triggered' className="w-full h-full absolute pt-[5%]">
            <div className="w-full absolute left-0 top-0 h-full blur-[40px] bg-slate-200 bg-opacity-60"></div>
            <div className="absolute flex justify-center h-[100%] w-[100%]">
                <SearchWrapper ref={ref} {...props} />
            </div>
        </div>
    )
}