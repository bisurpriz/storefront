export function isWithinBounds(
  lat: number,
  lng: number,
  bounds: { north: any; south: any; east: any; west: any }
) {
  return (
    lat >= bounds.south &&
    lat <= bounds.north &&
    lng >= bounds.west &&
    lng <= bounds.east
  );
}
