export const createMap = (
  id: string = "map",
  options?: naver.maps.MapOptions,
) => {
  return new naver.maps.Map(id, {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: naver.maps.MapTypeControlStyle.BUTTON,
      position: naver.maps.Position.LEFT_TOP,
      mapTypeIds: [
        naver.maps.MapTypeId.HYBRID,
        naver.maps.MapTypeId.NORMAL,
        naver.maps.MapTypeId.SATELLITE,
        naver.maps.MapTypeId.TERRAIN,
      ],
    },
    zoomControl: true,
    zoomControlOptions: {
      style: naver.maps.ZoomControlStyle.SMALL,
      position: naver.maps.Position.RIGHT_TOP,
    },
    ...options,
  })
}

export function getBoundsByPoints(
  points: { lat: number; lon: number }[],
): naver.maps.LatLngBounds {
  if (points.length < 2) {
    throw new Error("At least two points are required to calculate bounds")
  }

  const bounds = new naver.maps.LatLngBounds(
    new naver.maps.LatLng(points[0].lat, points[0].lon),
    new naver.maps.LatLng(points[0].lat, points[0].lon),
  )

  points.forEach(({ lat, lon }) => {
    bounds.extend(new naver.maps.LatLng(lat, lon))
  })

  return bounds
}

