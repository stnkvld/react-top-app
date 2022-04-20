import { AppContext } from '../../context/app.context';
import { useContext, useState } from 'react';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interface';
import styles from './Menu.module.css';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { firstLevelMenu } from '../../helpers/helpers';
import { motion, useReducedMotion } from 'framer-motion';
import { KeyboardEvent } from "react";

export const Menu = (): JSX.Element => {
    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();
    const shouldReduceMotion = useReducedMotion();
    const router = useRouter();

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu?.map(m => {
            if (m._id.secondCategory === secondCategory) {
                setAnnounce(m.isOpened ? 'closed' : 'opened');
                m.isOpened = !m.isOpened;
            }
            return m;
        }));
    };

    const variants = {
        visible: {
            marginBottom: 20,
            transition: shouldReduceMotion ? {} : {
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        },
        hidden: {
            marginBottom: 0
        }
    };

    const variantsChildren = {
        visible: {
			opacity: 1,
			maxHeight: 58
		},
		hidden: { opacity: shouldReduceMotion ? 1 : 0, maxHeight: 0 }
    };

    const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
        if (key.code === 'Space' || key.code === 'Enter') {
            key.preventDefault();
            openSecondLevel(secondCategory);
        }
    };

    const buildFirstLevel = () => {
        return (
            <ul className={styles.firstBlock}>
                {firstLevelMenu.map(m => (
                    <li className={styles.firstElement} key={m.route} aria-expanded={m.id === firstCategory}>
                        <Link href={`/${m.route}`}>
                            <a className={cn(styles.firstLevel, {
                                [styles.firstLevelActive]: m.id === firstCategory
                            })}>
                                {m.icon}
                                <span>{m.name}</span>
                            </a>
                        </Link>

                        {m.id === firstCategory && buildSecondLevel(m)}
                    </li>
                ))}
            </ul>
        );
    };

    const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
        return (
            <ul className={styles.secondBlock}>
                {menu?.map(m => {
                    if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
                        m.isOpened = true;
                    }

                    return (
                        <li key={m._id.secondCategory}>
                            <button
                                className={styles.secondLevel}
                                onClick={() => openSecondLevel(m._id.secondCategory)}
                                onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)}
                                aria-expanded={m.isOpened}
                            >
                                {m._id.secondCategory}
                            </button>
                            <motion.ul
                                layout
                                variants={variants}
                                initial={m.isOpened ? 'visible' : 'hidden'}
                                animate={m.isOpened ? 'visible' : 'hidden'}
                                className={styles.secondLevelBlock}
                            >
                                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
                            </motion.ul>
                        </li>
                    );
                })}
            </ul>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
        return (
            pages.map(p => (
                <motion.li className={styles.thirdLevelWrapper} key={p._id} variants={variantsChildren}>
                    <Link href={`/${route}/${p.alias}`}>
                        <a
                            className={cn(styles.thirdLevel, {
                                [styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath
                            })}
                            tabIndex={isOpened ? 0 : -1}
                            aria-current={`/${route}/${p.alias}` === router.asPath}
                        >
                            {p.category}
                        </a>
                    </Link>
                </motion.li>
            ))
        );
    };

    return (
        <nav className={styles.menu} role="navigation">
            {announce && <span role="log" className="visuallyHidden">
                {announce === 'opened' ? 'развернуто' : 'свернуто'}
            </span>}
            {buildFirstLevel()}
        </nav>
    );
};
