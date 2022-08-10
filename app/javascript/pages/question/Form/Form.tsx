import React, {FC, useState} from 'react'
import {FieldValue, FieldValues, useForm} from 'react-hook-form';
import {ExclamationCircleIcon} from '@heroicons/react/outline';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {gql} from '@apollo/client';

import {Question, QuestionCreateInput, QuestionStatus} from '../../../__generated__/graphql-schema';
import {formatInput} from '../formatInputs';
import {validateQuestionInputs} from '../../../utils/questions/questionValidations';
import {RootState} from '../../../services/store';
import {FormProvider} from './FormContext'
import {SteppedForm, Step} from './SteppedForm'
import {
  EnunciationFormStep,
  EnunciationFragment,
  AnswerFormStep,
  AnswerFragment,
  DistractorsFormStep,
  DistractorsFragment,
  FeaturesFormStep,
  FeaturesFragment,
} from './steps'
import {
  Button,
  Dialog,
  AlertV2Props,
  AlertV2,
  List,
  ListItem,
} from '../../../components';
import {QuestionRoutePaths} from "../../../routes";
import {turnOff, turnOn} from "../../../services/store/unsavedChanges";

export const FormFragments = gql`
    ${EnunciationFragment}
    ${AnswerFragment}
    ${DistractorsFragment}
    ${FeaturesFragment}
    fragment FormFields on Question {
        ...EnunciationFields
        ...AnswerFields
        ...DistractorsFields
        ...FeaturesFields
        status
    }
`

type Props = {
  question?: Question
  onSubmit?: (inputs: any) => void
  onDraftSubmit?: (inputs: any) => void
  alert?: AlertV2Props
}

export const Form: FC<Props> = ({question, onSubmit, onDraftSubmit, alert}) => {
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [confirmSaveDialogIsOpen, setConfirmFinishDialogIsOpen] = useState(false)
  const [leaveDialogIsOpen, setLeaveDialogIsOpen] = useState(false)
  const formHooks = useForm<FieldValues>({
    defaultValues: {
      authorship: question?.authorship ?? 'UNIFESO',
      authorshipType: question?.authorship === 'UNIFESO' ? 'UNIFESO' : 'OTHER',
      authorshipYear: new Date().getFullYear().toString(),
      difficulty: question?.difficulty,
      checkType: question?.checkType,
      bloomTaxonomy: question?.bloomTaxonomy,
      intention: question?.intention,
    }
  })
  const {register, control, setValue, getValues, reset, formState, resetField} = formHooks

  const [currentStep, setCurrentStep] = useState(0)
  const unsavedChanges = useSelector((state: RootState) => state.unsavedChanges)
  const history = useHistory()
  const dispatch = useDispatch()

  const minStep = 0
  const maxStep = 3
  const onFirstStep = currentStep === minStep
  const onLastStep = currentStep === maxStep

  if (formState.isDirty) {
    dispatch(turnOn())
  }

  const handleNextStep = () => {
    if (onLastStep) return

    setCurrentStep(currentStep + 1)
  }

  const handlePreviousStep = () => {
    if (onFirstStep) return

    setCurrentStep(currentStep - 1)
  }

  const getFormattedInputValues = () => formatInput(getValues())

  const handleCancel = () => {
    if (unsavedChanges && !leaveDialogIsOpen) {
      setLeaveDialogIsOpen(true)
    } else {
      history.push(QuestionRoutePaths.index)
    }
  }

  const handleDraftSave = () => {
    if (onDraftSubmit) {
      onDraftSubmit({...getFormattedInputValues(), status: QuestionStatus.Draft} as QuestionCreateInput)
      reset(getValues())
      dispatch(turnOff())
    }
  }

  const handleSave = () => {
    const inputs = {...getFormattedInputValues(), status: QuestionStatus.WaitingReview} as QuestionCreateInput
    const errors = validateQuestionInputs(inputs)

    setConfirmFinishDialogIsOpen(false)

    if (onSubmit && !errors.length) {
      dispatch(turnOff())
      onSubmit(inputs)
    } else {
      setValidationErrors(errors)
    }

    reset(getValues())
  }

  return (
    <FormProvider props={{question, hooks: formHooks }}>
      {alert && (
        <AlertV2 severity={alert.severity} text={alert.text}></AlertV2>
      )}
      <Dialog
        isOpen={leaveDialogIsOpen}
        setIsOpen={setLeaveDialogIsOpen}
        onConfirmation={handleCancel}
        title="Modificações não Salvas"
        text="Todas as alterações serão descartadas. Deseja continuar?"
      />
      <Dialog
        isOpen={confirmSaveDialogIsOpen}
        setIsOpen={setConfirmFinishDialogIsOpen}
        onConfirmation={handleSave}
        title="Modificações não Salvas"
        text="Ao finalizar a questão, o revisor receberá uma notificação para revisá-la. Deseja continuar?"
      />
      <Dialog
        isOpen={!!validationErrors.length}
        setIsOpen={() => setValidationErrors([])}
        onConfirmation={() => setValidationErrors([])}
        title="Falha de Validação"
        type="notice"
        text={
          <>
            <List>
              {validationErrors?.map((errorMessage) => (
                <ListItem
                  key={errorMessage}
                  icon={<ExclamationCircleIcon className="w-5 text-gray-800"/>}
                  text={errorMessage}
                />
              ))}
            </List>
          </>
        }
      />
      <form className="m-auto max-w-screen-md">
        <SteppedForm
          currentStep={currentStep}
          className="mb-3"
        >
          <Step step={0}>
            <EnunciationFormStep/>
          </Step>
          <Step step={1}>
            <AnswerFormStep/>
          </Step>
          <Step step={2}>
            <DistractorsFormStep/>
          </Step>
          <Step step={3}>
            <FeaturesFormStep/>
          </Step>
        </SteppedForm>

        <div
          className="mx-3 sm:mx-0 flex justify-items-center flex-col-reverse sm:flex-row justify-end space-x-0 sm:space-x-2">
          <Button
            className={"mb-3 sm:mb-0"}
            onClick={handleCancel}
          >
            Cancelar
          </Button>
          <Button
            className={`mb-3 sm:mb-0 ${onFirstStep ? "hidden" : ""}`}
            onClick={handlePreviousStep}
          >
            Retornar
          </Button>
          {(question?.status === QuestionStatus.Draft || question?.status === undefined) &&
          <Button className={"mb-3 sm:mb-0"} onClick={handleDraftSave}>
              Salvar Rascunho
          </Button>
          }
          <Button
            type="primary"
            className={`mb-3 sm:mb-0 ${onLastStep ? "hidden" : ""}`}
            onClick={handleNextStep}
          >
            Prosseguir
          </Button>
          {onLastStep &&
          <Button
              type="primary"
              className="mb-3 sm:mb-0"
              onClick={handleSave}
          >
              Finalizar
          </Button>
          }
        </div>
      </form>
    </FormProvider>
  )
}