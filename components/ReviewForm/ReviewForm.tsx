import { ReviewFormProps } from "./ReviewForm.props";
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import { Rating } from "../Rating/Rating";
import { Input } from "../Input/Input";
import { Textarea } from "../Textarea/Textarea";
import { Button } from "../Button/Button";
import CloseIcon from './close.svg';
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { API } from "../../helpers/api";
import { useState } from "react";

export const ReviewForm = ({ productId, isOpened, className, ...props}: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm();
    const [isSuccess,  setIsSuccess] = useState<boolean>(false);
    const [isError,  setIsError] = useState<string>();

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId });
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setIsError('Что-то пошло не так');
            }
        } catch (err) {
            if (err instanceof Error) {
                setIsError(err.message);
			}
        }
    };

    return (
        <form
            className={cn(styles.reviewForm, className)}
            {...props}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                {...register('name', { required: { value: true, message: 'Заполните имя' } })}
                placeholder="Имя"
                error={errors.name}
                tabIndex={isOpened ? 0 : -1}
                aria-invalid={errors.name ? true : false}
            />
            <Input
                {...register('title', { required: { value: true, message: 'Заполните заголовок' } })}
                placeholder="Заголовок отзыва"
                className={styles.title}
                error={errors.title}
                tabIndex={isOpened ? 0 : -1}
                aria-invalid={errors.title ? true : false}
            />

            <div className={styles.rating}>
                <span>Оценка:</span>
                <Controller
                    control={control}
                    name="rating"
                    rules={{ required: { value: true, message: 'Укажите рейтинг' } }}
                    render={({ field }) => (
                        <Rating
                            ref={field.ref}
                            rating={field.value}
                            setRating={field.onChange}
                            isEditable
                            error={errors.rating}
                            tabIndex={isOpened ? 0 : -1}
                        />
                    )}
                />
            </div>

            <Textarea
                {...register('description', { required: { value: true, message: 'Заполните описание' } })}
                className={styles.description}
                placeholder="Текст отзыва"
                error={errors.description}
                tabIndex={isOpened ? 0 : -1}
                aria-label="Текст отзыва"
                aria-invalid={errors.description ? true : false}
            />

            <div className={styles.submit}>
                <Button appearance="primary" tabIndex={isOpened ? 0 : -1} onClick={() => clearErrors()}>Отправить</Button>
                <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
            </div>

            {isSuccess && <div className={cn(styles.success, styles.panel)}>
                <div role="alert" className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div>
                    Спасибо, ваш отзыва будет опубликован после проверки
                </div>
                <button className={styles.close} onClick={() => setIsSuccess(false)} aria-label="Закрыть оповещение">
                    <CloseIcon />
                </button>
            </div>}

            {isError && <div role="alert" className={cn(styles.error, styles.panel)}>
                Что-то пошло не так, попробуйте обновить страницу
                <button className={styles.close} onClick={() => setIsError(undefined)} aria-label="Закрыть оповещение">
                    <CloseIcon />
                </button>
            </div>}
        </form>
    );
};
