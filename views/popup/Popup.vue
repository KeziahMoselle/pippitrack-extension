<template>
  <main class="w-[300px] px-4 py-5 text-center text-gray-700">
    <Logo />
    <div>PippiTrack</div>
    <p class="mt-2 opacity-50">
      {{ isKeyValid ? '' : 'You need to setup your osu! API key' }}
    </p>
    <button class="btn mt-2" @click="openOptionsPage">
      Open Options
    </button>
    <div class="mt-2">
      <span class="opacity-50">osu! API key:</span> {{ isKeyValid ? '✔️' : '❌' }}
    </div>
  </main>
</template>

<script setup lang="ts">
import { browser } from 'webextension-polyfill-ts'
import { isKeyValid } from '~/logic/storage'

function openOptionsPage() {
  browser.runtime.openOptionsPage()
}
</script>
