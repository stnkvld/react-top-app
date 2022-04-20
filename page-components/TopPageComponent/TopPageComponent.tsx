import { Advantages, HhData, Htag, Product, Sort, Tag } from "../../components";
import { TopPageComponentProps } from "./TopPageComponent.props";
import styles from './TopPageComponent.module.css';
import { TopLevelCategory } from "../../interfaces/page.interface";
import { SortEnum } from "../../components/Sort/Sort.props";
import { ForwardedRef, forwardRef, useEffect, useReducer } from "react";
import { sortReducer } from "./sort.reducer";
import { motion, useReducedMotion } from 'framer-motion';

export const TopPageComponent = motion(forwardRef(({ page, products, firstCategory }: TopPageComponentProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(sortReducer, {
        products,
        sort: SortEnum.RATING
    });

    const setSort = (sort: SortEnum) => {
        dispatchSort({ type: sort });
    };

    useEffect(() => {
        dispatchSort({ type: 'reset', initialState: products });
    }, [products]);

    const shouldReduceMotion = useReducedMotion();

    return (
        <div className={styles.wrapper} ref={ref}>
            <div className={styles.title}>
                <Htag tag='h1'>{page.title}</Htag>
                {sortedProducts && <Tag color='gray' size='m' aria-label={products.length + ' элементов'}>{sortedProducts.length}</Tag>}
                <Sort sort={sort} setSort={setSort} />
            </div>

            <div role="list">
				{sortedProducts && sortedProducts.map(p => (<Product role="listitem" key={p._id} product={p} layout={shouldReduceMotion ? false : true} />))}
			</div>

            <div className={styles.hhTitle}>
                <Htag tag='h2'>Вакансии - {page.category}</Htag>
                <Tag color='red' size='m'>hh.ru</Tag>
            </div>

            {page.hh && firstCategory === TopLevelCategory.COURSES && <HhData {...page.hh} />}
            {page.advantages && page.advantages.length > 0 && <>
                <Htag tag='h2'>Преимущества</Htag>
                <Advantages advantages={page.advantages} />
            </>}
            {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{__html: page.seoText}} />}
            <Htag tag='h2'>Получаемые навыки</Htag>
            {page.tags.map(t => <Tag key={t} color='primary'>{t}</Tag>)}
        </div>
    );
}));
