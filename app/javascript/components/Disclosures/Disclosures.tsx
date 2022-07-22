import React, { FC, Fragment } from 'react'
import { Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'

type Item = {
  title?: string | JSX.Element
  body?: string | JSX.Element
  icon?: JSX.Element
}

type Props = {
  items: Item[]
}

export const Disclosures: FC<Props> = ({
  items
}) => {
  return (
    <div className="w-full grid grid-cols-1 gap-3">
      <div className="w-full max-w-md p-2 mx-auto bg-white rounded-2xl">
        {items.map((item) => (
          <Disclosure as="div" className="my-2 rounded border">
            {({ open }) => (
              <>
                <Disclosure.Button as={Fragment}>
                  <button className="flex p-2 bg-gray-200 w-full justify-between">
                    <div className="grid place-items-center">
                      {item.icon}
                    </div>
                    <span className="pl-2">
                      {item.title}
                    </span>
                    <ChevronDownIcon
                      className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-gray-800`}
                    />
                  </button>
                </Disclosure.Button>
                <Transition
                  show={open}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >

                  <Disclosure.Panel
                    className="p-2 bg-gray-100"
                  >
                    {item.body ?? 'Nenhum comentário.'}
                  </Disclosure.Panel>
                </Transition>
              </>
            )}
          </Disclosure>
        )
        )}
      </div>
    </div>
  )
}
