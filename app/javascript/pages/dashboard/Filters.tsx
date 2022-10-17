import React, { FC, Fragment } from 'react'
import { Disclosure, Transition } from "@headlessui/react"
import { ChevronDownIcon, XIcon } from "@heroicons/react/outline"
import { useForm } from "react-hook-form"

import { QuestionWhereInput } from "../../__generated__/graphql-schema"
import { useDashboardContext, whereDefaultState } from "./DashboardContext"
import { useCurrentUser } from "../../contexts"
import { Button, Input } from "../../components"

type FilterBarForm = {
  fromOtherUsers?: boolean
  createDate: {
    startAt: string
    endAt: string
  }
}

const startDateISO8601Date = '2021-01-01'
const currentISO8601Date = new Date().toISOString().split('T')[0]

const formDefaultValues: FilterBarForm = {
  fromOtherUsers: false,
  createDate: {
    startAt: startDateISO8601Date,
    endAt: currentISO8601Date
  }
}

const mapFilter = (values: FilterBarForm, userId?: string): QuestionWhereInput => ({
  userId: values.fromOtherUsers ? undefined : userId,
  createDate: {
    startAt: values.createDate.startAt.length ? values.createDate.startAt : startDateISO8601Date,
    endAt: values.createDate.endAt.length ? values.createDate.endAt : currentISO8601Date,
  }
})

const FiltersForm: FC = () => {
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: formDefaultValues,
  })
  const { setWhere } = useDashboardContext()
  const userContext = useCurrentUser()
  const { user, isOnlyTeacher } = userContext

  const onSubmit = (values: FilterBarForm) => {
    reset(getValues())
    setWhere(mapFilter(values, user?.id))
  }

  const handleClean = () => {
    reset(formDefaultValues)
    setWhere(whereDefaultState(userContext))
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"flex justify-between"}
    >
      <span>
        <label className={"pl-2 pt-2"}>Data de Criação</label>
        <div className={"grid grid-cols-2 gap-2 border p-2 m-2 rounded-md border-gray-300"}>
          <Input
            type="date"
            placeholder="createDate.startAt"
            {...register('createDate.startAt', {
              maxLength: 10,
              minLength: 10,
            })}
            name={"createDate.startAt"}
            label={"A Partir De"}
          />
          <Input
            type="date"
            placeholder="createDate.endAt"
            {...register('createDate.endAt', {
              maxLength: 10,
              minLength: 10,
            })}
            label={"Até"}
          />
        </div>
      </span>
      {!isOnlyTeacher && (
        <span className={"flex items-center"}>
          <label
            htmlFor={"fromOtherUsers"}
            children={"Apenas questões próprias?"}
            className={"mr-3"}
          />
          <input
            id={"fromOtherUsers"}
            type="checkbox"
            placeholder="fromOtherUsers"
            {...register('fromOtherUsers')}
          />
        </span>
      )}
      <div className={"grid grid-cols-2 gap-2 place-items-center"}>
        <div>
          <Button type={'tertiary'} onClick={handleClean}>
            <span className={"flex"}>
              <XIcon className={"w-5 h-5 text-gray-800"} />
              Limpar filtro
            </span>
          </Button>
        </div>
        <div>
          <Button disabled={!formState.isDirty} type={'primary'} htmlType={"submit"} className={"w-full"}>
            Filtar
          </Button>
        </div>
      </div>
    </form>
  );
}

export const Filters: FC = () => (
  <div className="p-4 m-auto bg-white rounded-md shadow-sm hover:shadow transition-shadow duration-300">
    <FiltersForm />
  </div>
)
