import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const language = searchParams.get("language") || "tr";
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const cookies = request.cookies;
  const session = cookies.get("user_id") || cookies.get("guest_id");

  if (!session) {
    return NextResponse.json(
      { error: "Kullanıcı kimliği (user_id veya guest_id) gerekli." },
      { status: 400 },
    );
  }

  if (!query) {
    return NextResponse.json(
      { error: "Query parametresi gerekli." },
      { status: 400 },
    );
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      query,
    )}&key=${apiKey}&language=${language}&sessiontoken=${session}&types=geocode&components=country:tr`; // Google Places API URL'si

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      const errorMessage =
        data.error_message || "Google Places API isteğinde hata oluştu.";
      return NextResponse.json(
        { error: errorMessage, details: data },
        { status: 500 },
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Hata:", error);
    return NextResponse.json(
      { error: "Sunucu hatası.", details: error.message },
      { status: 500 },
    );
  }
}
