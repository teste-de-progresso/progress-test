import React, { FC, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

type Props = {
  isOpen: boolean
  setIsOpen: (state: boolean) => void
  buttons?: any,
  title: string,
  className?: string,
}

export const Modal: FC<Props> = ({
  isOpen,
  setIsOpen,
  children,
  buttons,
  title,
  className = '',
}) => {
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        as="div"
        className={`fixed inset-0 z-10 overflow-y-auto ${className}`}
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-50" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
            </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 mt-2 mb-4"
              >
                {title}
              </Dialog.Title>
              <div className="mt-2">
                {children}
              </div>

              {buttons &&
                <div className="mt-4 grid grid-flow-col gap-3">
                  {buttons}
                </div>
              }
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
