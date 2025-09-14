import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";
import { Button } from "antd";
import Link from "next/link";

const HomeSlider = async ({ isAuth }: { isAuth: boolean | null | string }) => {
  return (
    <header className="container mt-[25px] max-sm:mt-[20px]">
      <div className="flex items-center max-lg:items-start max-lg:flex-col-reverse justify-between max-lg:mt-1 max-lg:mb-5 mb-12">
        <div className="max-md:mt-5 max-lg:hidden block">
          <div className="max-w-[700px] max-lg:w-full">
            <h1 className="text-7xl max-md:text-4xl text-blue-600">
              <strong className="block">Nordik</strong>
              <span className="block">
                ilmiy-amaliy elektron <br /> jurnali
              </span>
            </h1>
          </div>
          <div className="flex flex-wrap max-sm:mt-7 justify-start mt-14 gap-6">
            <Link
              href={`${isAuth ? "/createarticle" : "/register?fromhome=true"}`}
            >
              <Button className="bg-gradient-to-r from-blue-500 shadow-2xl via-sky-400 to-teal-400 px-6 py-6 text-xl text-white">
                Maqola yuborish
              </Button>
            </Link>
          </div>
        </div>
        <Image
          src={"/jurnal.jpg"}
          width={500}
          height={600}
          quality={75}
          priority
          className="h-auto w-[500px] max-lg:h-[600px] max-lg:object-cover max-sm:h-auto max-sm:object-contain max-lg:w-full drop-shadow-2xl rounded-2xl"
          alt="header_image"
        />
      </div>
    </header>
  );
};

export default HomeSlider;
