import React from "react";

import { CurrentUserAvatar, Navigator } from "../../components";
import { useCurrentUser } from "../../contexts";

export const Profile = () => {
  const { user } = useCurrentUser();

  return (
    <>
      <Navigator home />
      <div className="bg-gray-100 w-full my-3">
        <main>
          <div className="flex items-center flex-col max-w-4xl m-auto">
            <div className="bg-white shadow border border-gray-100 flex flex-col items-center rounded p-4 w-full mt-12 mb-4 relative">
              <div
                className="w-20 absolute"
                style={{ top: "-3.10rem" }}
              >
                <CurrentUserAvatar />
              </div>
              <div className="mt-8 text-center">
                <h2 className="font-bold">{user?.name || user?.email}</h2>
                <h2 className="py-4">Centro: CCT</h2>
                <h2 className="">TODO: Cargo</h2>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
