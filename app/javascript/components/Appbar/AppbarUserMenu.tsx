import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { useCurrentUser } from '../../contexts';
import { SessionRoutePaths } from '../../routes';
import { RootState } from '../../services/store';
import { turnOff } from '../../services/store/unsavedChanges';
import { classNames } from '../../utils';
import { localFetch } from '../../utils/localFetch';
import { notEmpty } from '../../utils/notEmpty';
import { UserRole } from '../../__generated__/graphql-schema';
import { CurrentUserAvatar } from "../CurrentUserAvatar";
import { Dialog } from '../Dialog';

export const AppbarUserMenu = () => {
  const { user } = useCurrentUser();
  const history = useHistory();
  const [confirmLogout, setConfirmLogout] = useState(false)
  const [newPath, setNewPath] = useState<string>()
  const unsavedChanges = useSelector((state: RootState) => state.unsavedChanges)
  const dispatch = useDispatch()

  const doLogout = () => {
    setConfirmLogout(false)

    dispatch(turnOff())

    localFetch('/users/sign_out', {
      method: 'DELETE'
    }).then(() => {
      window.location.href = '/'
    })
  }

  const handleLogout = () => {
    if (unsavedChanges && !confirmLogout) {
      setConfirmLogout(true)
    } else {
      doLogout()
    }
  }


  const handleForcedRedirect = () => {
    if (!newPath) return

    dispatch(turnOff())
    setNewPath(undefined)
    history.push(newPath)
  }

  const handleLinkClick = (pathname: string) => {
    if (unsavedChanges) {
      setNewPath(pathname)
    } else {
      history.push(pathname)
    }
  }

  type MenuItem = {
    onClick: Function
    label: string
  }

  const menuItems: MenuItem[] =  [
    {
      onClick: () => { handleLinkClick(SessionRoutePaths.show) },
      label: 'Perfil'
    },
    {
      onClick: handleLogout,
      label: 'Sair'
    }
  ]

  if (user?.roles.includes(UserRole.Admin)) {
    menuItems.push({
      onClick: () => { window.location.href = '/admin'},
      label: 'Painel de Administração'
    })
  }

  return (
    <>
      <Dialog
        isOpen={!!newPath}
        setIsOpen={(value) => setNewPath(value ? newPath : undefined)}
        onConfirmation={handleForcedRedirect}
        title="Modificações não Salvas"
        text="Todas as alterações serão descartadas. Deseja continuar?"
      />
      <Dialog
        isOpen={confirmLogout}
        setIsOpen={setConfirmLogout}
        onConfirmation={handleLogout}
        title="Modificações não Salvas"
        text="Todas as alterações serão descartadas. Deseja continuar?"
      />
      <Menu as="div" className="relative h-full">
        {({ open }) => (
          <>
            <Menu.Button
              className="h-full flex flex-row px-2 items-center hover:bg-primary-dark text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="hidden md:block pr-2">
                {user?.name}
              </span>
              <div className="w-12">
                <CurrentUserAvatar />
              </div>
            </Menu.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="z-50 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer"
              >
                {menuItems.map((item) => (
                  <div
                    key={`menu-item-${item.label}`}
                    onClick={() => {
                      item.onClick()
                    }}
                  >
                    <Menu.Item>
                      {({ active }) => (
                        <span
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-900'
                          )}
                        >
                          {item.label}
                        </span>
                      )}
                    </Menu.Item>
                  </div>
                ))}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  )
}
