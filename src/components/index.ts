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

type Animation = {
    animate?: boolean;
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
}

export type SearchContext = {
    isOpen: boolean;
    handleOpen: (forceOpen?: boolean) => void;
}