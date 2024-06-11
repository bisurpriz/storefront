import { GoogleTagManager } from "@next/third-parties/google";

export const GoogleTagManagerInjector: React.FC = () => {
  if (process.env.NODE_ENV === "development") null;

  return (
    <>
      <GoogleTagManager gtmId="GTM-W955HJVG" />
    </>
  );
};
