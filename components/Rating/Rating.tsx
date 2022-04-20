import { RatingProps } from "./Rating.props";
import styles from './Rating.module.css';
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
import cn from "classnames";
import StarIcon from "./star.svg";
import { KeyboardEvent } from "react";

export const Rating = forwardRef(({ isEditable = false, rating, setRating, tabIndex, error, ...props}: RatingProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));
    const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        constructRating(rating);
    }, [rating, tabIndex]);

    const computeFocus = (r: number, i: number): number => {
        if (!isEditable) {
            return -1;
        }

        if (!rating && i === 0) {
            return tabIndex ?? 0;
        }

        if (r === i + 1) {
            return tabIndex ?? 0;
        }

        return -1;
    };

    const constructRating = (currentRating: number) => {
        const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
            return (
                <span
                    ref={r => ratingArrayRef.current?.push(r)}
                    className={cn({
                        [styles.filled]: i < currentRating,
                        [styles.editable]: isEditable
                    })}
                    tabIndex={computeFocus(rating, i)}
                    onMouseEnter={() => changeDisplay(i + 1)}
                    onMouseLeave={() => changeDisplay(rating)}
                    onClick={() => onClick(i + 1)}
                    onKeyDown={handleKey}
                    role={isEditable ? 'slider' : ''}
                    aria-valuenow={rating}
                    aria-valuemax={5}
                    aria-valuemin={1}
                    aria-label={isEditable ? 'Укажите рейтинг' : ('рейтинг ' + rating)}
                    aria-invalid={error ? true : false}
                >
                    <StarIcon />
                </span>
            );
        });

        setRatingArray(updatedArray);
    };

    const changeDisplay = (i: number) => {
        if (!isEditable) return;

        constructRating(i);
    };

    const onClick = (i: number) => {
        if (!isEditable || !setRating) return;

        setRating(i);
    };

    const handleKey = (evt: KeyboardEvent) => {
        if (!isEditable || !setRating) return;

        if (evt.code === 'ArrowRight' || evt.code === 'ArrowUp') {
            if (!rating) {
                setRating(1);
            } else {
                evt.preventDefault();
                setRating(rating < 5 ? rating + 1 : 5);
            }
            ratingArrayRef.current[rating]?.focus();
        } else if (evt.code === 'ArrowLeft' || evt.code === 'ArrowDown') {
            evt.preventDefault();
            setRating(rating > 1 ? rating - 1 : 1);
        }
    };

    return (
        <div ref={ref} className={cn(styles.ratingWrapper, {
            [styles.error]: error
        })}>
            <ul className={cn(styles.stars)} {...props}>
                {ratingArray.map((r, i) => (
                    <li className={cn(styles.star)} key={i}>
                        {r}
                    </li>
                ))}
            </ul>
            {error && (
                <span role="alert" className={styles.errorMessage}>{error.message}</span>
            )}
        </div>
    );
});
