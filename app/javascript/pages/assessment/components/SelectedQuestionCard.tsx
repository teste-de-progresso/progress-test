import React, { FC } from 'react';
import { FaTrash } from 'react-icons/fa';

type Props = {
    label: string
    id: string
    onRemoveQuestion: Function
}

export const SelectedQuestionCard: FC<Props> = ({ label, id, onRemoveQuestion }) => {
    return (
        <div className="mx-1 sm:mx-0 mb-4 mt-3 sm:mb-0 border-l-8 border-primary-light flex bg-white hover:bg-unifeso-50 rounded shadow hover:shadow-md cursor-pointer group transition-all duration-500">
            <a className="flex flex-col w-full px-3 py-2"
                href={`#${id}`}>
                <h2>{`# ${label ?? id}`}</h2>
            </a>
            <div className="flex flex-col relative flex-grow justify-center">
                <button className="group-hover:block absolute bg-gray-300 hover:bg-primary-normal text-gray-500 hover:text-gray-100 hover:shadow-lg rounded-full p-2 cursor-pointer shadow-inner transition-all duration-500"
                    style={{ left: '-1.5rem' }}
                    onClick={() => onRemoveQuestion()}>
                    <FaTrash />
                </button>
            </div>
      </div>   
    )
}

