import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Query } from "../../__generated__/graphql-schema";
import { Button, Card, Input, Navigator } from '../../components';

type NewAssessementForm = {
  subjectWeights: Record<string, any>
}

const NEW_ASSESSEMENT_DATA_QUERY = gql`
  query NewAssessementDataQuery {
    categories {
      nodes {
        id
        name
        subjects {
          id
          name
        }
      }
    }
  }
`

export const NewAssessement = () => {
  const { data } = useQuery<Query>(NEW_ASSESSEMENT_DATA_QUERY)

  const [subjectsIds, setSubjectsIds] = useState<string[]>([])
  const subjectForm = useForm<{ subjectId: string }>()
  const { register, control, watch } = useForm<NewAssessementForm>({
    mode: 'onBlur'
  })

  const handleSubjectFormSubmit = (data: {
    subjectId: string
  }) => {
    setSubjectsIds(prev => [...prev, data.subjectId])
    subjectForm.reset();
  }

  if (!data?.categories) {
    return null;
  }

  return (
    <>
      <Navigator home />
      <div className="m-auto grid gap-4 mt-4 mx-6">
        <Card title="Detalhes">
          <div className="flex flex-col">
            <p className="pr-2 my-auto">Titulo: </p>
            <div className="w-full">
              <Input></Input>
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <p className="pr-2 my-auto">Observações: </p>
            <div className="w-full">
              <Input></Input>
            </div>
          </div>
        </Card>
        <Card title="Assuntos e Pesos">
          <div className="mb-6">
            <form
              className="flex flex-row"
              onSubmit={subjectForm.handleSubmit(handleSubjectFormSubmit)}
            >
              <select
                className="w-full rounded p-1 border-gray-400 border shadow-sm"
                {...subjectForm.register('subjectId')}
              >
                {data.categories.nodes.map(category => (
                  <optgroup label={category.name} key={`category-${category.id}`}>
                    {category.subjects.map(subject =>
                      subjectsIds.includes(subject.id) ? null : <option value={subject.id} key={`subject-${subject.id}`}>{subject.name}</option>
                    )}
                  </optgroup>
                ))}
              </select>
              <Button className="ml-4" htmlType="submit">Adicionar</Button>
            </form>
          </div>

          <div>
            {data.categories.nodes.map(category => (
              category.subjects.find(subject => subjectsIds.includes(subject.id)) ?
                <div
                  key={`list-category-${category.id}`}
                  className="flex flex-col w-full border border-gray-300 rounded p-4 mt-4 shadow-sm"
                >
                  <h5 className="text-xl">{category.name}</h5>
                  {category.subjects.map(subject =>
                    subjectsIds.includes(subject.id)
                      ? <div key={`list-subject-${subject.id}`} className="ml-4">
                        <div className="text-lg">{subject.name}</div>
                        <div className="ml-4 grid grid-cols-3">
                          Fácil
                          <span>
                            {watch(`subjectWeights.easy.${subject.id}`) ?? 5}
                          </span>
                          <div>
                            <Controller
                              name={`subjectWeights.easy.${subject.id}`}
                              control={control}
                              defaultValue={5}
                              render={({ field }) => (
                                <input
                                  className="w-full"
                                  type="range"
                                  min={0}
                                  max={10}
                                  {...field}
                                />
                              )}
                            />

                          </div>

                        </div>
                        <div className="ml-4 grid grid-cols-3">
                          Médio
                          <span>
                            {watch(`subjectWeights.medium.${subject.id}`) ?? 5}
                          </span>
                          <div>
                            <Controller
                              name={`subjectWeights.medium.${subject.id}`}
                              control={control}
                              defaultValue={5}
                              render={({ field }) => (
                                <input
                                  className="w-full"
                                  type="range"
                                  min={0}
                                  max={10}
                                  {...field}
                                />
                              )}
                            />

                          </div>

                        </div>
                        <div className="ml-4 grid grid-cols-3">
                          Difícil
                          <span>
                            {watch(`subjectWeights.hard.${subject.id}`) ?? 5}
                          </span>
                          <div>
                            <Controller
                              name={`subjectWeights.hard.${subject.id}`}
                              control={control}
                              defaultValue={5}
                              render={({ field }) => (
                                <input
                                  className="w-full"
                                  type="range"
                                  min={0}
                                  max={10}
                                  {...field}
                                />
                              )}
                            />

                          </div>

                        </div>
                      </div>
                      : null
                  )}
                </div>
                : null
            ))}
          </div>
        </Card>
      </div>
      <Button type="primary" className="ml-auto mr-6 mt-6">
        Gerar
      </Button>
    </>
  )
}