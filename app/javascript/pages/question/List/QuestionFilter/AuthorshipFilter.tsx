import React, { Dispatch, FC, SetStateAction } from "react";

type Props = {
  setChanged: Dispatch<SetStateAction<boolean>>
  register: any
}

export const AuthorshipFilter: FC<Props> = ({ setChanged, register }) => {
  const options = [
    {
      label: "Qualquer",
      value: 'null'
    },
    {
      label: "Própria",
      value: 'true'
    },
    {
      label: "Terceiro",
      value: 'false',
    }
  ]

  return (
    <div className="mt-2 sm:mt-0 flex flex-col">
      <h3 className="font-bold mb-1">Autoria</h3>
      <div
        className="grid grid-cols-2 sm:flex sm:flex-col"
        key={`filter-group-authorship`}
      >
        {options.map(({ value, label }, index) => (
          <span className="mr-1 mb-2 sm:mb-0 sm:mr-0" key={label}>
            <input
              ref={register('authorship')}
              type="radio"
              value={value}
              id={value}
              defaultChecked={!index}
            />
            <label htmlFor={value} className="ml-2">
              {label}
            </label>
          </span>
        ))}
      </div>
    </div>
  )
}