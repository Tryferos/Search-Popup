import React, { useState, useEffect, Fragment, useRef } from 'react';
import { SearchProps } from '.';
import { ArrowIcon, Bolt, SearchIcon } from './svg';

type SearchContentProps = {
    query: string;
} & SearchProps
const HIGHLIGHT_SYNTAX = '/hightlight/';
export function SearchContent(props: SearchContentProps) {
    const { query } = props;
    const [sections, setSections] = useState(props.sections ?? []);
    const highlightFoundItems = props.highlight?.highlight ?? true;
    const highlightColor = props.highlight?.color ?? '#38bdf8';
    const darkMode = props.darkMode ?? false;
    const openInNewTab = props.openInNewTab ?? true;
    const showRecent = props.showRecent ?? true;

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

    }, [query])

    if (query.length == 0) return null;
    return (
        <Fragment>
            {
                sections.map((section, i) => {
                    return (
                        <li key={i} className=''>
                            <h3 className='text-lg py-2 font-medium'>{section.title}</h3>
                            {
                                section.items.map((item, j) => {
                                    return (
                                        <a key={j} href={item.href ?? '#'} target={openInNewTab ? '_blank' : '_self'}>
                                            <div
                                                className='flex group px-4 hover:bg-sky-500 rounded hover:text-white justify-between items-center border-b-[1px] border-b-gray-200 py-2'>
                                                <div className='flex gap-x-4 items-center w-[80%]'>
                                                    <figure className='w-[5%] min-w-[24px]'>
                                                        {
                                                            (!item.icon && !section.icon) ? <Bolt /> :
                                                                <img className='w-6 h-6' src={(item.icon ?? section.icon) as unknown as string} alt={item.title} />
                                                        }
                                                    </figure>
                                                    <div className='flex flex-col w-[calc(95%-16px)]'>
                                                        <h3 className='font-medium truncate text-lg first-letter:uppercase'>
                                                            <HighlightText text={item.title} query={query}
                                                                highlightFoundItems={highlightFoundItems} color={highlightColor} />
                                                        </h3>
                                                        <p className='text-gray-600 group-hover:text-gray-100 truncate first-letter:uppercase'>
                                                            <HighlightText text={item.content} query={query}
                                                                highlightFoundItems={highlightFoundItems} color={highlightColor} />
                                                        </p>
                                                    </div>
                                                </div>
                                                <ArrowIcon />
                                            </div>
                                        </a>
                                    )
                                })
                            }

                        </li>
                    )
                })
            }
        </Fragment>
    )
}

function HighlightText({ text: aText, query, highlightFoundItems, color }:
    { text: string; query: string; highlightFoundItems: boolean; color: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        if (!ref || !ref.current || !highlightFoundItems) return;
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
        const substring = aText.substring(
            query.length < 32 ? Math.max(0, endingIndex - 56) : index,
            query.length < 32 ? Math.min(aText.length, 64 + endingIndex) : aText.length
        );
        if (substring.length >= 78) return substring.concat('...');
        return substring;
    }
    return (
        <>
            {!foundTitle && text}
            {foundTitle && titleNormalBefore}
            {foundTitle && <span ref={ref} className='group-hover:text-white'>{titleHighlighted}</span>}
            {foundTitle && titleNormalAfter}
        </>
    )
}