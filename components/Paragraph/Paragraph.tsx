import { ParagraphProps } from "./Paragraph.props";
import styles from './Paragraph.module.css';
import cn from 'classnames';

export const Paragraph = ({ size = 'm', children, className, ...props}: ParagraphProps): JSX.Element => {
    return (
        <p
            className={cn(styles.paragraph, {
                [styles['s']]: size === 's',
                [styles['m']]: size === 'm',
                [styles['l']]: size === 'l',
            })}
            {...props}
        >
            {children}
        </p>
    );
};
