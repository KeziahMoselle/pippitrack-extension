import { browser } from 'webextension-polyfill-ts'

browser.runtime.onInstalled.addListener((): void => {
  browser.runtime.openOptionsPage()
})

browser.runtime.onMessage.addListener(async(message) => {
  try {
    if (message.message === 'send_top_plays') {
      const { userId } = message.data

      const { access_token } = await refreshToken()

      try {
        await fetch(`https://pippitrack.keziahmoselle.fr/api/user_tracked?osu_id=${userId}`)
      }
      catch {
        return
      }

      const newScores = await fetch(`https://osu.ppy.sh/api/v2/users/${userId}/scores/best?mode=osu&limit=100`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: 'application/json',
        },
      }).then(res => res.json())

      await fetch('https://pippitrack.keziahmoselle.fr/api/top_plays', {
        method: 'POST',
        body: JSON.stringify(newScores),
      }).then(res => res.json())
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
  const { access_token, refresh_token, expires_in } = await browser.storage.sync.get()

  const expiresAt = new Date(expires_in)

  if (
    (expiresAt && new Date() > expiresAt)
    || !expiresAt
  ) {
    const newToken = await fetch('https://pippitrack.keziahmoselle.fr/api/get_token?grant_type=refresh_token', {
      method: 'POST',
      body: refresh_token,
    }).then(res => res.json())

    await browser.storage.sync.set({
      access_token: newToken.access_token,
      refresh_token: newToken.refresh_token,
      expires_in: new Date(Date.now() + newToken.expires_in * 1000).toISOString(),
    })

    return {
      access_token: newToken.access_token,
    }
  }

  return {
    access_token,
  }
}
