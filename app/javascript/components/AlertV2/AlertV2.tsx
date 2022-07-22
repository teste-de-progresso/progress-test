import React, { FC } from 'react'
import { MdDone, MdError, MdInfo, MdWarning } from 'react-icons/md'

type AlertSeverity = 'error' | 'warning' | 'info' | 'success'

const ICONS = {
  error: <MdError />,
  warning: <MdWarning />,
  info: <MdInfo />,
  success: <MdDone />
}

const COLOR_CLASSES = {
  error: 'bg-red-300 border-red-600 text-red-800',
  warning: 'bg-orange-300 border-orange-600 text-orange-800',
  info: 'bg-blue-300 border-blue-600 text-blue-800',
  success: 'bg-green-300 border-green-600 text-green-800',
}

export type Props = {
  severity?: AlertSeverity
  text?: string
}

export const AlertV2: FC<Props> = ({
  severity = 'info',
  text = '',
}) => (
  <div className={`flex rounded shadow p-4 mx-auto my-2 ${COLOR_CLASSES[severity]}`}>
    <div className="text-xl my-auto pr-2">
      {ICONS[severity]}
    </div>
    <span>
      {text}
    </span>
  </div>
)

