import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export interface ButtonProps extends
    Omit<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'onAnimationStart' | 'onDragEnd' | 'onDragStart' | 'onDrag' | 'ref'> {
    children: ReactNode;
    appearance: 'primary' | 'ghost';
    arrow?: 'right' | 'down' | 'none';
}
