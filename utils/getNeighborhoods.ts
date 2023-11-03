import axios from "axios";

export async function getNeighborhoods(
  latitude: number,
  longitude: number,
  radius: number
): Promise<{
  neighborhoods: any | undefined;
  error_message: string | undefined;
}> {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=all&key=AIzaSyCgv7QzN3dvH61_zUPRU3HH997J6Feo4Vs`;
  const response = await axios.get(url);

  if (response.status === 200) {
    const { results, error_message } = response.data;
    const neighborhoods = results?.map((place: any) => {
      return place ?? "";
    });

    return { neighborhoods, error_message };
  } else {
    throw new Error(`API error: ${response.status}`);
  }
}
