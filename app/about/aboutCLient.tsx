"use client";
import React from "react";
import RoundedSvg from "@/app/components/helpers/RoundeSvg";
import Image from "next/image";
import { Button, Collapse } from "antd";
import "swiper/css";
import "swiper/css/navigation";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Panel } from "rc-collapse";
import DirectorsCard from "@/app/about/direcctors.cars";
import "react-quill/dist/quill.snow.css";
interface AboutProps {
  aboutData: any;
}

const AboutClient: React.FC<AboutProps> = ({ aboutData }) => {
  return (
    <section className="mt-6">
      <article className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-3/4">
            <RoundedSvg title="“Nordic” ilmiy-amaliy elektron jurnali" />
            <p
              className="ql-editor pt-4 pb-4"
              dangerouslySetInnerHTML={{ __html: aboutData?.info?.text }}
            />
            <RoundedSvg title="Tahririyat hayati" />
            <DirectorsCard directors={aboutData?.directors} />

            <RoundedSvg title="Tahririyat a'zolari" />
            <table className="min-w-full mt-5 border border-gray-300">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-2">F.I.O</th>
                  <th className="px-4 py-2">Yo‘nalish</th>
                  <th className="px-4 py-2">Davlat</th>
                </tr>
              </thead>
              <tbody>
                {aboutData?.members?.map((member: any) => (
                  <tr key={member.id} className="odd:bg-gray-100 even:bg-white">
                    <td className="px-4 py-2 border">{member.full_name}</td>
                    <td className="px-4 py-2 border">{member.direction}</td>
                    <td className="px-4 py-2 border">{member.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full lg:w-1/4 space-y-6">
            <RoundedSvg title="Litsenziya" />
            <Image
              src="/about-journal-desktop.jpg"
              alt="Litsenziya"
              width={400}
              height={300}
              className="rounded-md"
            />
            <Button
              type="primary"
              size="large"
              className="w-full"
              href="/pdf/nordic2.pdf"
              download
            >
              Yuklab olish
            </Button>

            <RoundedSvg title="Ko’p beriladigan savollar" />
            <Collapse
              className="border-x-0 rounded-none about-accordion"
              accordion
              expandIcon={({ isActive }) =>
                isActive ? (
                  <MinusOutlined className="text-[#6C758F]" />
                ) : (
                  <PlusOutlined />
                )
              }
            >
              {aboutData.faqs?.map((faq: any) => (
                <Panel
                  header={
                    <span className="font-semibold text-[#333]">
                      {faq.question}
                    </span>
                  }
                  key={faq.id}
                  className="border-b"
                >
                  <p className="text-gray-700">{faq.answer}</p>
                </Panel>
              ))}
            </Collapse>
            <RoundedSvg title="Tahririyat manzili" />
            <p>
              100143, O‘zbekiston, Toshkent, Chilonzor tumani, Bunyodkor 8/2-uy
            </p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2997.9924872348065!2d69.21628937629741!3d41.28726797131278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b359ab47501%3A0x618cedae4747d331!2sNordic%20International%20University!5e0!3m2!1sru!2s!4v1738567644181!5m2!1sru!2s"
              height="300"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </article>
    </section>
  );
};

export default AboutClient;
