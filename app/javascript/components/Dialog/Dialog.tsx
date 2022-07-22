import React, { FC } from "react"
import { Button } from "../Button"
import { Modal } from '../Modal'

type DialogType = 'confirmation' | 'notice'

type Props = {
  type?: DialogType
  title: string
  isOpen?: boolean
  text?: any
  setIsOpen: (state: boolean) => void
  onConfirmation: () => void
};

export const Dialog: FC<Props> = ({
  type = 'confirmation',
  title,
  isOpen: open = false,
  setIsOpen,
  onConfirmation,
  text,
}) => {
  return (
    <Modal
      title={title}
      isOpen={open}
      setIsOpen={setIsOpen}
      buttons={
        <>
          {type === 'confirmation' &&
            <Button onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>
          }
          <Button type="primary" onClick={onConfirmation}>
            Confirmar
          </Button>
        </>
      }
    >
      {text}
    </Modal>
  )
};

