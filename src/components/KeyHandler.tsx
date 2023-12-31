
import React, { useRef, useEffect, useState } from "react"
import { EnterIcon, UpIcon } from "./svg";
export enum KeyType {
    ESC = 'esc',
    ENTER = 'enter',
    K = 'K',
    UP = 'UP',
    DOWN = 'DOWN'
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
        if (keyType == KeyType.UP) return 'arrowup';
        if (keyType == KeyType.DOWN) return 'arrowdown';
        return keyType;
    }
    const preventKeys = ['k']
    useEffect(() => {
        //* Handle control key
        if (!control) {
            setControlDown(false);
            if (controlDownRef.current) window.removeEventListener('keydown', controlDownRef.current as any);
            if (controlUpRef.current) window.removeEventListener('keyup', controlUpRef.current as any);
            return;
        }
        controlDownRef.current = (ev: KeyboardEvent) => {
            if (ev.target == document.body && preventKeys.some(k => k == ev.key.toLowerCase())) {
                ev.preventDefault();
            }
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

    //* Handle normal key
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
            className="outline outline-1 dark:bg-slate-600 uppercase dark:outline-slate-700 dark:hover:outline-slate-400 h-6 flex items-center justify-center hover:outline-gray-400 outline-gray-300 rounded-[8px] bg-slate-100 px-1 font-mono cursor-pointer">
            <div className="text-gray-700 text-xs font-semibold dark:text-gray-300 *:flex *:items-center *:select-none">
                {
                    keyType == KeyType.UP ? <div ><UpIcon /><p>Next</p></div> : keyType ==
                        KeyType.DOWN ? <div ><UpIcon down={true} /><p>Previous</p></div> :
                        keyType == KeyType.ENTER ? <div className="p-1"><EnterIcon /></div> :
                            <p>{(control ? 'Ctrl+' : '').concat(keyType)}</p>
                }
            </div>
        </div>
    )
}