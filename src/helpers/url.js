export function addService (history, systemName) {
  const currentUrlParams = new URLSearchParams(window.location.search)
  currentUrlParams.set('service', systemName)
  history.push(window.location.pathname + '?' + currentUrlParams.toString())
}

export function clearService (history) {
  const currentUrlParams = new URLSearchParams(window.location.search)
  currentUrlParams.delete('service')
  history.push(window.location.pathname)
}
