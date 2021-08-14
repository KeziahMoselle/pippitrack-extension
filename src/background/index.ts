/* eslint-disable no-console */
import { browser } from 'webextension-polyfill-ts'

browser.runtime.onInstalled.addListener((): void => {
  browser.runtime.openOptionsPage()
})

browser.runtime.onMessage.addListener(async(message) => {
  try {
    if (message.message === 'send_top_plays') {
      const { userId, mode } = message.data

      const { access_token } = await refreshToken()

      const newScores = await fetch(`https://osu.ppy.sh/api/v2/users/${userId}/scores/best?mode=${mode}&limit=100`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: 'application/json',
        },
      }).then(res => res.json())

      const response = await fetch('https://pippitrack.keziahmoselle.fr/api/top_plays', {
        method: 'POST',
        body: JSON.stringify(newScores),
      }).then(res => res.json())

      console.log(response)
    }

    if (message.message === 'save_tokens') {
      const token = message.data

      await browser.storage.sync.set({
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        expires_in: new Date(Date.now() + token.expires_in * 1000).toISOString(),
      })
    }
  }
  catch (error) {
    console.error(error)
  }
})

interface Token {
  access_token: string
}

async function refreshToken(): Promise<Token> {
  console.log('Refresh token')
  const { access_token, refresh_token, expires_in } = await browser.storage.sync.get()

  const expiresAt = new Date(expires_in)

  console.log(expiresAt)
  console.log(new Date() > expiresAt)

  if (
    (expiresAt && new Date() > expiresAt)
    || !expiresAt
  ) {
    console.log('osu! API v2 access_token is expired')
    const newToken = await fetch('http://127.0.0.1:3000/api/get_token?grant_type=refresh_token', {
      method: 'POST',
      body: refresh_token,
    }).then(res => res.json())

    console.log('new Token', newToken)

    await browser.storage.sync.set({
      access_token: newToken.access_token,
      refresh_token: newToken.refresh_token,
      expires_in: new Date(Date.now() + newToken.expires_in * 1000).toISOString(),
    })

    return {
      access_token: newToken.access_token,
    }
  }

  console.log('Same token')

  return {
    access_token,
  }
}
