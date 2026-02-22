export function getQueryParams() {
  const params = new URLSearchParams(window.location.search)
  return {
    clientId: params.get('client_id') || '',
    // support both ?loc= and ?location_id=
    locationId: params.get('loc') || params.get('location_id') || '',
  }
}
