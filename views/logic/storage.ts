import { useLocalStorage } from '@vueuse/core'

export const osuApiKey = useLocalStorage('osu-api-key', '', { listenToStorageChanges: true })
export const isKeyValid = useLocalStorage('is-key-valid', false, { listenToStorageChanges: true })
