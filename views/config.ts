import { browser } from 'webextension-polyfill-ts'

const redirectUri = browser.identity.getRedirectURL('osu')
const clientId = '8497'

export {
  redirectUri,
  clientId,
}
