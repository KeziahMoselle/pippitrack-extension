import type { Manifest } from 'webextension-polyfill-ts'
import pkg from '../package.json'
import { isDev, port } from '../scripts/utils'

export async function getManifest(): Promise<Manifest.WebExtensionManifest> {
  // update this file to update this manifest.json
  // can also be conditional based on your need
  return {
    manifest_version: 2,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    browser_action: {
      default_icon: './public/icon-512.png',
      default_popup: './dist/popup/index.html',
    },
    options_ui: {
      page: './dist/options/index.html',
      open_in_tab: true,
      chrome_style: false,
    },
    background: {
      scripts: ['./dist/background/index.global.js'],
      persistent: false,
    },
    content_scripts: [
      {
        matches: ['http://osu.ppy.sh/users/*', 'https://osu.ppy.sh/users/*'],
        js: ['./dist/content/index.global.js'],
      },
    ],
    icons: {
      16: './public/icon-512.png',
      48: './public/icon-512.png',
      128: './public/icon-512.png',
    },
    permissions: [
      'tabs',
      'identity',
      'storage',
      'http://osu.ppy.sh/*',
      'https://osu.ppy.sh/*',
    ],
    // this is required on dev for Vite script to load
    content_security_policy: isDev
      ? `script-src \'self\' http://localhost:${port}; object-src \'self\'`
      : undefined,
  }
}
