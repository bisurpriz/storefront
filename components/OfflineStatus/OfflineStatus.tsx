"use client";

import useOnlineStatus from "@/hooks/useOnlineStatus";

const OfflineStatus = () => {
  const handleReload = () => {
    window.location.reload();
  };

  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-red-500 py-2 text-center text-white">
      <p className="text-sm">
        Şuan internet bağlantınız yok. Lütfen internet bağlantınızı kontrol
        edin.
      </p>
      <button
        className="rounded-sm bg-white px-2 py-1 text-red-500"
        onClick={handleReload}
      >
        Yeniden dene
      </button>
    </div>
  );
};

export default OfflineStatus;
