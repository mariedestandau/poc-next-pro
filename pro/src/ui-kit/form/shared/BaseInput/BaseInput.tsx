import cn from 'classnames'
import React, { ForwardedRef, forwardRef } from 'react'

import styles from './BaseInput.module.scss'

interface IBaseInputProps
  extends Partial<React.InputHTMLAttributes<HTMLInputElement>> {
  className?: string
  hasError?: boolean
  filterVariant?: boolean
  rightIcon?: JSX.Element | null
  rightButton?: JSX.Element | null
}

const BaseInput = forwardRef(
  (
    {
      className,
      hasError,
      filterVariant,
      name,
      rightIcon,
      rightButton,
      ...props
    }: IBaseInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    const hasIcon = !!rightIcon
    const hasButton = !!rightButton

    return rightIcon || rightButton ? (
      <div className={styles['base-input-wrapper']}>
        <input
          {...props}
          aria-invalid={hasError}
          {...(hasError ? { 'aria-describedby': `error-${name}` } : {})}
          className={cn(
            styles['base-input'],
            styles['base-input-with-right-icon'],
            {
              [styles['has-error']]: hasError,
              [styles['filter-variant']]: filterVariant,
            },
            className
          )}
          id={name}
          name={name}
          ref={ref}
        />
        <span
          className={cn({
            [styles['base-input-right-icon']]: hasIcon,
            [styles['base-input-right-button']]: hasButton,
            [styles['filter-variant']]: filterVariant,
          })}
        >
          {hasIcon && rightIcon}
          {hasButton && rightButton}
        </span>
      </div>
    ) : (
      <input
        {...props}
        aria-invalid={hasError}
        {...(hasError ? { 'aria-describedby': `error-${name}` } : {})}
        className={cn(
          styles['base-input'],
          {
            [styles['has-error']]: hasError,
            [styles['filter-variant']]: filterVariant,
          },
          className
        )}
        id={name}
        name={name}
        ref={ref}
      />
    )
  }
)

//BaseInput.displayName = 'BaseInput'
export default BaseInput
