import { TfiGift } from 'react-icons/tfi';

const Information = () => {
  return (
    <div className="h-full w-2/5 grid gap-8 grid-cols-3 max-sm:grid-cols-1">
      {[1, 2, 3].map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-center rounded-lg text-6xl"
        >
          <TfiGift />
        </div>
      ))}
    </div>
  );
};

export default Information;
