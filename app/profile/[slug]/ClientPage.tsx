"use client"

import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {Table, Button, Collapse, Spin, Steps } from "antd";
import { FcDocument } from "react-icons/fc";
import dayjs from "dayjs";
import { BiDownload } from "react-icons/bi";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import Link from "next/link";

export const ArticleStatusEnum = {
  NEW: "NEW",
  PLAGIARISM: "PLAGIARISM",
  REVIEW: "REVIEW",
  PAYMENT: "PAYMENT",
  ACCEPT: "ACCEPT",
  REJECTED: "REJECTED",
};

const MyArticle = ({data}:any) => {
  const [stepsItems, setStepsItems] = useState([]);
  const [reject, setReject] = useState(0);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const initialSteps:any = [
      {
        title: "Yangi maqola",
        uniqueKey: "Yangi maqola",
        description: "Tekshirilmoqda",
        key: ArticleStatusEnum.NEW,
      },
      {
        title: "Antiplagiat",
        uniqueKey: "Antiplagiat",
        description: "O‘xshashlik darajasini aniqlash",
        key: ArticleStatusEnum.PLAGIARISM,
      },
      {
        title: "Taqriz",
        uniqueKey: "Taqriz",
        description: "Baholash va tahlil qilish jarayoni",
        key: ArticleStatusEnum.REVIEW,
      },
      {
        uniqueKey: "to'lov",
        title:
            currentStep === 3 ? (
                <Link
                    className="text-blue-500"
                    href={`${data?.transaction.transactions_link.click_link}&return_url=https://journal.nordicuniversity.uz${location.pathname}`}
                >
                  <img
                      className="w-20"
                      src="https://itmir.uz/image/catalog/MUSR/article-original.png"
                      alt=""
                  />
                </Link>
            ) : currentStep > 3 && data?.status === "ACCEPT" ? (
                "To‘lov qabul qilindi"
            ) : (
                "To'lov tasdiqlanishini kuting"
            ),
        description:
            currentStep === 3 ? (
                <Link
                    className="text-blue-500"
                    href={`${data?.transactions_link}&return_url=https://journal.nordicuniversity.org${location.pathname}`}
                >
                  To'lov qilish uchun bosing
                </Link>
            ) : currentStep > 3 && data?.status === "ACCEPT" ? (
                ""
            ) : (
                ""
            ),
        key: ArticleStatusEnum.PAYMENT,
        icon:
            data?.status === "ACCEPT" ? null : (
                <div className="rounded-full flex justify-center items-start">
                  <FcDocument className="text-3xl" />
                </div>
            ),
        status:
            currentStep === 3
                ? "process"
                : currentStep > 3 && data?.status === "ACCEPT"
                    ? "finish"
                    : "",
      },
      {
        title: "Holatni kuting",
        key: ArticleStatusEnum.ACCEPT,
      },
    ];

    if (data?.status === ArticleStatusEnum.ACCEPT) {
      const step = initialSteps[initialSteps.length - 1];
      step.title = "Qabul qilindi";
      step.description = "Maqolangiz nashr qilindi!";
    }

    setStepsItems(initialSteps);
  }, [data]);

  const currentStep =
      data?.status === ArticleStatusEnum.NEW
          ? 0
          : data?.status === ArticleStatusEnum.PLAGIARISM
              ? 1
              : data?.status === ArticleStatusEnum.REVIEW
                  ? 2
                  : data?.status === ArticleStatusEnum.PAYMENT
                      ? 3
                      : data?.status === ArticleStatusEnum.ACCEPT
                          ? 5
                          : data?.status === ArticleStatusEnum.REJECTED
                              ? reject
                              : 0;

  const downloadFile = async (filePath:string, isFullLink:Boolean) => {
    try {
      const response = await fetch(
          isFullLink ? filePath : `${process.env.REACT_APP_API_URL2}${filePath}`,
      );
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a:any = document.createElement("a");
      a.href = url;

      const fileName:any = filePath.split("/").pop();
      a.download = fileName;

      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Fayl yuklab olishda xato yuz berdi:", error);
    }
  };

  const genExtra = (text:string, link:string, isFullLink:Boolean) => (
      <Button
          onClick={(event) => {
            event.stopPropagation();
            downloadFile(link, isFullLink);
          }}
          className="w-48 max-sm:w-auto"
          icon={<BiDownload />}
          type="primary"
      >
        <p className="max-sm:hidden block">{text}</p>
      </Button>
  );

  const items = [
    {
      key: "1",
      label: "Maqolani o‘qish",
      children:
          data?.file?.file_path.split(".").pop().toLowerCase() === "pdf" ? (
              <Worker
                  workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
              >
                <div style={{ height: "750px" }}>
                  <Viewer
                      fileUrl={`${process.env.REACT_APP_API_URL2}${data?.file?.file_path}`}
                      plugins={[defaultLayoutPluginInstance]}
                  />
                </div>
              </Worker>
          ) : (
              <div className="relative h-[600px]">
                {loading && (
                    <div className="absolute flex items-center justify-center w-full h-full">
                      <Spin />
                    </div>
                )}
                <iframe
                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${process.env.REACT_APP_API_URL2}${data?.file?.file_path}`}
                    width="100%"
                    className="h-full"
                    frameBorder="0"
                    onLoad={() => setLoading(false)}
                ></iframe>
              </div>
          ),
      extra: genExtra("Maqolani yuklash", data?.file?.file_path, false),
    },
    {
      key: "2",
      label: "Antiplagiatni ko‘rish",
      children: (
          <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
          >
            <div style={{ height: "750px" }}>
              <Viewer
                  fileUrl={`${process.env.REACT_APP_API_URL2}${data?.plagiarist_file?.file_path}`}
                  plugins={[defaultLayoutPluginInstance]}
              />
            </div>
          </Worker>
      ),
      extra: genExtra(
          "Antiplagiatni yuklash",
          data?.plagiarist_file?.file_path,
          false,
      ),
    },
  ];

  const certificates = data?.certificates?.map((item:any, index:number) => {
    return {
      key: index,
      label: `${item?.author?.full_name} muallifning sertifikati`,
      children: (
          <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
          >
            <div className="max-sm:h-[400px]" style={{ height: "750px" }}>
              <Viewer
                  fileUrl={item?.certificate_link}
                  plugins={[defaultLayoutPluginInstance]}
              />
            </div>
          </Worker>
      ),
      extra: genExtra("Sertifikatni yuklash", item?.certificate_link, true),
    };
  });

  return (
      <>
        <Container className="mt-10 max-sm:mb-20">
          <div className="flex items-start gap-4 max-xl:flex-col justify-between">
            <div className="w-3/4 max-xl:w-full">
              <div className="bg-white hidden max-md:block w-full pr-24 pl-4 py-6 rounded-md">
                <h2 className="text-xl pb-7">Maqola holati</h2>
                <Steps
                    direction="vertical"
                    current={currentStep}
                    items={stepsItems}
                />
              </div>
              <div className="bg-white w-full max-sm:mt-4 py-4 px-3 rounded-md">
                <h2 className="inline text-sm font-bold pb-7">
                  Maqola sarlavhasi:
                </h2>
                <p className="inline text-sm pl-2">{data?.title}</p>
              </div>
              <div className="bg-white w-full py-4 px-3 mt-4 rounded-md">
                <h2 className="inline text-sm font-bold pb-7">Tavsif:</h2>
                <p className="inline text-sm pl-2">{data?.description}</p>
              </div>
              <div className="bg-white w-full py-4 px-3 mt-4 rounded-md">
                <h2 className="inline text-sm font-bold pb-7">Abstrakt:</h2>
                <p className="inline text-sm pl-2">{data?.abstract}</p>
              </div>
              <div className="w-full">
                <div className="flex items-center max-sm:flex-col gap-3 rounded-md bg-white py-3 mt-4 px-3">
                  <h1 className="font-bold text-sm text-nowrap">
                    Kalit so‘zlar:
                  </h1>
                  <div className="flex items-center  max-sm:justify-center  gap-3 flex-wrap">
                    {data?.keyword?.split(",")?.map((item:any, index:number) => (
                        <Button
                            className="px-3 text-white bg-orange-500 text-sm"
                            key={index}
                        >
                          {item}
                        </Button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-white w-full py-4 px-3 mt-4 rounded-md">
                <h2 className="inline text-sm font-bold pb-7"> Yo‘nalish:</h2>
                <p className="inline text-sm pl-2"> {data?.category?.name}</p>
              </div>
              <div className="bg-white w-full py-4 px-3 mt-4 rounded-md">
                <h2 className="inline text-sm font-bold pb-7">
                  Yo‘nalish sohasi:
                </h2>
                <p
                    className="inline text-sm uppercase
               pl-2"
                >
                  {" "}
                  {data?.SubCategory?.name}
                </p>
              </div>
              <div className="w-full mt-4">
                <Collapse className="bg-white" items={[items[0]]} />
              </div>
              <div className="w-full mt-4 ">
                <Collapse className="bg-white" items={certificates} />
              </div>
              {data?.plagiarist_file && (
                  <div className="w-full mt-4 ">
                    <Collapse className="bg-white" items={[items[1]]} />
                  </div>
              )}
              {data?.coAuthors?.length !== 0 && (
                  <div className="mt-4 w-full bg-white pt-4 px-4">
                    <h1 className="font-bold text-lg pb-4">Hammualliflar</h1>
                    <Table
                        className="text-nowrap overflow-auto"
                        columns={[
                          {
                            title: 'Muallif',
                            dataIndex: 'full_name',
                            key: 'full_name',
                          },
                          {
                            title: 'Ilmiy daraja',
                            dataIndex: 'science_degree',
                            key: 'science_degree',
                          },
                          {
                            title: 'Telefon raqami',
                            dataIndex: 'phone_number',
                            key: 'phone_number',
                          },
                          {
                            title: 'Ish joyi',
                            dataIndex: 'place_position',
                            key: 'place_position',
                          },
                          {
                            title: 'Lavozim',
                            dataIndex: 'job',
                            key: 'job',
                          },
                        ]}
                        dataSource={data?.coAuthors || []}
                        rowKey="id"
                        bordered
                        pagination={false}
                    />
                  </div>
              )}
            </div>
            <div className="w-3/12 max-xl:w-full">
              <div className="bg-white block max-md:hidden w-full pr-24 pl-4 py-6 rounded-md">
                <h2 className="text-xl pb-7">Maqola holati</h2>
                <Steps
                    direction="vertical"
                    current={currentStep}
                    items={stepsItems}
                />
              </div>
              {data?.image && (
                  <div className="bg-white w-full mt-4 px-4 py-6 rounded-md">
                    <h2 className="text-xl pb-7">Maqola muqovasi</h2>
                    <div className="w-full flex justify-center">
                      <img
                          alt="Maqola muqovasi"
                          src={`https://journal2.nordicun.uz${data?.image?.file_path}`}
                      />
                    </div>
                  </div>
              )}
              {data?.doi && (
                  <Link href={data?.doi} target="_blank">
                    <div className="w-full mt-4">
                      <div className="flex text-white items-center">
                    <span className="bg-blue-500 rounded-bl-md text-sm rounded-tl-md py-2 px-2">
                      DOI
                    </span>
                        <div className="w-full rounded-br-md text-sm rounded-tr-md py-2 px-2 bg-orange-500">
                          {data?.doi}
                        </div>
                      </div>
                    </div>
                  </Link>
              )}
              {data?.publish_date && (
                  <div className="w-full mt-4">
                    <div className="flex text-white items-center">
                  <span className="bg-blue-500 text-nowrap rounded-bl-md text-sm rounded-tl-md py-2 px-2">
                    Nashr etilgan sana:
                  </span>
                      <div className="w-full rounded-br-md text-sm rounded-tr-md py-2 px-2 bg-orange-500">
                        {dayjs(data?.publish_date).format("DD-MMMM, YYYY")}
                      </div>
                    </div>
                  </div>
              )}
              <div className="w-full bg-white mt-4 px-3 py-4 rounded-md">
                <h2 className="text-xl pb-6">Maqolaning muallifi</h2>
                <div className="flex flex-col gap-3">
                  <p>
                    <strong>Muallif:</strong> {""} {data?.author?.full_name}
                  </p>
                  <p>
                    <strong>Ish joyi:</strong> {""} {data?.author?.place_position}
                  </p>
                  <p>
                    <strong>Lavozim:</strong> {""} {data?.author?.job}
                  </p>
                  <p>
                    <strong>Ilmiy daraja:</strong> {""}{" "}
                    {data?.author?.science_degree}
                  </p>
                  <p>
                    <strong>Telefon raqami:</strong> {""}{" "}
                    {data?.author?.phone_number}
                  </p>
                </div>
              </div>
              {data?.volume && (
                  <div className="w-full mt-4">
                    <div className="bg-white rounded-md">
                      <div className="px-4 pt-4">
                        <h2 className="text-xl">Nashr: {data?.volume?.title}</h2>
                        <div>
                          <img
                              className="py-2"
                              src={`https://journal2.nordicun.uz${data?.volume?.image?.file_path}`}
                          />
                        </div>
                      </div>
                      <Link
                          target="_blank"
                          href={`https://journal2.nordicun.uz${data?.volume?.source?.file_path}`}
                      >
                        <Button
                            className="w-full rounded-none py-5 font-bold uppercase rounded-bl-md rounded-br-md"
                            type="primary"
                        >
                          Nashrni yuklab olish
                        </Button>
                      </Link>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </Container>
      </>
  );
};

export default MyArticle;