import cn from 'classnames'
import React from 'react'

import FieldError from '../FieldError'

import styles from './FieldLayout.module.scss'

export type FieldLayoutBaseProps = {
  // These props are display options that are applicable to all fields using FieldLayout
  label: string
  name: string
  description?: string
  maxLength?: number
  isLabelHidden?: boolean
  isOptional?: boolean
  className?: string
  classNameLabel?: string
  classNameFooter?: string
  smallLabel?: boolean
  hideFooter?: boolean
  inline?: boolean
}

type FieldLayoutProps = FieldLayoutBaseProps & {
  // These props are derived from the formik state and passed by the parent component
  children: React.ReactNode
  showError: boolean
  error?: string
  count?: number
}

/* istanbul ignore next: DEBT, TO FIX */
const FieldLayout = ({
  children,
  label,
  isLabelHidden = false,
  className,
  name,
  showError = false,
  error,
  count = undefined,
  maxLength = undefined,
  isOptional = false,
  smallLabel,
  hideFooter = false,
  inline = false,
  classNameLabel,
  classNameFooter,
  description,
}: FieldLayoutProps): JSX.Element => {
  const hasError = showError && !!error
  const hasCounter = count !== undefined && maxLength !== undefined

  return (
    <div
      className={cn(styles['field-layout'], className, {
        [styles['field-layout-small-label']]: smallLabel,
        [styles['field-layout-inline']]: inline,
      })}
      data-testid={`wrapper-${name}`}
    >
      <div
        className={cn(styles['field-layout-label-container'], {
          [styles['label-hidden']]: isLabelHidden,
          classNameLabel,
        })}
      >
        <label className={cn(styles['field-layout-label'])} htmlFor={name}>
          {label}
          {isOptional && (
            <span className={styles['field-layout-optional']}>Optionnel</span>
          )}
        </label>
        {description && (
          <span className={styles['field-layout-input-description']}>
            {description}
          </span>
        )}
      </div>
      <div className={styles['field-layout-content']}>
        <div>{children}</div>

        {!hideFooter && (hasError || hasCounter) && (
          <div className={cn(classNameFooter, styles['field-layout-footer'])}>
            {hasError && (
              <div className={styles['field-layout-error']}>
                <FieldError name={name}>{error}</FieldError>
              </div>
            )}
            {hasCounter && (
              <span
                className={styles['field-layout-counter']}
                data-testid={`counter-${name}`}
              >
                {count}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default FieldLayout
