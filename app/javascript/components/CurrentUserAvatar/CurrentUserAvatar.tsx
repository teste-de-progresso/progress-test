import React, {FC} from 'react'

import {useCurrentUser} from "../../contexts";
import {UserAvatar} from "../UserAvatar";

export const CurrentUserAvatar: FC = () => {
  const {user} = useCurrentUser()

  if (!user) return null

  return (
    <UserAvatar user={user}/>
  )
}