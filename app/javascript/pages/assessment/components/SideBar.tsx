import React, { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    bgColor?: string;
    border?: 'l' | 'r'
}

export const SideBar: FC<Props> = ({ bgColor, border, children }) => {
    return (
        <div className={`
            ${border ? `border-${border}-2 ` : ''}
            border-gray-500 ${bgColor ?? ""}
            `}>
                <div className="mx-2">
                    {children} 
                </div>
            </div>
    )
}