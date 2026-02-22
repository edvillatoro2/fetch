export async function getVideosFromBackground(): Promise<any[]> {
  return new Promise((resolve) => {
    globalThis.chrome.runtime.sendMessage({ type: 'GET_VIDEOS' }, (res) => {
      resolve(res?.videos ?? [])
    })
  })
}

export async function setVideosInBackground(videos: any[]): Promise<void> {
  return new Promise((resolve) => {
    globalThis.chrome.runtime.sendMessage({ type: 'SET_VIDEOS', videos }, () => resolve())
  })
}

export async function getTokenFromBackground(): Promise<string | null> {
  return new Promise((resolve) => {
    globalThis.chrome.runtime.sendMessage({ type: 'GET_TOKEN' }, (res) => {
      resolve(res?.token ?? null)
    })
  })
}

export async function setTokenInBackground(token: string): Promise<void> {
  return new Promise((resolve) => {
    globalThis.chrome.runtime.sendMessage({ type: 'SET_TOKEN', token }, () => resolve())
  })
}

export async function clearBackground(): Promise<void> {
  return new Promise((resolve) => {
    globalThis.chrome.runtime.sendMessage({ type: 'CLEAR' }, () => resolve())
  })
}