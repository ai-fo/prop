import React, { HTMLAttributes, forwardRef } from 'react';
import styles from './Card.module.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'bordered';
  padding?: 'none' | 'small' | 'medium' | 'large';
  interactive?: boolean;
  glowOnHover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'medium',
      interactive = false,
      glowOnHover = false,
      className = '',
      children,
      ...rest
    },
    ref
  ) => {
    const classes = [
      styles.card,
      styles[variant],
      styles[`padding-${padding}`],
      interactive && styles.interactive,
      glowOnHover && styles.glowOnHover,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...rest}>
        <div className={styles.content}>{children}</div>
        <div className={styles.liquidBorder} aria-hidden="true" />
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className = '', children, ...rest }, ref) => {
    return (
      <div ref={ref} className={`${styles.header} ${className}`} {...rest}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className = '', children, ...rest }, ref) => {
    return (
      <div ref={ref} className={`${styles.body} ${className}`} {...rest}>
        {children}
      </div>
    );
  }
);

CardBody.displayName = 'CardBody';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', children, ...rest }, ref) => {
    return (
      <div ref={ref} className={`${styles.footer} ${className}`} {...rest}>
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';