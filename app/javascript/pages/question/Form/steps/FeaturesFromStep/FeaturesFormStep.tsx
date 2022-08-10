import { gql } from "@apollo/client";
import React, { FC, useState } from "react";

import { Card } from "../../../../../components";
import { useFormProvider } from "../../FormContext";
import { ReviewerFragment, ReviewerSelect } from "./ReviewSelect";
import { SubjectFragment, SubjectSelect } from "./SubjectSelect";

import {
  BLOOM_TAXONOMY,
  CHECK_TYPE,
  DIFFICULTY
} from "../../../../../utils/types";

export const FeaturesFragment = gql`
  ${ReviewerFragment}
  ${SubjectFragment}
  fragment FeaturesFields on Question {
    ...ReviewerFields
    ...SubjectFields
    authorship
    authorshipYear
    difficulty
    checkType
    intention
    bloomTaxonomy
  }
`;

const CURRENT_YEAR = new Date().getFullYear();

export const FeaturesFormStep: FC = () => {
  const {
    hooks: { setValue, register, watch },
  } = useFormProvider();
  const authorship = watch("authorship");
  const [ownQuestion, setOwnQuestion] = useState(authorship === "UNIFESO");

  const handleOwnCheck = (value: string) => {
    if (value === "UNIFESO") {
      setOwnQuestion(true);
      setValue("authorship", "UNIFESO");
      setValue("authorshipYear", CURRENT_YEAR.toString());
    } else {
      setOwnQuestion(false);
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
                {...register("authorshipType", { required: true })}
                checked={authorship === "UNIFESO"}
                value="UNIFESO"
                className="my-auto"
                type="radio"
                id="authorship-own"
                onChange={() => handleOwnCheck("UNIFESO")}
              />
              <label htmlFor="authorship-own" className="ml-1">
                Própria
              </label>
            </div>
            <div className="my-auto ml-3">
              <input
                {...register("authorshipType", { required: true })}
                value="OTHER"
                className="my-auto"
                type="radio"
                id="authorship-third"
                onChange={() => handleOwnCheck("")}
              />
              <label htmlFor="authorship-third" className="ml-1">
                Outro
              </label>
            </div>
          </div>
          <div className="flex">
            <div className="flex">
              <h2 className="pr-2 my-auto">Fonte</h2>
              <div className="w-full">
                <div style={{ maxWidth: "194px" }}>
                  <input
                    {...register("authorship")}
                    className="block rounded p-1 w-full border-gray-400 border shadow-sm"
                    readOnly={!!ownQuestion}
                  />
                </div>
              </div>
            </div>
            <div className="flex">
              <h2 className="pr-2 pl-3 my-auto">Ano</h2>
              <div style={{ maxWidth: "62px" }}>
                <input
                  {...register("authorshipYear")}
                  className="w-full rounded p-1 border-gray-400 border shadow-sm"
                  type="number"
                  min="1999"
                  max={CURRENT_YEAR}
                  step="1"
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
                {...register("difficulty")}
                className="w-full rounded p-1 border-gray-400 border shadow-sm"
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
                {...register("checkType")}
                className="w-full rounded p-1 border-gray-400 border shadow-sm"
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
                {...register("bloomTaxonomy")}
                className="w-full rounded p-1 border-gray-400 border shadow-sm"
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
            {...register("intention")}
            className="block rounded p-1 w-full border-gray-400 border shadow-sm"
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
