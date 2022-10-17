import {ResponsivePie} from '@nivo/pie'
import React, {FC} from 'react'

type Props = {
  title: string
  data: {
    id: string
    label: string
    value: number
  }[]
}

export const Pie: FC<Props> = ({title, data}) => {
  return (
    <div
      className="m-auto bg-white rounded-md p-4 shadow-sm hover:shadow transition-shadow duration-300 w-full"
      style={{ height: '36rem' }}
    >
      <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      {data.length ? (
        <ResponsivePie
          data={data}
          margin={{top: 40, right: 80, bottom: 80, left: 80}}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{from: 'color', modifiers: [['darker', 0.2]]}}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{from: 'color'}}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{from: 'color', modifiers: [['darker', 2]]}}
        />
      ) : (
        <div className='grid items-center text-center h-full'>Não existem dados disponíveis.</div>
      )}
    </div>
  )
}