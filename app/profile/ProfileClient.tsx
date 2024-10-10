"use client";

import React from "react";
import { Tabs, TabsProps, Table } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  FcCancel,
  FcCheckmark,
  FcClock,
  FcDocument,
  FcMoneyTransfer,
} from "react-icons/fc";
import { MdOutlineFiberNew } from "react-icons/md";

interface Article {
  title: string;
  slug: string;
  status: string;
  category: {
    name: string;
  };
  createdAt: string;
  viewsCount: number;
}

function getStatusText(status: ArticleStatusEnum): string {
  const statusTexts: { [key in ArticleStatusEnum]: string } = {
    [ArticleStatusEnum.NEW]: "Yangi maqola",
    [ArticleStatusEnum.PLAGIARISM]: "Antiplagiat tekshirmoqda",
    [ArticleStatusEnum.REVIEW]: "Ko'rib chiqilmoqda",
    [ArticleStatusEnum.ACCEPT]: "Qabul qilindi",
    [ArticleStatusEnum.REJECTED]: "Rad etildi",
    [ArticleStatusEnum.PAYMENT]: "To'lov jarayoni",
  };

  return statusTexts[status] || "Noma'lum maqola holati";
}

export enum ArticleStatusEnum {
  NEW = "NEW",
  PLAGIARISM = "PLAGIARISM",
  REVIEW = "REVIEW",
  ACCEPT = "ACCEPT",
  REJECTED = "REJECTED",
  PAYMENT = "PAYMENT",
}

interface ProfileClientProps {
  data?: {
    Articles: Array<any>;
  };
}

const getStatusTextAndIcon = (status: string) => {
  switch (status) {
    case ArticleStatusEnum.NEW:
      return {
        text: "Yangi",
        icon: <MdOutlineFiberNew className="text-blue-500 text-2xl" />,
      };
    case ArticleStatusEnum.PLAGIARISM:
      return {
        text: "Antiplagiatga tekshirilmoqda",
        icon: <FcDocument className="text-yellow-500 text-2xl" />,
      };
    case ArticleStatusEnum.REVIEW:
      return {
        text: "Taqrizga tekshirilmoqda",
        icon: <FcClock className="text-orange-500 text-xl" />,
      };
    case ArticleStatusEnum.ACCEPT:
      return {
        text: "Qabul qilindi",
        icon: <FcCheckmark className="text-green-500 text-xl" />,
      };
    case ArticleStatusEnum.REJECTED:
      return {
        text: "Rad etildi",
        icon: <FcCancel className="text-red-500 text-xl" />,
      };
    case ArticleStatusEnum.PAYMENT:
      return {
        text: "To‘lov kutilmoqda",
        icon: <FcMoneyTransfer className="text-purple-500 text-xl" />,
      };
    default:
      return {
        text: status,
        icon: null,
      };
  }
};

export default function TableComponent({ data }: ProfileClientProps) {
  const router = useRouter();

  const columns = [
    {
      title: "Maqola Holati",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Soni",
      dataIndex: "count",
      key: "count",
    },
  ];

  const articleColumn = [
    {
      title: "Sarlavha",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Holati",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Yo‘nalish",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Yaratilgan vaqt",
      dataIndex: "createdAt",
      key: "category",
    },
    {
      title: "O‘qishlar soni",
      dataIndex: "viewsCount",
      key: "viewsCount",
    },
  ];

  const articleDataSource = data?.Articles?.map((item, index) => {
    const { text, icon } = getStatusTextAndIcon(item?.status);
    return {
      key: "1",
      title: item?.title,
      status: (
        <div style={{ display: "flex", alignItems: "center" }}>
          {icon}
          <span style={{ marginLeft: "8px" }}>{text}</span>
        </div>
      ),
      slug: item?.slug,
      category: item?.category?.name,
      createdAt: dayjs(item?.createdAt).format("DD.MM.YYYY"),
      viewsCount: item?.viewsCount + " ta",
    };
  });

  const dataSource = [
    {
      key: "1",
      status: "Yangi Maqolalar",
      count: data?.Articles?.filter(
        (article: Article) => article.status === "NEW",
      ).length,
    },
    {
      key: "2",
      status: "Tekshirilayotgan Maqolalar",
      count: data?.Articles?.filter(
        (article: Article) => article.status === "REVIEW",
      ).length,
    },
    {
      key: "3",
      status: "Qabul Qilingan Maqolalar",
      count: data?.Articles?.filter(
        (article: Article) => article.status === "ACCEPT",
      ).length,
    },
    {
      key: "4",
      status: "Rad Etilgan Maqolalar",
      count: data?.Articles?.filter(
        (article: Article) => article.status === "REJECTED",
      ).length,
    },
  ];

  const handleRowClick = (slug: string) => {
    router.push(`/profile/${slug}`);
  };

  const tabsItem: TabsProps["items"] = [
    {
      key: "1",
      label: "Maqolalar",
      children: (
        <div className="overflow-x-auto w-full">
          <Table
            dataSource={articleDataSource}
            columns={articleColumn}
            bordered
            pagination={false}
            onRow={(record) => {
              return {
                className: "cursor-pointer bg-white w-full",
                onClick: () => handleRowClick(record.slug),
              };
            }}
            rowKey="key"
            className="shadow-md w-full
             text-nowrap rounded-lg"
          />
        </div>
      ),
    },
    {
      key: "2",
      label: "Ko'rsatkichlar",
      children: (
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          pagination={false}
          rowKey="key"
          className="shadow-md w-full rounded-lg"
        />
      ),
    },
  ];

  return (
    <div className="overflow-x-auto w-full mt-5">
      <Tabs
        className="w-full"
        defaultActiveKey="1"
        type="card"
        items={tabsItem}
      />
    </div>
  );
}
