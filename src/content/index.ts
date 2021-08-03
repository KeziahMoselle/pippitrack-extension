import { browser } from 'webextension-polyfill-ts'
import { onMessage } from 'webext-bridge'

const REGEX = /users\/(?<userId>\d*)(?<mode>.*)/

interface RegexGroups {
  userId: string
}

onMessage('on-url-change', () => {
  sendTopPlays()
})

async function sendTopPlays() {
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
}
