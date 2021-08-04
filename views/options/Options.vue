<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <pixelarticons-sliders class="icon-btn mx-2 text-2xl" />
    <div>Options</div>
    <p class="mt-2 opacity-50">
      Configure PippiTrack
    </p>

    <div class="flex justify-center mt-6 mb-8">
      {{ isKeyValid ? '✔️ PippiTrack is working' : '❌ PippiTrack is deactivated' }}
    </div>

    <button v-if="!isKeyValid" class="bg-pink-700 text-white p-4 rounded-full" @click="login">
      Login with osu!
    </button>

    <button v-if="isKeyValid" class="bg-red-500 text-white p-4 rounded-full" @click="logout">
      Logout from osu!
    </button>

    <div class="mt-4">
      <a href="https://github.com/KeziahMoselle/pippi-track">PippiTrack Source</a>
      <a href="https://github.com/KeziahMoselle/pippitrack-extension">PippiTrack Extension Source</a>
    </div>
  </main>
</template>

<script setup lang="ts">
import { browser } from 'webextension-polyfill-ts'
import { isKeyValid } from '~/logic/storage'
const redirectUri = browser.identity.getRedirectURL('osu')

async function login() {
  const url = new URL('https://osu.ppy.sh/oauth/authorize')
  url.searchParams.append('client_id', '8497')
  url.searchParams.append('redirect_uri', redirectUri)
  url.searchParams.append('response_type', 'code')
  url.searchParams.append('scope', 'public')

  try {
    const redirectUrl = await browser.identity.launchWebAuthFlow({
      url: url.href,
      interactive: true,
    })

    const code = new URL(redirectUrl).searchParams.get('code')

    const response = await fetch('https://pippitrack.keziahmoselle.fr/api/get_token', {
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
</script>
