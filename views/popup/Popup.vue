<template>
  <main class="w-[350px] px-4 py-5 text-center text-white flex justify-between">
    <div class="background"></div>
    <div class="w-16">
      <Logo />
    </div>

    <div class="flex-grow">
      <h1 class="font-bold">
        PippiTrack
      </h1>
      <p
        class="mt-2 opacity-50"
      >
        {{ isKeyValid ? '' : 'Please log in via osu!' }}
      </p>

      <div class="mt-2">
        <div v-if="isKeyValid" class="inline-flex items-center px-3 py-1 rounded-full bg-white text-black">
          <Status /> Watching top plays...
        </div>

        <button v-if="!isKeyValid" class="btn bg-pink-700" @click="login">
          Log in with osu!
        </button>
      </div>
    </div>

    <div>
      <div v-if="isKeyValid" class="px-3 py-1 rounded-full bg-white text-black hover:bg-gray-200 transition-colors cursor-pointer" @click="openOptionsPage">
        <pixelarticons-sliders />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { browser } from 'webextension-polyfill-ts'
import { isKeyValid } from '~/logic/storage'
import { login } from '~/logic/oauth'

function openOptionsPage() {
  browser.runtime.openOptionsPage()
}
</script>

<style>
  .background {
    z-index: -1;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(0);
    animation: backgroundTranslateY 30s ease infinite alternate;
  }

  .background::before {
    content: "";
    position: absolute;
    width: 200vw;
    height: 900vh;
    top: -50%;
    left: -50%;
    background: url('/public/background.png') 0 0 no-repeat;
    transform: translateY(0);
  }

  @keyframes backgroundTranslateY {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(-400px);
    }
  }
</style>
