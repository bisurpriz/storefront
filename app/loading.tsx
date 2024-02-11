import Spinner from '@/components/Spinner';

export default function Loading() {
  return (
    <div className="w-full flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm z-50">
      <Spinner />
    </div>
  );
}
