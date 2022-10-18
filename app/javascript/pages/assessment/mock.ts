
export type Assessment = {
    id: string
    title: string
    createdAt: string
    updatedAt: string
}

export const assessmentsMock1: Assessment = {
    id: '1',
    title: 'Assessment 1',
    createdAt: '2020-01-01',
    updatedAt: '2020-01-01',
}

export const assessmentsMock2: Assessment = {
    id: '2',
    title: 'Assessment 2',
    createdAt: '2020-01-01',
    updatedAt: '2020-01-01',
}

export const assessmentsMock3: Assessment = {
    id: '3',
    title: 'Assessment 3',
    createdAt: '2020-01-01',
    updatedAt: '2020-01-01',
}

export const assessmentMocks = [assessmentsMock1, assessmentsMock2, assessmentsMock3]