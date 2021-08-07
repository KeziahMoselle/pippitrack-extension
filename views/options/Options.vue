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

    <div class="flex flex-col gap-2 mt-8">
      <a href="https://github.com/KeziahMoselle/pippi-track">PippiTrack Source</a>
      <a href="https://github.com/KeziahMoselle/pippitrack-extension">PippiTrack Extension Source</a>
    </div>
  </main>
</template>

<script setup lang="ts">
import { login, logout } from '~/logic/oauth'
import { isKeyValid } from '~/logic/storage'
</script>
