# PostHog Integration

This directory contains the PostHog integration for the Next.js application. PostHog is used for analytics, feature flags, session recording, and more.

## Files

- `PostHogProvider.tsx`: A React provider component that initializes PostHog and provides it to the application.
- `posthog.ts`: A utility file with common PostHog operations.

## Environment Variables

The following environment variables are required for PostHog to work:

- `NEXT_PUBLIC_POSTHOG_KEY`: Your PostHog API key.
- `NEXT_PUBLIC_POSTHOG_HOST`: Your PostHog host URL (default: `https://us.i.posthog.com`).

These are already set in the `.env` file.

## Usage

### Tracking Events

To track events, use the `usePostHog` hook:

```tsx
import { usePostHog } from '@/hooks/usePostHog';

function MyComponent() {
  const { track } = usePostHog();

  const handleClick = () => {
    track('button_clicked', {
      button_name: 'Add to Cart',
      product_id: '123',
    });
  };

  return <button onClick={handleClick}>Add to Cart</button>;
}
```

### Identifying Users

Users are automatically identified in the `PostHogUserIdentifier` component, which is included in the root layout. If you need to identify a user manually, you can use the `identify` method:

```tsx
import { usePostHog } from '@/hooks/usePostHog';

function MyComponent() {
  const { identify } = usePostHog();

  const handleLogin = (userId) => {
    identify(userId, {
      name: 'John Doe',
      email: 'john@example.com',
    });
  };

  return <button onClick={() => handleLogin('123')}>Login</button>;
}
```

### Using Pre-defined Events

For common events, you can use the `usePostHogEvents` hook:

```tsx
import { usePostHogEvents } from '@/hooks/usePostHogEvents';

function ProductCard({ product }) {
  const { trackProductView, trackAddToCart } = usePostHogEvents();

  useEffect(() => {
    trackProductView(product);
  }, [product, trackProductView]);

  const handleAddToCart = () => {
    trackAddToCart(product);
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}
```

## Features

- **Automatic Page View Tracking**: Page views are automatically tracked when the route changes.
- **User Identification**: Users are identified with their user ID when authenticated, or with a guest ID when anonymous.
- **Session Recording**: Session recording is enabled by default.
- **Event Tracking**: Common events like product views, add to cart, checkout, etc. are pre-defined.
- **Custom Events**: You can track custom events with the `track` method.

## Best Practices

- Always check if the code is running on the client side before using PostHog.
- Use the pre-defined events when possible for consistency.
- Include relevant properties with each event.
- Don't track sensitive information like passwords, credit card numbers, etc.
- Use the `usePostHog` hook for advanced usage.
- Use the `usePostHogEvents` hook for common events. 
