import { NextRequest, NextResponse } from "next/server";

// API yanıt tipleri için interface tanımları
interface PlacesApiResponse {
  status: string;
  predictions: Array<{
    description: string;
    place_id: string;
    structured_formatting: {
      main_text: string;
      secondary_text: string;
    };
  }>;
  error_message?: string;
}

interface ErrorResponse {
  error: string;
  details?: unknown;
}

// Sabit değerler
const CONFIG = {
  BASE_URL: "https://maps.googleapis.com/maps/api/place/autocomplete/json",
  DEFAULT_LANGUAGE: "tr",
  COUNTRY: "tr",
  CACHE_DURATION: 60 * 5, // 5 dakika
} as const;

// Rate limiting için basit bir Map
const requestCounts = new Map<string, { count: number; timestamp: number }>();

// Rate limit kontrolü
function checkRateLimit(sessionId: string): boolean {
  const now = Date.now();
  const userRequests = requestCounts.get(sessionId);

  if (!userRequests) {
    requestCounts.set(sessionId, { count: 1, timestamp: now });
    return true;
  }

  // Son 1 dakika içindeki istekleri kontrol et
  if (now - userRequests.timestamp < 60 * 1000) {
    if (userRequests.count >= 20) return false; // Dakikada max 20 istek
    userRequests.count++;
    return true;
  }

  // Süre geçmişse sıfırla
  requestCounts.set(sessionId, { count: 1, timestamp: now });
  return true;
}

// Cache için Map
const cache = new Map<string, { data: PlacesApiResponse; timestamp: number }>();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")?.trim();
    const language = searchParams.get("language") || CONFIG.DEFAULT_LANGUAGE;

    // Session kontrolü
    const session =
      request.cookies.get("user_id")?.value ||
      request.cookies.get("guest_id")?.value;
    if (!session) {
      return NextResponse.json<ErrorResponse>(
        { error: "Kullanıcı kimliği (user_id veya guest_id) gerekli." },
        { status: 401 },
      );
    }

    // Query kontrolü
    if (!query) {
      return NextResponse.json<ErrorResponse>(
        { error: "Query parametresi gerekli." },
        { status: 400 },
      );
    }

    // Rate limit kontrolü
    if (!checkRateLimit(session)) {
      return NextResponse.json<ErrorResponse>(
        { error: "Çok fazla istek gönderildi. Lütfen biraz bekleyin." },
        { status: 429 },
      );
    }

    // Cache kontrolü
    const cacheKey = `${query}-${language}`;
    const cachedResult = cache.get(cacheKey);
    if (
      cachedResult &&
      Date.now() - cachedResult.timestamp < CONFIG.CACHE_DURATION * 1000
    ) {
      return NextResponse.json(cachedResult.data);
    }

    // API URL oluşturma
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = new URL(CONFIG.BASE_URL);
    url.searchParams.append("input", query);
    url.searchParams.append("key", apiKey!);
    url.searchParams.append("language", language);
    url.searchParams.append("sessiontoken", session);
    url.searchParams.append("types", "geocode");
    url.searchParams.append("components", `country:${CONFIG.COUNTRY}`);

    // API isteği
    const response = await fetch(url.toString(), {
      headers: {
        "Accept-Language": language,
      },
      next: {
        revalidate: CONFIG.CACHE_DURATION, // Next.js cache kontrolü
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PlacesApiResponse = await response.json();

    // API yanıt kontrolü
    if (data.status !== "OK") {
      const errorMessage =
        data.error_message || "Google Places API isteğinde hata oluştu.";
      return NextResponse.json<ErrorResponse>(
        { error: errorMessage, details: data },
        { status: 500 },
      );
    }

    // Başarılı sonucu cache'le
    cache.set(cacheKey, { data, timestamp: Date.now() });

    // Cache-Control header'ı ile yanıt
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": `public, s-maxage=${CONFIG.CACHE_DURATION}, stale-while-revalidate`,
      },
    });
  } catch (error) {
    console.error("Places API Error:", error);
    return NextResponse.json<ErrorResponse>(
      {
        error: "Sunucu hatası.",
        details: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 },
    );
  }
}
