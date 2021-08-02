const OSU_USER_ID_REGEX = /users\/(?<userId>\d*)/

const { userId } = window.document.location.pathname.match(OSU_USER_ID_REGEX)?.groups

if (userId)
  updatePlayer(userId)

async function updatePlayer(id: string) {
  const response = await fetch(`${id}`)
  const data = await response.json()
  console.log(data)
}
