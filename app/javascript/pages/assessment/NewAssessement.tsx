import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";

import { Axis, Query } from "../../__generated__/graphql-schema";
import { Button, Card, Input, Navigator } from '../../components';
import { useHistory } from "react-router";

type NewAssessementForm = {
  axisWeights: Record<string, any>
}

const NEW_ASSESSEMENT_DATA_QUERY = gql`
  query NewAssessementDataQuery {
    axes {
      nodes {
        id
        name
      }
    }
  }
`

export const NewAssessement = () => {
  const { data } = useQuery<Query>(NEW_ASSESSEMENT_DATA_QUERY)
  const axes = data?.axes.nodes

  const [subjectsIds, setSubjectsIds] = useState<string[]>([])
  const { register, control, watch } = useForm<NewAssessementForm>({
    mode: 'onBlur'
  })
  

  const addAxisForm = useForm<{ axisId: string }>()
  
  const handleAddAxis = (formData: { axisId: string }) => {
    setSubjectsIds(prev => [...prev, formData.axisId])
    addAxisForm.reset();
  }

  const handleRemoveAxis = (axisId: string) => {
    setSubjectsIds(prev => prev.filter((axis => axis !== axisId)))
  }

  if (!axes?.length) return null

  const notSelectedAxis: Axis[] = axes.filter((axis) => !subjectsIds.includes(axis.id))
  const selectedAxis: Axis[] = axes.filter((axis) => subjectsIds.includes(axis.id))

  const navigate = useHistory()

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
        <Card title="Exios e Pesos">
          <div className="mb-6">
            <form
              className="flex flex-row"
              onSubmit={addAxisForm.handleSubmit(handleAddAxis)}
            >
              <select
                className="w-full rounded p-1 border-gray-400 border shadow-sm"
                disabled={!notSelectedAxis.length}
                {...addAxisForm.register('axisId')}
              >
                {notSelectedAxis.map(axes => (
                  <option value={axes.id} key={`axes-${axes.id}`}>{axes.name}</option>
                ))}
              </select>
              <Button 
                className="ml-4"
                htmlType="submit"
                disabled={!notSelectedAxis.length}
              >
                Adicionar
              </Button>
            </form>
          </div>

          <div>
            {selectedAxis.map(axis => (
              <div
                key={`list-axis-${axis.id}`}
                className="flex flex-col w-full border border-gray-300 rounded p-4 mt-4 shadow-sm"
              >
                <div key={`list-axis-${axis.id}`} className="ml-4 mb-2">
                  <div className="flex justify-between">
                  <div className="text-lg">{axis.name}</div>
                  <div className="text-red-600 cursor-pointer" onClick={() => handleRemoveAxis(axis.id)}><FaTrash></FaTrash></div>
                  </div>
                  <div className="ml-4 grid grid-cols-3">
                    Fácil
                    <span>
                      {watch(`axisWeights.easy.${axis.id}`) ?? 5}
                    </span>
                    <div>
                      <Controller
                        name={`axisWeights.easy.${axis.id}`}
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
                      {watch(`axisWeights.medium.${axis.id}`) ?? 5}
                    </span>
                    <div>
                      <Controller
                        name={`axisWeights.medium.${axis.id}`}
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
                      {watch(`axisWeights.hard.${axis.id}`) ?? 5}
                    </span>
                    <div>
                      <Controller
                        name={`axisWeights.hard.${axis.id}`}
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
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="flex justify-end mr-6 gap-4">
        <Button type="primary" className="mt-6">
          Gerar Automaticamente
        </Button>
        <Button type="primary" className="mt-6" onClick={() => navigate.push('new-manual')}>
          Gerar Manualmente
        </Button>
      </div>
    </>
  )
}