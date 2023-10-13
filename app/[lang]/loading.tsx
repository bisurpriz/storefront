import Image from "next/image";

export default function Loading() {
  return (
    <div id="preloader-active">
      <div className="preloader d-flex align-items-center justify-content-center">
        <div className="preloader-inner position-relative">
          <div className="text-center">
            <Image
              src="/assets/imgs/theme/loading.gif"
              alt="bisurpriz"
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
