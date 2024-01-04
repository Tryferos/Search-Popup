import React, { FC, Fragment, useEffect, useState } from 'react'
import { Item, LOCAL_STORAGE_KEY } from '.';
import { AnimatePresence, motion } from 'framer-motion'
import { ExitIcon } from './svg';
type RecentProps = {
    animate: boolean;
    duration: number;
    selectedIndex: number;
    openInNewTab: boolean;
}
export type RecentItem = {
    item: Item;
    sectionTitle: string;
}
export const Recent: React.FC<RecentProps> = (props) => {
    const [recent, setRecent] = useState<RecentItem[]>([]);
    const { animate, duration, selectedIndex, openInNewTab } = props;
    const nothingSelected = selectedIndex == -1;

    useEffect(() => {
        const jsonLocalStore = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (jsonLocalStore == null) return;
        const storedItems: RecentItem[] = JSON.parse(jsonLocalStore);
        setRecent(storedItems);
    }, [])

    const removeItem = (item: Item, sectionTitle: string) => {
        const jsonLocalStore = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (jsonLocalStore == null) return;
        const storedItems: RecentItem[] = JSON.parse(jsonLocalStore);
        const items = storedItems.filter(i => {
            return i.item.title != item.title ? true : sectionTitle != i.sectionTitle
        });
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
        setRecent(items);
    }

    return (
        <Fragment>
            <AnimatePresence>
                {
                    recent.length == 0 ?
                        <div className='text-center py-10 font-medium text-gray-500 text-lg'>
                            No recent searches
                        </div>
                        :
                        <section
                            className='flex flex-col'>
                            <div className='flex'>
                                <motion.h3
                                    initial={{ opacity: animate ? 0 : 1 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: duration }}
                                    exit={{ opacity: animate ? 0 : 1 }}
                                    className='text-lg dark:text-white py-2 font-medium px-2 rounded-md'>Recent
                                </motion.h3>
                            </div>
                            {
                                recent.map((vItem, i) => {
                                    const { item } = vItem;
                                    const mappedIndex = selectedIndex % recent.length
                                    const isSelected = mappedIndex == i;
                                    return (
                                        <motion.a
                                            target={openInNewTab ? '_blank' : ''}
                                            initial={{ opacity: animate ? 0 : 1 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: duration }}
                                            exit={{ opacity: animate ? 0 : 1 }}
                                            key={i} href={item.href}>
                                            <li data-slot={isSelected ? 'selected' : ''}
                                                className={`border-b-slate-200 data-[slot=selected]:dark:bg-slate-700
                                                ${nothingSelected && 'hover:bg-slate-100 dark:hover:bg-slate-700'}  data-[slot=selected]:bg-slate-100
                                              dark:text-white dark:border-b-gray-500   justify-between flex border-b-[1px] rounded-md py-4 px-2`}>
                                                <p className='text-lg'>{item.title}</p>
                                                <ExitIcon onClick={() => removeItem(item, vItem.sectionTitle)} />

                                            </li>
                                        </motion.a>
                                    )
                                })
                            }
                        </section>
                }
            </AnimatePresence>
        </Fragment>
    )

};