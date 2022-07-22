import React, { FC, useState } from "react";
import { gql } from "@apollo/client";

import { Card } from "../../../../../components";
import { SubjectSelect, SubjectFragment } from "./SubjectSelect";
import { ReviewerSelect, ReviewerFragment } from "./ReviewSelect";
import { useFormProvider } from '../../FormContext'

import { BLOOM_TAXONOMY, CHECK_TYPE, DIFFICULTY } from "../../../../../utils/types";
import { Question } from "../../../../../__generated__/graphql-schema";

export const FeaturesFragment = gql`
  ${ReviewerFragment}
  ${SubjectFragment}
  fragment FeaturesFields on Question {
    ... ReviewerFields
    ... SubjectFields
    authorship
    authorshipYear
    difficulty
    checkType
    intention
    bloomTaxonomy
  }
`

export const FeaturesFormStep: FC = () => {
  const { question, hooks: { setValue, register } } = useFormProvider();

  const currentYear = new Date().getFullYear();

  const {
    authorship,
    authorshipYear,
    difficulty,
    bloomTaxonomy,
    checkType,
  } = question || {} as Question

  const [ownQuestion, setOwnQuestion] = useState<boolean>(authorship === "UNIFESO" || authorship === undefined || authorship === null);

  const handleOwnCheck = (value: string) => {
    if (value === 'UNIFESO') {
      setOwnQuestion(true)
      setValue("authorship", "UNIFESO");
      setValue("authorshipYear", currentYear.toString());
    } else {
      setOwnQuestion(false)
      setValue("authorship", "");
      setValue("authorshipYear", "");
    }
  };

  return (
    <>
      <Card title="Características">
        <div className="grid grid-cols-2 col-gap-2">
          <div className="flex">
            <label htmlFor="own" className="mr-3 my-auto">
              Autoria
            </label>
            <div className="my-auto">
              <input
                className="my-auto"
                type="radio"
                id="authorship-own"
                checked={!!ownQuestion}
                ref={register}
                onChange={() => handleOwnCheck("UNIFESO")}
                name="__nonused"
              />
              <label htmlFor="authorship-own" className="ml-1">Própria</label>
            </div>
            <div className="my-auto ml-3">
              <input
                className="my-auto"
                type="radio"
                id="authorship-third"
                checked={!ownQuestion}
                ref={register}
                onChange={() => handleOwnCheck("")}
                name="__nonused"
              />
              <label htmlFor="authorship-third" className="ml-1">Outro</label>
            </div>
          </div>
          <div className="flex">
            <div className="flex">
              <h2 className="pr-2 my-auto">Fonte</h2>
              <div className="w-full">
                <div style={{ maxWidth: "194px" }}>
                  <input
                    className="block rounded p-1 w-full border-gray-400 border shadow-sm"
                    ref={register}
                    name="authorship"
                    defaultValue={authorship || (ownQuestion ? "UNIFESO" : "")}
                    readOnly={!!ownQuestion}
                  />
                </div>
              </div>
            </div>
            <div className="flex">
              <h2 className="pr-2 pl-3 my-auto">Ano</h2>
              <div style={{ maxWidth: "62px" }}>
                <input
                  className="w-full rounded p-1 border-gray-400 border shadow-sm"
                  ref={register}
                  type="number"
                  min="1999"
                  max={currentYear}
                  step="1"
                  name="authorshipYear"
                  defaultValue={authorshipYear ?? new Date().getFullYear().toString()}
                  readOnly={!!ownQuestion}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 col-gap-2 mt-3">
          <div className="w-full grid grid-cols-1 row-gap-4">
            <div className="flex flex-col">
              <h2>Grau de Dificuldade</h2>
              <select
                ref={register}
                className="w-full rounded p-1 border-gray-400 border shadow-sm"
                name="difficulty"
                defaultValue={difficulty ?? ""}
              >
                <option />
                {DIFFICULTY.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <h2>Tipo</h2>
              <select
                ref={register}
                className="w-full rounded p-1 border-gray-400 border shadow-sm"
                name="checkType"
                defaultValue={checkType ?? ""}
              >
                <option />
                {CHECK_TYPE.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <h2>Habilidade Cognitiva</h2>
              <select
                ref={register}
                className="w-full rounded p-1 border-gray-400 border shadow-sm"
                name="bloomTaxonomy"
                defaultValue={bloomTaxonomy ?? ""}
              >
                <option />
                {BLOOM_TAXONOMY.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full">
            <SubjectSelect />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h2>Intenção</h2>
          <textarea
            className="block rounded p-1 w-full border-gray-400 border shadow-sm"
            ref={register}
            name="intention"
            defaultValue={question?.intention ?? ""}
          />
        </div>
        <div className="flex flex-col mt-4">
          <h2>Revisor</h2>
          <ReviewerSelect />
        </div>
      </Card>
    </>
  );
};
