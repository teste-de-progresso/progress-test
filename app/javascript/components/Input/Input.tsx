import React, {ChangeEvent} from 'react'
import {v4 as uuid} from 'uuid'

export type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  label?: string
}

const ButtonBase: React.ForwardRefRenderFunction<unknown, Props> = (props, ref) => {
  const {
    className = '',
    onChange,
    label,
    ...rest
  } = props
  const inputRef = (ref as any) || React.createRef<HTMLElement>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return

    onChange(e)
  }

  const id = uuid()

  return (
    <span>
      {label ?? <label htmlFor={id}>{label}</label>}
      <input
        {...rest}
        id={id}
        className={`block rounded p-1 w-full border-gray-400 border shadow-sm ${className}`}
        onChange={handleChange}
        ref={inputRef}
      />
    </span>
  )
}

export const Input = React.forwardRef<unknown, Props>(ButtonBase)
