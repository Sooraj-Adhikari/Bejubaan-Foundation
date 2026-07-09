import { forwardRef } from 'react';
import { cn } from '../../utils/cn.js';
import './Button.css';

/**
 * Bejubaan Ann Seva Foundation – Button Component
 *
 * @param {object}  props
 * @param {'primary'|'secondary'|'accent'|'outline'|'ghost'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.fullWidth=false]
 * @param {boolean} [props.loading=false]
 * @param {boolean} [props.disabled=false]
 * @param {React.ReactNode} [props.icon]
 * @param {'left'|'right'} [props.iconPosition='left']
 * @param {string}  [props.className]
 * @param {React.ReactNode} props.children
 * @param {React.ComponentProps<'button'>} rest
 */
const Button = forwardRef(function Button(
  {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    disabled = false,
    icon,
    iconPosition = 'left',
    className,
    children,
    type = 'button',
    ...rest
  },
  ref
) {
  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      className={cn(
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        fullWidth && 'btn--full',
        loading && 'btn--loading',
        className
      )}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && (
        <span className="btn__spinner" aria-hidden="true">
          <span className="btn__spinner-dot" />
        </span>
      )}
      {icon && iconPosition === 'left' && !loading && (
        <span className="btn__icon btn__icon--left" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="btn__text">{children}</span>
      {icon && iconPosition === 'right' && !loading && (
        <span className="btn__icon btn__icon--right" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
