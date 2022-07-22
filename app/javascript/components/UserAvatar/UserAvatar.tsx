import React, {FC} from "react";
import {User} from "../../__generated__/graphql-schema";
import BoringAvatar from "boring-avatars";

type Props = {
  user: User
  className?: string
}

export const UserAvatar: FC<Props> = ({user, className}) => {
  return (
    <div className={`rounded-full border-2 border-primary-light shadow ${className || ''}`}>
      {user.avatarUrl ?
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/${user.avatarUrl}`}
          alt={`Avatar do usuário ${user.name}`}
        />
        : <BoringAvatar
          size={"100%"}
          name={user.name}
          variant="pixel"
          colors={["#595F72", "#575D90", "#84A07C", "#C3D350", "#E6F14A"]}
        />
      }
    </div>
  )
};
