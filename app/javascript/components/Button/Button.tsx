import React from 'react'

const styleClasses = {
  primary: "bg-primary-normal hover:bg-primary-dark text-white",
  secondary: "bg-gray-200 hover:bg-gray-400 text-gray-800",
  disabled: "bg-gray-200 text-gray-600 cursor-not-allowed shadow-none hover:shadow-none",
  tertiary: "shadow-none hover:shadow-none drop-shadow-sm text-gray-900 hover:text-gray-600",
}

export type ButtonProps = {
  type?: 'default' | 'primary' | 'tertiary';
  className?: string;
  children?: string | JSX.Element;
  htmlType?: 'submit' | 'button' | 'reset';
  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean
}

const ButtonBase: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
  const {
    type = 'default',
    className = '',
    htmlType = 'button',
    onClick,
    disabled,
    children,
    ...rest
  } = props
  const buttonRef = (ref as any) || React.createRef<HTMLElement>()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    if (htmlType !== 'submit') {
      e.preventDefault()
    }

    if (disabled || !onClick) return

    onClick(e)
  }

  const extraClasses = () => {
    if (disabled) return styleClasses.disabled

    if (type === 'primary') return styleClasses.primary

    if (type === 'tertiary') return styleClasses.tertiary

    return styleClasses.secondary
  }

  return <button
    {...rest}
    type={htmlType}
    disabled={disabled}
    className={`transition duration-300 ease-in-out block text-center cursor-pointer p-2 px-8 rounded shadow-lg hover:shadow-lg ${extraClasses()} ${className}`}
    onClick={handleClick}
    ref={buttonRef}
  >
    {children}
  </button>
}

export const Button = React.forwardRef<unknown, ButtonProps>(ButtonBase)
