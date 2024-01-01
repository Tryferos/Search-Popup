import '../tailwind.css'
import {ReactElement} from 'react'

export {SearchElement} from './SearchElement'

type Section = {
    title: string;
    items: Item[];
    icon?: string;
}

type Item = {
    content: string;
    title: string;
    href: string;
    icon?: ReactElement | string;
}

export type Animation = {
    animate?: boolean;
    duration?: 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6;
}

type Highlight = {
    highlight?: boolean;
    color?: string;
}

export type SearchProps = {
    placeholder?: string;
    darkMode?: boolean;
    promptSize?: string;
    sections: Section[];
    highlight?: Highlight;
    animation?: Animation;
    showRecent?: boolean;
    openInNewTab?: boolean;
    onSearch?: (query: string) => void;
}

export type SearchContext = {
    isOpen: boolean;
    handleOpen: (forceOpen?: boolean) => void;
}