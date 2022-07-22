import React, {FC,} from 'react'

import {DashboardProvider} from './DashboardContext'
import {
  QuestionsBySubject,
  QuestionByBloomTaxonomy,
  QuestionsByDifficulty,
  QuestionByCheckType,
} from './charts'
import {Filters} from './Filters'

export const Dashboard: FC = () => (
  <DashboardProvider>
    <main className="max-h-screen sm:px-8 gap-2 pt-2 sm:pt-4">
      <Filters/>
      <div className="pt-3 grid gap-2 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
        <QuestionsBySubject/>
        <QuestionByBloomTaxonomy/>
        <QuestionsByDifficulty/>
        <QuestionByCheckType/>
      </div>
    </main>
  </DashboardProvider>
)
