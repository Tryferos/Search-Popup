import React, { useState, useEffect, Fragment } from 'react';
import { SearchProps } from '.';
import { ArrowIcon, Bolt, SearchIcon } from './svg';
import bolt from './svg/bolt.svg';

type SearchContentProps = {
    query: string;
} & SearchProps
export function SearchContent(props: SearchContentProps) {
    const { query } = props;
    const [sections, setSections] = useState(props.sections ?? []);
    const highlightFoundItems = props.highlight?.highlight ?? true;
    const highlightColor = props.highlight?.color ?? '#38bdf8';
    const openInNewTab = props.openInNewTab ?? true;
    useEffect(() => {

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
                                                    <figure className='w-[5%]'>
                                                        {
                                                            (!item.icon && !section.icon) ? <Bolt /> :
                                                                <img src={(item.icon ?? section.icon) as unknown as string} alt={item.title} />
                                                        }
                                                    </figure>
                                                    <div className='flex flex-col w-[calc(95%-16px)]'>
                                                        <h3 className='font-medium text-lg'>{item.title}</h3>
                                                        <p className='text-gray-600 group-hover:text-gray-100 truncate'>{item.content}</p>
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