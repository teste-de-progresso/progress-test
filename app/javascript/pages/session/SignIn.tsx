import React from "react";

import { Button } from "../../components";

export const SignIn = () => {
  const handleLogin = async () => {
  }

  return (
    <div className="w-screen h-screen bg-primary-normal grid place-items-center">
      <div>
        <img
          alt="Logo do Unifeso"
          src={'unifesoLogo'}
          style={{ width: "85%", margin: "auto" }}
        />
        <div className="grid place-items-center">
          <Button onClick={handleLogin}>Faça login no Google</Button>
        </div>
      </div>
    </div>
  );
};
