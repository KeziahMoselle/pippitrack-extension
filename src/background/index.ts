import { browser } from 'webextension-polyfill-ts'

browser.runtime.onInstalled.addListener((): void => {
  browser.runtime.openOptionsPage()
})

browser.runtime.onMessage.addListener(async(message) => {
  if (message.message === 'send_top_plays') {
    const { userId, mode } = message.data

    const token = await browser.storage.sync.get()

    console.log(token.access_token)

    const response = await fetch(`https://osu.ppy.sh/api/v2/users/${userId}/scores/best?mode=${mode}&limit=100`, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        Accept: 'application/json',
      },
    })

    const newScores = await response.json()
    console.log(newScores)

    const res = await fetch('https://devpippitrack.keziahmoselle.fr/api/top_plays', {
      method: 'POST',
      body: JSON.stringify(newScores),
      mode: 'no-cors',
    })
    const newTopPlays = await res.json()
    console.log(newTopPlays)
  }

  if (message.message === 'save_tokens') {
    const token = message.data

    await browser.storage.sync.set({
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      expires_in: token.expires_in,
    })
  }
})
