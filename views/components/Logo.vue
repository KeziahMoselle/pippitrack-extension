<template>
  <img :src="src" alt="Logo" />
</template>

<script>
const src = '/public/icon-512.png'

export default {
  setup() {
    return {
      src,
    }
  },
}
</script>
