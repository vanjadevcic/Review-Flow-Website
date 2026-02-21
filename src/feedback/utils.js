export function getQueryParams() {
  const params = new URLSearchParams(window.location.search)
  return {
    clientId: params.get('client_id') || '',
    locationId: params.get('loc') || '',
  }
}
