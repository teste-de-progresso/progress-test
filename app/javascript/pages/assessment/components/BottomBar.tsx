import React, { FC, } from "react";
import { Button } from "../../../components";

type Props = {

}

export const BottomBar: FC<Props> = () => {
    return (
        <div className="fixed bottom-0 bg-white w-full h-16 flex items-center justify-end shadow-lg">
          <div className="flex gap-6 mx-16">
            <Button className="w-32">
              Cancelar
            </Button>
            <Button type="primary" className="w-32">
              Salvar
            </Button>
          </div>
        </div>
    )
}