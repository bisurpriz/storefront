"use client";

import useOnlineStatus from "@/hooks/useOnlineStatus";

const OfflineStatus = () => {
  const handleReload = () => {
    window.location.reload();
  };

  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-red-500 text-white text-center py-2 z-50">
      <p className="text-sm">
        Şuan internet bağlantınız yok. Lütfen internet bağlantınızı kontrol
        edin.
      </p>
      <button
        className="bg-white text-red-500 px-2 py-1 rounded-sm"
        onClick={handleReload}
      >
        Yeniden dene
      </button>
    </div>
  );
};

export default OfflineStatus;
