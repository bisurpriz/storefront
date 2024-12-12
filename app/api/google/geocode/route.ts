import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get("placeId");
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!placeId) {
    return NextResponse.json(
      { error: "placeId parametresi gerekli." },
      { status: 400 },
    );
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?place_id=${encodeURIComponent(
      placeId,
    )}&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      const errorMessage =
        data.error_message || "Geocode isteğinde bir hata oluştu.";
      return NextResponse.json(
        { error: errorMessage, details: data },
        { status: 500 },
      );
    }

    return NextResponse.json(data.results);
  } catch (error: any) {
    console.error("Hata:", error);
    return NextResponse.json(
      { error: "Sunucu hatası.", details: error.message },
      { status: 500 },
    );
  }
}
