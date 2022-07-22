import React, { FC } from 'react'

type ListItemIconProps = {
  icon: JSX.Element
}

const ListItemIcon: FC<ListItemIconProps> = ({ icon }) => {
  return (
    <div className="grid place-items-center pr-3">
      {icon}
    </div>
  )
}

type ListItemTextProps = {
  text?: string
}

const ListItemText: FC<ListItemTextProps> = ({ text }) => {
  return (
    <div className="pl-2">
      <p>
        {text ?? ''}
      </p>
    </div>
  )
}

type ListItemProps = {
  icon?: JSX.Element
  text?: string
}

export const ListItem: FC<ListItemProps> = ({ icon, text, children }) => {
  return (
    <li className="flex py-2 border-t border-b  border-gray-200">
      {icon && <ListItemIcon icon={icon} />}
      {text && <ListItemText text={text} />}
      {children}
    </li>
  )
}

type ListProps = {
  className?: string
  children: React.ReactNode
}

export const List: FC<ListProps> = ({
  className = '',
  children,
}) => {
  return (
    <ul className={`list-none p-0 m-0 ${className}`}>
      {children}
    </ul>
  )
}