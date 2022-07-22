import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import {
  QuestionBloomTaxonomy,
  QuestionCheckType,
  QuestionDifficulty,
} from "../../../../__generated__/graphql-schema";
import { CHECK_TYPE, BLOOM_TAXONOMY, DIFFICULTY } from "../../../../utils/types";

import { Button, Modal } from "../../../../components";
import { useFiltersProvider } from "./QuestionsFilterProvider";
import { QuestionsSubjectFilter } from './QuestionsSubjectFilter'
import { QuestionsAuthorshipTypeFilter } from "./QuestionsAuthorshipTypeFilter";
import { AuthorshipFilter } from "./AuthorshipFilter";

type FilterGroupProps = {
  title: string;
  register: any;
  options: {
    value: string;
    label: string;
  }[];
  selecteds: any[];
  setChanged: Dispatch<SetStateAction<boolean>>;
};

const FilterGroup: FC<FilterGroupProps> = ({
  title,
  options,
  register,
  selecteds,
  setChanged,
}) => (
  <>
    <div className="mt-2 sm:mt-0 flex flex-col">
      <h3 className="font-bold mb-1">{title}</h3>
      <div
        className="grid grid-cols-2 sm:flex sm:flex-col"
        key={`filter-group-${title}`}
      >
        {options.map(({ value, label }) => (
          <span className="mr-1 mb-2 sm:mb-0 sm:mr-0" key={value}>
            <input
              type="checkbox"
              name={value}
              {...register(value)}
              id={value}
              defaultChecked={selecteds.includes(value)}
              onClick={() => setChanged(true)}
            />
            <label htmlFor={value} className="ml-2">
              {label}
            </label>
          </span>
        ))}
      </div>
    </div>
  </>
);

type Props = {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
};

export const QuestionsFilter: FC<Props> = ({ isOpen, setIsOpen }) => {
  const { handleSubmit, register, reset } = useForm();
  const { where, setWhere } = useFiltersProvider();
  const { difficulty, checkType, bloomTaxonomy } = where;
  const [changed, setChanged] = useState(false);
  const submitRef = useRef<HTMLInputElement>()

  const onSubmit = (inputs: any) => {
    const valuesFromCheckType = CHECK_TYPE.filter(
      ({ value }) => inputs[value]
    ).map(({ value }) => value) as QuestionCheckType[];

    const valuesFromBloomTaxonomy = BLOOM_TAXONOMY.filter(
      ({ value }) => inputs[value]
    ).map(({ value }) => value) as QuestionBloomTaxonomy[];

    const valuesFromDifficulty = DIFFICULTY.filter(
      ({ value }) => inputs[value]
    ).map(({ value }) => value) as QuestionDifficulty[];

    const removeKeysWithUndefiend = (obj: any) => {
      for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined) {
          delete obj[propName];
        }
      }
      return obj;
    };

    setWhere({
      unifesoAuthorship: inputs.authorship === 'null' ? null : inputs.authorship === 'true',
      ...removeKeysWithUndefiend({
        checkType: valuesFromCheckType.length ? valuesFromCheckType : undefined,
        bloomTaxonomy: valuesFromBloomTaxonomy.length
          ? valuesFromBloomTaxonomy
          : undefined,
        difficulty: valuesFromDifficulty.length
          ? valuesFromDifficulty
          : undefined,
        subjectId: inputs.subjectId === "" ? undefined : inputs.subjectId,
        authorshipYear: inputs.authorshipYear === "" ? undefined : [inputs.authorshipYear],
      }),
    });

    setChanged(false);
    setIsOpen(false);
  };

  const handleClean = () => {
    setChanged(false);
    setWhere({});
    reset();
  };

  return (
    <Modal
      title="Filtros"
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      buttons={
        <>
          <Button
            onClick={() => handleClean()}
            disabled={!changed}
            className={`${changed ? 'opacity-1' : 'opacity-0'}`}
          >
            Limpar
          </Button>
          <Button onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button type="primary" onClick={() => submitRef.current?.click()}>
            Aplicar
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-2">
          <div className="mt-2 sm:mt-0 flex flex-col">
            <h3 className="font-bold mb-1">Assunto</h3>
            <div className="grid grid-cols-2 sm:flex sm:flex-col">
              <QuestionsSubjectFilter register={register} setChanged={setChanged} />
            </div>
          </div>
          <div className="mt-2 sm:mt-0 flex flex-col">
            <h3 className="font-bold mb-1">Ano</h3>
            <div className="grid grid-cols-2 sm:flex sm:flex-col">
              <QuestionsAuthorshipTypeFilter register={register} setChanged={setChanged} />
            </div>
          </div>
          <FilterGroup
            title="Tipo"
            register={register}
            options={CHECK_TYPE}
            selecteds={(checkType ?? []) as QuestionCheckType[]}
            setChanged={setChanged}
          />
          <FilterGroup
            title="Habilidade Cognitiva"
            register={register}
            options={BLOOM_TAXONOMY}
            selecteds={(bloomTaxonomy ?? []) as QuestionBloomTaxonomy[]}
            setChanged={setChanged}
          />
          <FilterGroup
            title="Grau de Dificuldade"
            register={register}
            options={DIFFICULTY}
            selecteds={(difficulty ?? []) as QuestionDifficulty[]}
            setChanged={setChanged}
          />
          <AuthorshipFilter register={register} setChanged={setChanged} />
          <input hidden type="submit" ref={submitRef as any} />
        </div>
      </form>
    </Modal >
  );
};
