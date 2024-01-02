import React, { useState, useEffect, Fragment, useRef } from 'react';
import { SearchProps, Animation, Item, LOCAL_STORAGE_KEY } from '.';
import { ArrowIcon, Bolt } from './svg';
import { AnimatePresence, motion } from 'framer-motion'
import { Recent, RecentItem } from './Recent';

type SearchContentProps = {
    query: string;
} & SearchProps
const HIGHLIGHT_SYNTAX = '/hightlight/';
export function SearchContent(props: SearchContentProps) {
    const { query, animation } = props;
    const { animate, duration } = animation as Animation;
    const [sections, setSections] = useState(props.sections ?? []);
    const highlightFoundItems = props.highlight?.highlight ?? true;
    const openInNewTab = props.openInNewTab ?? true;
    const showRecent = props.showRecent ?? true;
    const shadow = props.shadow ?? true;

    const findItem = (content: string, title: string) => {
        const regex = new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi');
        const found = content.match(regex) || title.match(regex);
        return found;
    }
    useEffect(() => {
        //Show only sections that have at least a single item that matches the query
        const filteredSection = props.sections?.filter(section => {
            const filteredItems = section.items.filter(item => {
                return findItem(item.content, item.title);
            })
            return filteredItems.length > 0;
        });
        //Show only items that matches the query
        const mappedSections = filteredSection.map(section => {
            const filteredItems = section.items.filter(item => {
                return findItem(item.content, item.title);
            })
            return {
                ...section,
                items: filteredItems
            }
        });

        setSections(mappedSections ?? []);
        props.onSearch?.(query);

    }, [query])

    const handleClick = (item: Item, sectionTitle: string) => {
        let storedItems: RecentItem[] = []
        const jsonLocalStore = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (jsonLocalStore != null) {
            storedItems = JSON.parse(jsonLocalStore);
        }
        if (storedItems.find(i => i.item.title == item.title && sectionTitle == i.sectionTitle)) return;
        storedItems.push({ item: item, sectionTitle: sectionTitle });
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedItems));
    }


    return (
        <Fragment>
            <AnimatePresence>
                {
                    showRecent && query.length == 0 &&
                    <Recent animate={animate as boolean} duration={duration as number} />
                }
                {(sections.length != 0 && query.length != 0) ?
                    sections.map((section, i) => {
                        const size = section.iconSize ?? 'medium';
                        const iconSize = size == 'small' ? 'size-6 min-w-[24px]' : size == 'medium' ? 'size-8 min-w-[36px]' : 'size-12 min-w-[52px]';
                        return (
                            <li
                                key={i} className='flex flex-col'>
                                <div className='flex'>
                                    <motion.h3
                                        initial={{ opacity: animate ? 0 : 1 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: duration }}
                                        exit={{ opacity: animate ? 0 : 1 }}
                                        className='text-lg dark:text-white py-2 font-medium px-4 rounded-md'>{section.title}
                                    </motion.h3>
                                </div>
                                {
                                    section.items.map((item, j) => {
                                        return (
                                            <motion.a
                                                onClick={() => handleClick(item, section.title)}
                                                className='relative transition-all '
                                                initial={{ opacity: animate ? 0 : 1 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ duration: duration }}
                                                exit={{ opacity: animate ? 0 : 1 }}
                                                key={j} href={item.href ?? '#'} target={openInNewTab ? '_blank' : '_self'}>
                                                <div
                                                    className={`flex dark:bg-slate-800 dark:border-b-slate-600 dark:text-white group ${shadow && 'shadow-box-down hover:shadow-none dark:shadow-none'} hover:bg-sky-400 dark:hover:bg-white dark:hover:text-black px-4 transition-all relative rounded-md hover:text-white justify-between items-center border-b-[1px] border-b-gray-200 py-2`}>
                                                    <div className='flex gap-x-4 items-center w-[80%]'>
                                                        <figure className={`w-[5%] ${iconSize} flex items-center justify-center`}>
                                                            {
                                                                (!item.icon && !section.icon) ? <Bolt /> :
                                                                    <img className={iconSize} src={(item.icon ?? section.icon) as unknown as string} alt={item.title} />
                                                            }
                                                        </figure>
                                                        <div className='flex flex-col w-[calc(95%-16px)]'>
                                                            <h3 className='font-medium truncate text-lg first-letter:uppercase'>
                                                                <HighlightText text={item.title} query={query}
                                                                    highlightFoundItems={highlightFoundItems} color={props.highlight?.color} />
                                                            </h3>
                                                            <p className='text-gray-600 group-hover:text-gray-100 truncate first-letter:uppercase'>
                                                                <HighlightText text={item.content} query={query}
                                                                    highlightFoundItems={highlightFoundItems} color={props.highlight?.color} />
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <ArrowIcon />
                                                </div>
                                            </motion.a>
                                        )
                                    })
                                }

                            </li>
                        )
                    }) : null
                }
            </AnimatePresence>
        </Fragment>
    )
}


function HighlightText({ text: aText, query, highlightFoundItems, color }:
    { text: string; query: string; highlightFoundItems: boolean; color?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if (!ref || !ref.current || !highlightFoundItems || !color) return;
        ref.current.style.color = color;
    }, [ref])
    const regex = new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'gi');
    const index = aText.search(regex);
    const vText = aText.length > 32 ? getPartialText() : aText;
    const text = vText.replace(regex, `${HIGHLIGHT_SYNTAX}${query}${HIGHLIGHT_SYNTAX}`);
    const titleStart = text.indexOf(HIGHLIGHT_SYNTAX) + HIGHLIGHT_SYNTAX.length;
    const titleEnd = text.indexOf(HIGHLIGHT_SYNTAX, titleStart);
    const titleHighlighted = text.substring(titleStart, titleEnd);
    const titleNormal = text.replaceAll(HIGHLIGHT_SYNTAX, '');
    const titleNormalBefore = titleNormal.substring(0, titleStart - HIGHLIGHT_SYNTAX.length);
    const titleNormalAfter = titleNormal.substring(titleEnd - HIGHLIGHT_SYNTAX.length);
    const foundTitle = index != -1;
    function getPartialText() {
        if (index == -1) return aText;
        const endingIndex = index + query.length;
        const start = query.length < 32 ? Math.max(0, endingIndex - 32) : index;
        const end = query.length < 32 ? Math.min(aText.length, 64 + endingIndex) : aText.length;
        const substring = aText.substring(
            start,
            end
        );
        if (substring.length >= 78) return substring.concat('...');
        return substring;
    }
    return (
        <span className='dark:text-gray-300 dark:group-hover:text-gray-600'>
            {!foundTitle && text}
            {foundTitle && titleNormalBefore}
            {foundTitle && <span ref={ref} className='group-hover:text-red-400 text-sky-400'>{titleHighlighted}</span>}
            {foundTitle && titleNormalAfter}
        </span>
    )
}