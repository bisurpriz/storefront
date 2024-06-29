import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";

export const GoogleTagManagerInjector: React.FC = () => {
  if (process.env.NODE_ENV === "development") null;

  return (
    <>
      <GoogleAnalytics gaId="G-3D8JGLH5SJ" />
      <GoogleTagManager gtmId="GTM-W955HJVG" />
    </>
  );
};
