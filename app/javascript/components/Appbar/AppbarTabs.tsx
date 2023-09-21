import { ChartBarIcon, ClipboardListIcon, DocumentIcon } from "@heroicons/react/outline";
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from 'react-router';

import { AssessmentRoutePaths, DashboardRoutePaths, QuestionRoutePaths } from "../../routes";
import { RootState } from "../../services/store";
import { turnOff } from "../../services/store/unsavedChanges";
import { Dialog } from '../Dialog';
import { useCurrentUser } from "../../contexts";

export const AppbarTabs = () => {
  const unsavedChanges = useSelector((state: RootState) => state.unsavedChanges)
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const { isOnlyTeacher } = useCurrentUser()

  const [newPath, setNewPath] = useState<string>()

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


  const links = [{
    icon: <ChartBarIcon className="w-6" />,
    tabel: 'Painel',
    pathname: DashboardRoutePaths.index,
    isCurrent: location.pathname.includes('dashboard'),
  },
  {
    icon: <ClipboardListIcon className="w-6" />,
    tabel: 'Questões',
    pathname: QuestionRoutePaths.index,
    isCurrent: location.pathname.includes('question'),
  }]

  if (!isOnlyTeacher) {
    links.push({
      icon: <DocumentIcon className="w-6" />,
      tabel: 'Avaliações',
      pathname: AssessmentRoutePaths.index,
      isCurrent: false,
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
      <div className="h-full flex items-center pl-4">
        {links.map((link) => (
          <button
            className={`h-full flex items-center px-2 mx-2 text-gray-300 hover:bg-primary-dark ${link.isCurrent ? 'underline bg-primary-dark' : ''}`}
            key={`navbar-link-${link.pathname}`}
            onClick={() => handleLinkClick(link.pathname)}
          >
            <span className="pr-2 ">
              {link.icon}
            </span>
            {link.tabel}
          </button>
        ))}
      </div>
    </>
  )
}
