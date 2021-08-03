import { browser } from 'webextension-polyfill-ts'
const OSU_USER_ID_REGEX = /users\/(?<userId>\d*)/

const { userId } = window.document.location.pathname.match(OSU_USER_ID_REGEX)?.groups

const mode = 'osu'

if (userId) {
  browser.runtime.sendMessage({
    message: 'send_top_plays',
    data: {
      userId,
      mode,
    },
  })
}
