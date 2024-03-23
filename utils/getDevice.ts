export type Device = "mobile" | "desktop"

export const getDevice = (userAgent) => {
    let device: Device = "desktop";
    if (userAgent && userAgent !== "") {
        const isMobile = userAgent.match(
            /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        );
        if (isMobile && isMobile?.length > 0) {
            device = "mobile";
        }
    }
    return device;
};
