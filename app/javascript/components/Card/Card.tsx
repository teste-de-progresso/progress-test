import React, { FC } from "react";

type Props = {
  title: string
  action?: () => void
  children: any
  className?: string
}
export const Card: FC<Props> = ({
  title, action, children, className = '',
}) => (
  <div className={`bg-white md:rounded shadow-sm border border-gray-300 w-full ${className}`}>
    <div className="border-b border-gray-300 bg-gray-100 md:rounded-t p-2 shadow-sm flex items-center">
      <span className="text-lg text-gray-800 flex-grow">{title}</span>
      {
        action ? action() : null
      }
    </div>
    <div className="p-4 h-full">
      {children}
    </div>
  </div>
);
