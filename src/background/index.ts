import { browser } from 'webextension-polyfill-ts'

browser.runtime.onInstalled.addListener((): void => {
  browser.runtime.openOptionsPage()
})

browser.runtime.onMessage.addListener(async(message) => {
  try {
    const response = await fetch(`https://osu.ppy.sh/api/get_user?k=${message.data}&u=0&type=id`)
    const data = await response.json()

    // That means there is no error
    if (data.length === 0)
      return true

    return false
  }
  catch (error) {
    console.error(error)
    return false
  }
})
