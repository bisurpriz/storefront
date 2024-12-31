"use client";

interface JsonLdProps {
  data: Record<string, any>;
  /** Specify the type of schema being used */
  type?: "@context" | "@type" | "schema" | string;
}

const JsonLd = ({ data, type = "schema" }: JsonLdProps) => {
  const safeData = () => {
    try {
      const sanitizedData = JSON.stringify(data, (_, value) => {
        if (typeof value === "string") {
          return value
            .replace(/[<>]/g, "")
            .replace(/javascript:/gi, "")
            .replace(/data:/gi, "")
            .trim();
        }
        return value;
      });

      // Validate JSON structure
      const parsedData = JSON.parse(sanitizedData);

      // Ensure required fields are present
      if (!parsedData["@context"]) {
        parsedData["@context"] = "https://schema.org";
      }

      if (!parsedData["@type"] && type) {
        parsedData["@type"] = type;
      }

      return JSON.stringify(parsedData);
    } catch (error) {
      console.error("Error processing JSON-LD data:", error);
      return "{}";
    }
  };
  const jsonld = safeData();

  if (jsonld === "{}") {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonld }}
      key={`jsonld-${type}`}
    />
  );
};

export default JsonLd;
