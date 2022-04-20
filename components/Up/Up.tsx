import styles from './Up.module.css';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useScrollY } from '../../hooks/useScrollY';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';

export const Up = ({ ...props}): JSX.Element => {
    const controls = useAnimation();
    const y = useScrollY();

    useEffect(() => {
        controls.start({ opacity: y / document.body.scrollHeight });
    }, [y, controls]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <motion.div
            className={styles.up}
            animate={controls}
            {...props}
            initial={{opacity: 0}}
        >
            <ButtonIcon appearance='primary' icon='up' aria-label="Наверх" onClick={scrollToTop} />
        </motion.div>
    );
};
