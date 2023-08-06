import React, { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    bgColor?: string;
}

export const SideBar: FC<Props> = ({ bgColor, children }) => {
    return (
        <div className={`border-gray-500 ${bgColor ?? ""}`}>
                <div className="mx-2">
                    {children} 
                </div>
            </div>
    )
}