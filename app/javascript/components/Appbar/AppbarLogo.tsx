import React from 'react'

export const AppbarLogo = () => (
  <div className="h-full grid place-items-center">
    <img
      alt="Símbolo do Unifeso"
      className="hidden md:block h-12 w-auto"
      src={'https://www.unifeso.edu.br/images/logo/UNIFESO-BRANCO.png'}
    />
    <img
      alt="Logotipo do Unifeso"
      className="md:hidden h-12 w-12 object-cover object-left"
      src={'https://www.unifeso.edu.br/images/logo/UNIFESO-BRANCO.png'}
    />
  </div>
)
