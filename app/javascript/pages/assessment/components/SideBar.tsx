import React, { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    header?: string;
}

export const SideBar: FC<Props> = ({ header, children }) => {
    return (
        <div className={`border-gray-500`}>
            {header && 
            <>
                <h1>{header}</h1>
                <hr className="h-1 mt-2"/>
            </>}
            <div className="mx-2">
                {children} 
            </div>
        </div>
    )
}