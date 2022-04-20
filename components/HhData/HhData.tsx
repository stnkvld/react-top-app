import { HhDataProps } from './HhData.props';
import styles from './HhData.module.css';
import { Card } from '../Card/Card';
import RateIcon from './rate.svg';
import { priceRu } from '../../helpers/helpers';

export const HhData = ({ count, juniorSalary, middleSalary, seniorSalary }: HhDataProps): JSX.Element => {
    return (
        <div className={styles.hh}>
            <Card className={styles.count}>
                <div className={styles.title}>Всего вакансий</div>
                <div className={styles.countValue}>{count}</div>
            </Card>

            <Card className={styles.salary}>
                <ul className={styles.salaryList}>
                    <li>
                        <div className={styles.title}>Начальный</div>
                        {juniorSalary && <div className={styles.salaryValue}>{priceRu(juniorSalary)}</div>}
                        <div className={styles.rate}>
                            <RateIcon className={styles.filled} />
                            <RateIcon />
                            <RateIcon />
                        </div>
                    </li>
                    <li>
                        <div className={styles.title}>Средний</div>
                        {middleSalary && <div className={styles.salaryValue}>{priceRu(middleSalary)}</div>}
                        <div className={styles.rate}>
                            <RateIcon className={styles.filled} />
                            <RateIcon className={styles.filled} />
                            <RateIcon />
                        </div>
                    </li>
                    <li>
                        <div className={styles.title}>Профессионал</div>
                        {seniorSalary && <div className={styles.salaryValue}>{priceRu(seniorSalary)}</div>}
                        <div className={styles.rate}>
                            <RateIcon className={styles.filled} />
                            <RateIcon className={styles.filled} />
                            <RateIcon className={styles.filled} />
                        </div>
                    </li>
                </ul>
            </Card>
        </div>
    );
};
