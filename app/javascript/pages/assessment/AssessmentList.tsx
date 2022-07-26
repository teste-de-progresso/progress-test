import React from 'react'
import { Navigator } from '../../components'
import { AssessmentListItem } from './components/AssessmentListItem'
import { assessmentMocks } from './mock'

export const AssessmentList = () => {
  return (
    <>
      <Navigator newAssessment />
      <div className="m-auto w-full grid gap-4 mt-4" style={{
        width: '400px',
      }}>
        {assessmentMocks.map((assessment) => (
          <AssessmentListItem key={assessment.id} assessment={assessment} />
        ))}
      </div>
    </>
  )
}