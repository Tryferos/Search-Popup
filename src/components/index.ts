import '../tailwind.css'
import {ReactElement} from 'react'

export {SearchElement} from './SearchElement'

type Section = {
    title: string;
    items: Item[];
    icon?: string;
    iconSize?: 'small' | 'medium' | 'large';
}
export const LOCAL_STORAGE_KEY = 'search-history-search-component'
export type Item = {
    content: string;
    title: string;
    href: string;
    icon?: ReactElement | string;
}

export type Animation = {
    animate?: boolean;
    duration?: 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6;
}

export type Highlight = {
    highlight?: boolean;
    color?: string;
}

export type SearchProps = {
    placeholder?: string;
    darkMode?: boolean;
    promptSize?: string;
    sections: Section[];
    shadow?: boolean;
    highlight?: Highlight;
    animation?: Animation;
    showRecent?: boolean;
    children?: ReactElement;
    openInNewTab?: boolean;
    onSearch?: (query: string) => void;
    onOpenTrigger?: (isOpen: boolean) => void;
}

export type SearchContext = {
    isOpen: boolean;
    handleOpen: (forceOpen?: boolean) => void;
}