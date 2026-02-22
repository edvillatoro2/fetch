// In-memory store
let cachedVideos: any[] = []
let cachedToken: string | null = null

chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId })
})

// Listen for messages from sidepanel
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_VIDEOS') {
    sendResponse({ videos: cachedVideos })
    return true
  }

  if (message.type === 'SET_VIDEOS') {
    cachedVideos = message.videos
    sendResponse({ ok: true })
    return true
  }

  if (message.type === 'GET_TOKEN') {
    sendResponse({ token: cachedToken })
    return true
  }

  if (message.type === 'SET_TOKEN') {
    cachedToken = message.token
    sendResponse({ ok: true })
    return true
  }

  if (message.type === 'CLEAR') {
    cachedVideos = []
    cachedToken = null
    sendResponse({ ok: true })
    return true
  }
})