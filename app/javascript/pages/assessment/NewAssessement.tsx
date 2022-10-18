import React from "react";
import { Button, Navigator } from '../../components'

export const NewAssessement = () => {
  return (
    <>
      <Navigator home />
      <div className="m-auto grid gap-4 mt-4 mx-6">
        <div
          className="mx-1 sm:mx-0 mb-4 sm:mb-0 border-l-8 border-primary-light flex bg-white rounded shadow group transition-all duration-500"
        >
          <div className="flex flex-row w-full px-3 py-2 justify-between">
            <h2>
              Ano de Criação
            </h2>

            <div className="flex">
              <h3>Apenas inéditas?</h3>
              <input className="ml-3" type="radio" id="huey" name="drone" value="huey"
                checked />
              <label className="ml-1" htmlFor="huey">Sim</label>
              <input className="ml-3" type="radio" id="dewey" name="drone" value="dewey" />
              <label className="ml-1" htmlFor="dewey">Não</label>
            </div>
          </div>

        </div>
        <div
          className="mx-1 sm:mx-0 mb-4 sm:mb-0 border-l-8 border-primary-light flex bg-white rounded shadow group transition-all duration-500"
        >
          <div className="flex flex-row w-full px-3 py-2 justify-between">
            <h2>
              Habilidade Cognitiva
            </h2>

            <div className="flex">
              <select>
                <option>Cálculo</option>
                <option>Geometria Analítica</option>
                <option>Álgebra Linear</option>
                <option>Probabilidade e Estatística</option>
                <option>Matemática Discreta</option>
                <option>Lógica Matemática</option>
                <option>Pesquisa Operacional</option>
                <option>Cálculo Numérico</option>
                <option>Física</option>
                <option>Algoritmos e Estruturas de Dados</option>
                <option>Projeto e Análise de Algoritmos</option>
                <option>Programação Estruturada</option>
                <option>Programação Orientada a Objetos</option>
                <option>Programação Funcional</option>
                <option>Programação Web</option>
                <option>Programação para Dispositivos</option>
                <option>Engenharia de Software</option>
                <option>Banco de Dados</option>
                <option>Gerência de Projetos</option>
                <option>Arquitetura de Computadores</option>
                <option>Sistemas Digitais</option>
                <option>Sistemas Operacionais</option>
                <option>Redes de Computadores</option>
                <option>Compiladores</option>
                <option>Teoria da Computação</option>
                <option>Sistemas Inteligentes</option>
                <option>Robótica</option>
                <option>Computação Gráfica</option>
                <option>Processamento de Sinais</option>
              </select>
            </div>
          </div>

        </div>
        <div
          className="mx-1 sm:mx-0 mb-4 sm:mb-0 border-l-8 border-primary-light flex bg-white rounded shadow group transition-all duration-500"
        >
          <div className="flex flex-row w-full px-3 py-2 justify-between">
            <h2>
              Habilidade Cognitiva
            </h2>

            <div className="flex">
              <select>
                <option>Algoritmos de Alto Desempenho</option>
                <option>Ciência, Tecnologia e Sociedade</option>
                <option>Sistemas de Software</option>
                <option>Infraestrutura de Sistemas Computacionais</option>
              </select>
            </div>
          </div>

        </div>
      </div>
      <Button type="primary" className="ml-auto mr-6 mt-6">
        Gerar
      </Button>
    </>
  )
}