import { browser } from 'webextension-polyfill-ts'

const REGEX = /users\/(?<userId>\d*)(?<mode>.*)/

interface RegexGroups {
  userId: string
}

const groups: RegexGroups = window.document.location.pathname.match(REGEX)?.groups
const { userId } = groups

if (userId) {
  browser.runtime.sendMessage({
    message: 'send_top_plays',
    data: {
      userId,
    },
  })
}
