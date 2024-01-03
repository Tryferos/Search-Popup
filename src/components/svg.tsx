import React from "react"

export function SearchIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
    )
}

export function ExitIcon({ onClick }: { onClick?: (ev: React.MouseEvent) => void }) {
    const handleClick = (ev: React.MouseEvent) => {
        ev.preventDefault();
        ev.stopPropagation();
        onClick && onClick(ev);
    }
    return (
        <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 cursor-pointer hover:text-red-400 dark:hover:text-red-500 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>

    )
}

export function ArrowIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>

    )
}

export function EnterIcon() {
    return (
        <svg className="w-6 h-6" viewBox="0 0 20 20"><g stroke="currentColor" fill="none" fillRule="evenodd"
            strokeLinecap="round" strokeLinejoin="round"><path d="M18 3v4c0 2-2 4-4 4H2"></path><path d="M8 17l-6-6 6-6"></path></g></svg>
    )
}

export function UpIcon({ down = false }: { down?: boolean }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${down && 'rotate-180'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
        </svg>

    )
}

export function Bolt() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="group-hover:fill-white dark:fill-white dark:group-hover:fill-sky-400 dark:group-hover:text-sky-400 scale-[0.8]">
            <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
        </svg>
    )
}