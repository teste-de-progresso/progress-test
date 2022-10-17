import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

import { Navigator } from "../../../components";
import { QuestionsFilter } from "./QuestionFilter";
import { QuestionsPainel } from "./QuestionsPainel";
import { FiltersProvider } from './QuestionFilter/QuestionsFilterProvider'
import { gql, useQuery } from "@apollo/client";
import { Query } from "../../../__generated__/graphql-schema";

const QuestionListQuery = gql`
  query DashboardQuery {
    questionFilterOptions {
      years
    }
  }
`

export const List = () => {
  const { data } = useQuery<Query>(QuestionListQuery)
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <FiltersProvider
      questionFilterOptions={data?.questionFilterOptions}
    >
      <Navigator newQuestion={true}>
        <li className={"hover:text-white ml-auto"}>
          <button onClick={() => setFilterOpen(true)} className="flex">
            <FaFilter className="my-auto" />
            <span className="pl-3">Filtros</span>
          </button>
        </li>
      </Navigator>
      <QuestionsFilter
        isOpen={filterOpen}
        setIsOpen={setFilterOpen}
      />
      <div className="bg-gray-100 w-full">
        <main className="sm:px-8 rounded-t-xlg">
          <div className="mx-2 sm:mx-0 sm:mr-4">
            <QuestionsPainel />
          </div>
        </main>
      </div>
    </FiltersProvider>
  );
};
