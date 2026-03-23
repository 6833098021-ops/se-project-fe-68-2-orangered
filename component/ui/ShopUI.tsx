import Image from "next/image"
import ReservationForm from "../FormComponent/ReservationForm";

const PLACEHOLDER_IMG =
  "https://i.pinimg.com/1200x/4b/35/23/4b352395a4843dd059b7eb96444433ff.jpg";

export default function ShopUI({shop}:{shop: ShopItem}){
    const isValidUrl =
    shop.picture && shop.picture.includes("//") && shop.picture.includes(".");
  const displayImage = isValidUrl ? shop.picture : PLACEHOLDER_IMG;

  return(
    <div className="flex flex-col md:flex-row">
      <div className="relative w-full md:w-1/2 h-80 md:h-auto overflow-hidden">
        <Image
          src={displayImage}
          alt={shop.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e2d3d] via-transparent to-transparent opacity-60 md:hidden" />
      </div>

      <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-center">
        <h1 className="text-3xl font-serif tracking-[0.2em] uppercase text-gray-100 mb-6">
          {shop.name}
        </h1>

        <div className="space-y-4 font-mono text-sm tracking-tighter text-gray-300 uppercase">
          <div className="flex items-center gap-4 border-b border-gray-700/50 pb-2">
            <span className="text-blue-400 font-bold w-16">TIME</span>
            <span>
              OPEN: {shop.openClose.open} — CLOSE: {shop.openClose.close}
            </span>
          </div>

          <div className="flex items-start gap-4 border-b border-gray-700/50 pb-2">
            <span className="text-blue-400 font-bold w-16">ADDR</span>
            <span className="leading-relaxed">
              {shop.address.street}, {shop.address.district}, <br />
              {shop.address.province} {shop.address.postalcode}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-blue-400 font-bold w-16">TEL</span>
            <span className="tracking-[0.1em]">{shop.tel}</span>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-blue-500/20">
          <p className="text-[11px] uppercase tracking-[0.4em] text-blue-400 mb-4">
            — Make a Reservation —
          </p>

          <ReservationForm shop={shop}/>
        </div>
      </div>
    </div>
  )
}