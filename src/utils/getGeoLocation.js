const getGeoLocation = () => {
  let geo = {}
  navigator.geolocation.getCurrentPosition((position) => {
    geo.latitude = position.coords.latitude
    geo.longitude = position.coords.longitude
  })
  return geo
}

module.exports = getGeoLocation
