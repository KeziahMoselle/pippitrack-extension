import { browser } from 'webextension-polyfill-ts'
import { clientId, redirectUri } from '~/config'
import { isKeyValid } from '~/logic/storage'

async function login() {
  const url = new URL('https://osu.ppy.sh/oauth/authorize')
  url.searchParams.append('client_id', clientId)
  url.searchParams.append('redirect_uri', redirectUri)
  url.searchParams.append('response_type', 'code')
  url.searchParams.append('scope', 'public')

  try {
    const redirectUrl = await browser.identity.launchWebAuthFlow({
      url: url.href,
      interactive: true,
    })

    const code = new URL(redirectUrl).searchParams.get('code')

    const response = await fetch('https://api.pippitrack.com/v1/get_token', {
      method: 'POST',
      body: code,
    })

    const token = await response.json()

    isKeyValid.value = true

    browser.runtime.sendMessage({
      message: 'save_tokens',
      data: {
        access_token: token.access_token,
        refresh_token: token.refresh_token,
        expires_in: token.expires_in,
      },
    })
  }
  catch (error) {
    console.error(error)
    isKeyValid.value = false
  }
}

async function logout() {
  browser.runtime.sendMessage({
    message: 'save_tokens',
    data: {
      access_token: undefined,
      refresh_token: undefined,
      expires_in: 0,
    },
  })
  isKeyValid.value = false
}

export {
  login,
  logout,
}
