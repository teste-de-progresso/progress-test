import React, { FC } from "react";

export const Loading: FC = () => {
  return (
    <div className="grid h-screen w-screen bg-primary-dark place-items-center">
      <div className="text-white text-lg">
        Carregando...
      </div>
    </div>
  )
}