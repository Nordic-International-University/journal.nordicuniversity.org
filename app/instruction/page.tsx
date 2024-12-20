import React from "react";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";
import emirate from "@/public/emirate.jpg";
import Image from "next/image";
import { Button } from "antd";

export const metadata = {
  title: "Ilmiy Maqolaga Qo‘yilgan Talablar | Nordic Jurnali",
  description:
    "Nordic Jurnali ilmiy maqolalar sahifasi, ilmiy maqolalarning tuzilishi va yozilish talablarini o‘rganing. Ushbu sahifa ilmiy maqolalarni tayyorlashda muhim bosqichlar haqida ma’lumot beradi.",
  keywords: [
    "ilmiy maqola talablari",
    "ilmiy maqola tuzilishi",
    "maqola yozish",
    "ilmiy maqola qismlari",
    "Nordic Jurnali",
  ],
  openGraph: {
    title: "Ilmiy Maqolaga Qo‘yilgan Talablar | Nordic Jurnali",
    description:
      "Nordic Jurnali maqolalar sahifasida ilmiy maqolalarni tayyorlash uchun zarur bo‘lgan barcha ma’lumotlarni oling.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/instruction`,
    type: "website",
    images: [
      {
        url: "/abstrakt.d8a2d89523158d92ef74.jpg",
        width: 800,
        height: 600,
        alt: "Nordic Jurnali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ilmiy Maqolaga Qo‘yilgan Talablar | Nordic Jurnali",
    description:
      "Ilmiy maqolalarni tayyorlash uchun kerakli barcha ma’lumotlar Nordic Jurnali sahifasida.",
    images: [
      {
        url: "/public/abstrakt.d8a2d89523158d92ef74.jpg",
        width: 800,
        height: 600,
        alt: "Nordic Jurnali",
      },
    ],
  },
};

export default async function Page() {
  return (
    <div className="container mx-auto px-4 mt-[25px] max-sm:mt-[20px]">
      <div className="mb-0 text-center">
        <RoundedSvg title="Ilmiy maqolaga qo‘yilgan talablar" />
      </div>
      <div className="flex items-center  justify-center w-full gap-4 pt-6 pb-12">
        <div className="flex max-lg:flex-col w-full max-w-full max-sm:rounded-md shadow-2xl shadow-blue-200 hover:shadow-xl transition-shadow duration-300 ease-in-out px-6 max-sm:px-0 py-6 rounded-[30px] bg-gradient-to-r from-blue-50 to-white">
          <div className="px-4 py-4 relative group">
            <h1 className="text-[#36187d] font-bold text-[15px] mb-4">
              <strong>1. ABSTRAKT (ANNOTATSIYA)</strong>
            </h1>
            <ul className="list-disc list-inside text-gray-700">
              <li>Muammoning qo‘yilishi;</li>
              <li>Metodologiyani aniqlash;</li>
              <li>Asosiy topilmalar;</li>
              <li>Umumiy xulosa.</li>
            </ul>
            {/* Tooltip */}
            <div className="tooltip group-hover:opacity-100">
              Muammoning qo‘yilishi, metodologiyani aniqlash, asosiy topilmalar,
              umumiy xulosa
            </div>

            {/* More Sections */}
            <h2 className="text-[#36187d] font-bold text-[15px] mt-6 mb-4">
              2. KIRISH
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Tadqiqot ob'yektini belgilab olish...</li>
              <li>Tadqiqotning borish jarayoni...</li>
              <li>ADABIYOTLAR SHARXI</li>
            </ul>
            <div className="tooltip group-hover:opacity-100">
              Tadqiqot ob'yektini belgilab olish, muammoning markazga
              qo‘yilishi, tadqiqotning borish jarayoni
            </div>

            <h2 className="text-[#36187d] font-bold text-[15px] mt-6 mb-4">
              3. METODOLOGIYA
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Ishonchli ma’lumotlarni yig‘ish...</li>
            </ul>
            <div className="tooltip group-hover:opacity-100">
              Ishonchli ma’lumotlarni yig‘ish va tahlil qilish metodikasi
            </div>
            <h1 className="text-[#36187d] font-bold text-[15px] mt-8">
              4. TADQIQOT NATIJASI
            </h1>
            <ul className="list-disc list-inside text-gray-700">
              <li>Olingan natijalarni izohlash...</li>
            </ul>
            <div className="tooltip group-hover:opacity-100">
              Tadqiqot natijalari va ularning tahlili
            </div>
          </div>

          <div className="w-1/2 px-4 py-4 relative group max-lg:w-full">
            <h2 className="text-[#36187d] font-bold text-[15px]  mb-4">
              5. DISKUSSIYA
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Kirish (ilmiy topilmalarni muhokama qilish...)</li>
              <li>Baholash (tahlil qilish...)</li>
              <li>Xulosa (tadqiqotning cheklanganligi...)</li>
            </ul>
            <div className="tooltip group-hover:opacity-100">
              Ilmiy topilmalarni muhokama qilish va ularni ishonchligini
              isbotlash, baholash, xulosa
            </div>

            <h2 className="text-[#36187d] font-bold text-[15px] mt-6 mb-4">
              6. XULOSA
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Xulosa aniq va qisqa, muammoning yechimiga qaratilgan...</li>
            </ul>
            <div className="tooltip group-hover:opacity-100">
              Xulosa aniq va qisqa, muammoning yechimiga qaratilgan va aniq
              takliflarga ega bo‘lishi lozim
            </div>

            <h2 className="text-[#36187d] font-bold text-[15px] mt-6 mb-4">
              7. TASHAKKURNOMA
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Tadqiqot davomida muallifga yordam berganlar...</li>
            </ul>
            <div className="tooltip group-hover:opacity-100">
              Tadqiqot davomida muallifga yordam berganlar uchun tashakkurnoma
            </div>

            <h2 className="text-[#36187d] font-bold text-[15px] mt-6 mb-4">
              8. ADABIYOTLAR RO‘YXATI
            </h2>
            <ul className="list-disc list-inside text-gray-700">
              <li>Foydalanilgan adabiyotlar ro‘yxati...</li>
            </ul>
            <div className="tooltip group-hover:opacity-100">
              Foydalanilgan adabiyotlar ro‘yxati
            </div>
          </div>
          <div className="max-w-[550px] max-sm:px-4 max-lg:w-full">
            <Image className="w-full" src={emirate} alt="Imrad talablari" />
            <Button
              download
              href="/pdf/IMRAD.pdf"
              className="w-full mt-4 h-10"
              type="primary"
            >
              Yo‘riqnomani yuklash
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
