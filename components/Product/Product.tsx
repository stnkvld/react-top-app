import { ProductProps } from "./Product.props";
import styles from './Product.module.css';
import { Card } from "../Card/Card";
import { Rating } from "../Rating/Rating";
import { Tag } from "../Tag/Tag";
import { Button } from "../Button/Button";
import { Divider } from "../Divider/Divider";
import { declOfNUm, priceRu } from "../../helpers/helpers";
import Image from "next/image";
import { ForwardedRef, forwardRef, useRef, useState } from "react";
import { Review } from "../Review/Review";
import { ReviewForm } from "../ReviewForm/ReviewForm";
import { motion } from 'framer-motion';

export const Product = motion(forwardRef(({ product, className, ...props}: ProductProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);

    const reviewRef = useRef<HTMLDivElement>(null);

    const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        reviewRef.current?.focus();
    };

    const reviewVariants = {
        visible: { opacity: 1, height: 'auto' },
		hidden: { opacity: 0, height: 0 }
    };

    return (
        <div className={className} {...props} ref={ref}>
            <Card className={styles.product}>
                <div className={styles.logo}>
                    <Image
                        src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                        alt={product.title}
                        width={70}
                        height={70}
                    />
                </div>

                <div className={styles.title}>
                    {product.title}
                </div>

                <div className={styles.price}>
                    <span className="visuallyHidden">Цена</span>
                    {product.price && priceRu(product.price)}
                    {product.oldPrice && <Tag className={styles.oldPrice} color="green">{priceRu(product.price - product.oldPrice)}</Tag>}
                </div>

                <div className={styles.credit}>
                    <span className="visuallyHidden">Кредит</span>
                    {product.credit && priceRu(product.credit)}/<span className={styles.month}>мес</span>
                </div>

                <div className={styles.rating}>
                    <span className="visuallyHidden">{'Рейтинг' + product.reviewAvg ?? product.initialRating}</span>
                    <Rating rating={product.reviewAvg ?? product.initialRating} />
                </div>

                <div className={styles.tags}>
                    {product.categories.map(c => <Tag key={c} className={styles.category} color="ghost">{c}</Tag>)}
                </div>

                <div className={styles.priceTitle} aria-hidden="true">
                    цена
                </div>

                <div className={styles.creditTitle} aria-hidden="true">
                    кредит
                </div>

                <div className={styles.rateTitle}>
                    <a href="#ref" onClick={scrollToReview}>
                        {product.reviewCount} {declOfNUm(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
                    </a>
                </div>

                <Divider className={styles.hr} />

                <div className={styles.description}>
                    {product.description}
                </div>

                <div className={styles.feature}>
                    {product.characteristics.map(c => (
                        <div className={styles.characteristics} key={c.name}>
                            <span className={styles.characteristicsName}>{c.name}</span>
                            <span className={styles.characteristicsDots}></span>
                            <span className={styles.characteristicsValue}>{c.value}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.advBlock}>
                    {product.advantages && <div className={styles.advantages}>
                        <div className={styles.advTitle}>Преимущества</div>
                        <div>{product.advantages}</div>
                    </div>}
                    {product.disadvantages && <div className={styles.disadvantages}>
                        <div className={styles.disadvTitle}>Недостатки</div>
                        <div>{product.disadvantages}</div>
                    </div>}
                </div>

                <Divider className={styles.hr} />

                <div className={styles.actions}>
                    <Button appearance='primary'>Узнать подробнее</Button>
                    <Button
                        className={styles.reviewButton}
                        appearance='ghost'
                        arrow={isReviewOpened ? 'down' : 'right'}
                        onClick={() => setIsReviewOpened(!isReviewOpened)}
                        aria-expanded={isReviewOpened}
                    >
                        Читать отзывы
                    </Button>
                </div>
            </Card>

            <motion.div
                layout
                variants={reviewVariants}
                initial="hidden"
                animate={isReviewOpened ? 'visible' : 'hidden'}
                className={styles.reviews}
            >
                <Card ref={reviewRef} color="blue" className={styles.reviewsCard} tabIndex={isReviewOpened ? 0 : -1}>
                    {product.reviews.map(r => (
                        <div key={r._id}>
                            <Review review={r} />
                            <Divider />
                        </div>
                    ))}

                    <ReviewForm productId={product._id} isOpened={isReviewOpened} />
                </Card>
            </motion.div>
        </div>
    );
}));
