import { useLocalStorage } from '@vueuse/core'

export const isKeyValid = useLocalStorage('is-key-valid', false, { listenToStorageChanges: true })
