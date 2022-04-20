import { SortEnum, SortProps } from './Sort.props';
import styles from './Sort.module.css';
import cn from 'classnames';
import SortIcon from './sort.svg';

export const Sort = ({ sort, setSort, className, ...props }: SortProps): JSX.Element => {
    return (
        <div
			className={cn(styles.sort, className)}
			{...props}
		>
			<div id="sort" className={styles.sortName}>Сортировка</div>
			<button
				id="rating"
				onClick={() => setSort(SortEnum.RATING)}
				className={cn({
					[styles.active]: sort === SortEnum.RATING
				})}
				aria-selected={sort == SortEnum.RATING}
				aria-labelledby="sort rating"
			>
				<SortIcon className={styles.sortIcon} /> По рейтингу
			</button>

			<button
				id="price"
				onClick={() => setSort(SortEnum.PRICE)}
				className={cn({
					[styles.active]: sort === SortEnum.PRICE
				})}
				aria-selected={sort == SortEnum.PRICE}
				aria-labelledby="sort price"
			>
				<SortIcon className={styles.sortIcon} /> По цене
			</button>
		</div>
    );
};
