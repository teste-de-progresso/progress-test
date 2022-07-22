import React from "react";

import { Button } from "../../components";

export const UnauthorizedAccess = () => {
  const handleSignOut = () => {
  }

  return (
    <div className="w-screen h-screen bg-primary-normal grid place-items-center">
      <div className="flex flex-col h-32 justify-between">
        <h1 className="text-white text-xl">
          {'currentUser?.email'}
          {" "}
          não possui permissão para acessar a plataforma!
        </h1>
        <div className="grid place-items-center">
          <Button onClick={handleSignOut}>Encerrar Sessão</Button>
        </div>
      </div>
    </div>
  );
};
