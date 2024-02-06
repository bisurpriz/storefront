import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

type ContentProps = {
  children: React.ReactNode;
};

const Content = ({ children }: ContentProps) => {
  return (
    <Suspense fallback={<>Loading ...</>}>
      <Toaster />
      <main className="content-height max-sm:content-height-sm h-full md:container pt-6 p-0 px-4 mx-auto scroll-smooth">
        {children}
      </main>
    </Suspense>
  );
};

export default Content;
