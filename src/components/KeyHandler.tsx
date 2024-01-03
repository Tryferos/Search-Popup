
import React, { useRef, useEffect, useState } from "react"
export enum KeyType {
    ESC = 'esc',
    ENTER = 'enter',
    K = 'K'
}
export function Key({ keyType, onClick, control: vControl }: { keyType: KeyType, onClick: (ev: React.MouseEvent) => void, control?: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const controlDownRef = useRef<(ev: KeyboardEvent) => void>();
    const controlUpRef = useRef<(ev: KeyboardEvent) => void>();
    const keyRef = useRef<(ev: KeyboardEvent) => void>();

    const [controlDown, setControlDown] = useState(false);
    const control = vControl ?? false;
    const mapKeys = () => {
        if (keyType == KeyType.ESC) return 'escape';
        return keyType;
    }
    useEffect(() => {
        if (!control) {
            setControlDown(false);
            if (controlDownRef.current) window.removeEventListener('keydown', controlDownRef.current as any);
            if (controlUpRef.current) window.removeEventListener('keyup', controlUpRef.current as any);
            return;
        }
        controlDownRef.current = (ev: KeyboardEvent) => {
            if (ev.target == document.body) ev.preventDefault();
            if (ev.repeat) return;
            if (ev.key.toLowerCase() == 'control') {
                setControlDown(true);
            }
        }
        controlUpRef.current = (ev: KeyboardEvent) => {
            if (ev.key.toLowerCase() == 'control') {
                setControlDown(false);
            }
        }
        window.addEventListener('keydown', controlDownRef.current);
        window.addEventListener('keyup', controlUpRef.current);
        return () => {
            window.removeEventListener('keydown', controlDownRef.current as any);
            window.removeEventListener('keyup', controlUpRef.current as any);
        }
    }, [controlDownRef, controlUpRef, control])
    useEffect(() => {
        if (!ref.current) return;
        const body = document.body;
        const handleKey = (ev: KeyboardEvent) => {
            if (ev.key.toLowerCase() == 'control') return;
            if (ev.key.toLowerCase() == mapKeys().toLowerCase()) {
                if (control ? !controlDown : false) return;
                ref.current?.click();
            }
        }
        keyRef.current = handleKey;
        body.addEventListener('keyup', keyRef.current);
        return () => {
            body.removeEventListener('keyup', keyRef.current as any);
        }
    }, [keyRef, keyType, controlDown])
    return (
        <div ref={ref}
            onClick={onClick}
            className="outline outline-1 dark:bg-slate-600 dark:outline-slate-500 dark:hover:outline-slate-400 h-6 flex items-center justify-center hover:outline-gray-500 outline-gray-400 rounded-[8px] bg-slate-200 px-1 font-mono cursor-pointer">
            <p className="text-gray-700 font-medium dark:text-gray-200">
                {control && 'Ctrl+'}{keyType}
            </p>
        </div>
    )
}