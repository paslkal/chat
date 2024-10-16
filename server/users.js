let users = []
import trimString from "./utils.js"

function addUser(user) {
  const userName = trimString(user.name)
  const userRoom = trimString(user.room)

  const isExist = users.find(
    u => trimString(u.name) === userName && trimString(u.room) === userRoom
  )

  !isExist && users.push(user)

  const currentUser = isExist || user

  return {isExist: !!isExist, user: currentUser}
}

export default addUser