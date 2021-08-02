<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <pixelarticons-sliders class="icon-btn mx-2 text-2xl" />
    <div>Options</div>
    <p class="mt-2 opacity-50">
      Configure PippiTrack
    </p>

    <div class="flex justify-center mt-6 mb-8">
      <label class="flex justify-center items-center flex-col">
        osu! API key {{ isKeyValid ? '✔️' : '❌' }}
        <input v-model="osuApiKey" placeholder="osu! API key" class="border border-gray-400 rounded px-2 py-1 mt-2" @input="debounceCheckKey" />
      </label>
    </div>

    <div class="mt-4">
      Powered by Vite <pixelarticons-zap class="align-middle" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { browser } from 'webextension-polyfill-ts'
import debounce from 'debounce'
import { osuApiKey, isKeyValid } from '~/logic/storage'

const debounceCheckKey = debounce(checkKey, 500)

async function checkKey(event: FocusEvent) {
  const target = event.target as HTMLInputElement
  const isValid = await browser.runtime.sendMessage({
    message: 'update_osu_api_key',
    data: target.value,
  })

  if (isValid)
    isKeyValid.value = true
  else
    isKeyValid.value = false
}
</script>
