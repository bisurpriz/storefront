export const createJSONLd = ({ data, type, context }: {
    type: string;
    context?: string;
    data: Record<string, any>;
}) => {
    const jsonLd = {
        '@context': context || 'https://schema.org',
        '@type': type,
        ...data,
    };

    return JSON.stringify(jsonLd);

};