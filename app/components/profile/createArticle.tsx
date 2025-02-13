"use client";

import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Col,
  Input,
  Row,
  Tag,
  Select,
  message,
  UploadProps,
  Button,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  CloseOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import type { InputRef } from "antd";
import { useGetAllAuthorQuery } from "@/lib/query/search.query";
import { useGetAllCategoryQuery } from "@/lib/query/category.query";
import { useGetSubcategoriesByCategoryQuery } from "@/lib/query/article.query";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import Dragger from "antd/es/upload/Dragger";
import { CiCircleCheck } from "react-icons/ci";
import Cookies from "js-cookie";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useGetAuthorProfileQuery } from "@/lib/query/myarticle.query";

const { Option } = Select;

interface IArticleData {
  id: string;
  author_id: string;
  categoryId: number;
  SubCategoryId: number;
  source_id: string | null;
  source_file_name?: string;
  title: string;
  last_status: string;
  abstract: string;
  description: string;
  keyword: string;
  slug: string;
  status: string;
  references: string | null;
  coAuthors?: Array<{
    id: string;
    full_name: string;
  }>;
}

const CreateOrUpdateArticle = ({ slug }: { slug?: string }) => {
  const router = useRouter();

  // @ts-ignore
  const { data: authors = [] } = useGetAllAuthorQuery();
  const { data: categories = [] } = useGetAllCategoryQuery();
  const { data: authorProfile } = useGetAuthorProfileQuery(
    Cookies.get("access_token"),
  );

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { data: subcategories = [] } = useGetSubcategoriesByCategoryQuery(
    selectedCategory!,
    { skip: !selectedCategory },
  );

  const [keywords, setKeywords] = useState<string[]>([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);

  const [selectedCoAuthors, setSelectedCoAuthors] = useState<string[]>([]);
  const [file, setFile] = useState<UploadFile | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loadingArticle, setLoadingArticle] = useState<boolean>(false);
  const [status, setStatus] = useState("");
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    abstract: "",
    keyword: "",
    author_id: "",
    categoryId: "",
    SubCategoryId: "",
    source_id: "",
    coAuthorIds: [] as string[],
    references: "",
  });

  useEffect(() => {
    if (slug) {
      setIsEdit(true);
      setLoadingArticle(true);

      axios
        .get<IArticleData>(
          `${process.env.NEXT_PUBLIC_API_URL}/article/user/slug/${slug}`,
          {
            headers: {
              Authorization: Cookies.get("access_token") || "",
            },
          },
        )
        .then((res) => {
          const articleData = res.data;
          if (articleData) {
            const splittedKeywords = articleData.keyword
              ? articleData.keyword.split(",")
              : [];
            const coAuthorIds = articleData.coAuthors?.map((ca) => ca.id) || [];
            setKeywords(splittedKeywords);
            setSelectedCategory(articleData.categoryId);
            setSelectedCoAuthors(coAuthorIds);
            if (articleData.source_id) {
              setFile({
                uid: articleData.source_id,
                name: articleData.source_file_name || "Eski file ",
                status: "done",
                type: "application/pdf",
              });
            }
            setStatus(articleData.last_status);
            setInitialValues({
              title: articleData.title || "",
              description: articleData.description || "",
              abstract: articleData.abstract || "",
              keyword: articleData.keyword || "",
              author_id: articleData.author_id
                ? String(articleData.author_id)
                : String(authorProfile?.data?.id || ""),
              categoryId: articleData.categoryId
                ? String(articleData.categoryId)
                : "",
              SubCategoryId: articleData.SubCategoryId
                ? String(articleData.SubCategoryId)
                : "",
              source_id: articleData.source_id || "",
              coAuthorIds: coAuthorIds,
              references: articleData.references || "",
            });
          }
        })
        .catch(() => {
          message.error("Maqola ma'lumotlarini olishda xatolik yuz berdi.");
        })
        .finally(() => {
          setLoadingArticle(false);
        });
    } else {
      setInitialValues((prev) => ({
        ...prev,
        author_id: String(authorProfile?.data?.id || ""),
      }));
    }
  }, [slug, authorProfile]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedKeyword: string) => {
    setKeywords(keywords.filter((keyword) => keyword !== removedKeyword));
  };

  const handleInputConfirm = (
    setFieldValue: (field: string, value: any) => void,
  ) => {
    if (inputValue && !keywords.includes(inputValue.trim())) {
      const updatedKeywords = [...keywords, inputValue.trim()].filter(Boolean);
      setKeywords(updatedKeywords);
      setFieldValue("keyword", updatedKeywords.join(","));
    }
    setInputValue("");
  };

  const UploadPropsPdf: (
    setFieldValue: (field: string, value: any) => void,
  ) => UploadProps = (setFieldValue) => {
    const allowedFormats = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const props: UploadProps = {
      name: "file",
      multiple: false,
      action: `${process.env.NEXT_PUBLIC_API_URL}/file/uploadFile`,
      headers: {
        Authorization: Cookies.get("access_token") as string,
      },
      beforeUpload(file) {
        const isAllowedFormat = allowedFormats.includes(file.type);
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isAllowedFormat) {
          message.warning(
            "Faqat PDF, DOC yoki DOCX formatdagi fayllarni yuklash mumkin!",
          );
        }
        if (!isLt5M) {
          message.error("Fayl hajmi 5 MB dan oshmasligi kerak!");
        }
        return isAllowedFormat && isLt5M;
      },
      onChange(info: UploadChangeParam<any>) {
        if (info.file.status === "done") {
          message.success(`${info.file.name} muvaffaqiyatli yuklandi!`);
          setFieldValue("source_id", info.file.response.link.id);
          setFile({
            uid: info.file.response.link.id,
            name: info.file.name,
            status: "done",
            type: info.file.type,
          });
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} yuklashda xatolik!`);
        }
      },
    };

    return props;
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Sarlavha majburiy."),
    description: Yup.string().required("Tavsif majburiy."),
    abstract: Yup.string().required("Qisqa maqola majburiy."),
    keyword: Yup.string().required("Kalit so‘zlar majburiy."),
    categoryId: Yup.number().required("Yo‘nalish tanlash majburiy."),
    SubCategoryId: Yup.number().required(
      "Yo‘nalish sohasini tanlash majburiy.",
    ),
    source_id: Yup.string().required("Fayl yuklanishi majburiy."),
  });

  const handleArticleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, resetForm }: any,
  ) => {
    setSubmitting(true);
    const endpoint = isEdit
      ? `${process.env.NEXT_PUBLIC_API_URL}/article/user/update/${slug}`
      : `${process.env.NEXT_PUBLIC_API_URL}/article/user/create`;
    const method = isEdit ? "put" : "post";

    const data = {
      ...values,
      categoryId: Number(values.categoryId),
      SubCategoryId: Number(values.SubCategoryId),
    };

    if (slug) {
      (data as any).status = status;
    }

    try {
      await axios({
        method,
        url: endpoint,
        data,
        headers: {
          Authorization: Cookies.get("access_token") || "",
        },
      });

      message.success(
        isEdit
          ? "Maqola muvaffaqiyatli yangilandi!"
          : "Maqola muvaffaqiyatli yaratildi!",
      );

      router.push("/profile");
      resetForm();
    } catch (error: any) {
      if (error.response?.status === 409) {
        message.error("Bunday maqola allaqachon mavjud!");
      } else if (error.response?.status === 500) {
        message.error("Server bilan muammo yuzaga keldi!");
      } else {
        message.error(
          "Maqolani yuborishda xatolik yuz berdi. Iltimos, yana urinib ko'ring.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (slug && loadingArticle) {
    return <div>Loading article data...</div>;
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      validateOnBlur
      validateOnChange
      enableReinitialize
      onSubmit={handleArticleSubmit}
    >
      {({ handleSubmit, isSubmitting, setFieldValue, values }) => (
        <Form className="placeholder:text-[10px]" onSubmit={handleSubmit}>
          <div>
            <h1 className="text-xl font-semibold mb-5">
              {isEdit ? "Maqolani tahrirlash" : "Maqola yozing"}
            </h1>
          </div>

          <Row className="flex flex-col gap-3">
            {/* Title */}
            <Col span={24}>
              <Field
                name="title"
                as={Input}
                placeholder="Sarlavha"
                size="large"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-700 text-[13px]"
              />
            </Col>

            {/* Description */}
            <Col span={24}>
              <Field
                name="description"
                as={Input}
                placeholder="Tavsif"
                size="large"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-700 text-[13px]"
              />
            </Col>

            {/* Abstract */}
            <Col span={24}>
              <Field
                rows={4}
                name="abstract"
                as={TextArea}
                placeholder="Abstrakt"
                size="large"
              />
              <ErrorMessage
                name="abstract"
                component="div"
                className="text-red-700 text-[13px]"
              />
            </Col>

            {/* Keywords */}
            <Col span={24}>
              <div className="flex flex-wrap gap-2 mb-3">
                {keywords.map((keyword) => (
                  <Tag
                    key={keyword}
                    closable
                    onClose={() => handleClose(keyword)}
                    closeIcon={<CloseOutlined />}
                  >
                    {keyword}
                  </Tag>
                ))}
              </div>
              {inputVisible ? (
                <Input
                  ref={inputRef}
                  type="text"
                  className="w-full py-2"
                  size="small"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                  onBlur={() => setInputVisible(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleInputConfirm(setFieldValue);
                    }
                  }}
                  onPaste={(e) => {
                    e.preventDefault();
                    const pastedText = e.clipboardData.getData("Text");
                    const newKeywords = pastedText
                      .split(",")
                      .map((k) => k.trim())
                      .filter((k) => k && !keywords.includes(k));

                    if (newKeywords.length) {
                      const updated = [...keywords, ...newKeywords];
                      setKeywords(updated);
                      setFieldValue("keyword", updated.join(","));
                    }
                  }}
                  onPressEnter={() => handleInputConfirm(setFieldValue)}
                />
              ) : (
                <Tag
                  onClick={() => setInputVisible(true)}
                  className="site-tag-plus w-full py-2"
                >
                  + Kalit so'z qo'shish
                </Tag>
              )}
              <ErrorMessage
                name="keyword"
                component="div"
                className="text-red-700 mt-2 text-[13px]"
              />
            </Col>
            <Col span={24} className="flex flex-col md:flex-row md:gap-3">
              <div className="w-full md:w-1/2">
                <Select
                  className="w-full mb-3 md:mb-0"
                  placeholder="Yo‘nalishni tanlang"
                  size="large"
                  value={
                    values.categoryId ? Number(values.categoryId) : undefined
                  }
                  onChange={(val) => {
                    setSelectedCategory(val);
                    setFieldValue("categoryId", val);
                  }}
                >
                  {categories.map((cat: any) => (
                    <Option key={cat.id} value={cat.id}>
                      {cat.name}
                    </Option>
                  ))}
                </Select>
                <ErrorMessage
                  name="categoryId"
                  component="div"
                  className="text-red-700 text-[13px]"
                />
              </div>

              <div className="w-full md:w-1/2">
                <Select
                  className="w-full"
                  placeholder="Yo‘nalish sohasini tanlang"
                  size="large"
                  value={
                    values.SubCategoryId
                      ? Number(values.SubCategoryId)
                      : undefined
                  }
                  onChange={(val) => setFieldValue("SubCategoryId", val)}
                  options={subcategories.map((sub: any) => ({
                    label: sub.name,
                    value: sub.id,
                  }))}
                  filterOption={(input, option) =>
                    (option?.label as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  disabled={!selectedCategory}
                />
                <ErrorMessage
                  name="SubCategoryId"
                  component="div"
                  className="text-red-700 text-[13px]"
                />
              </div>
            </Col>
            <Col span={24}>
              <Select
                size="large"
                mode="multiple"
                placeholder="Hammualliflarni tanlang"
                style={{ width: "100%" }}
                value={selectedCoAuthors}
                onChange={(val: string[]) => {
                  setSelectedCoAuthors(val);
                  setFieldValue("coAuthorIds", val);
                }}
                options={authors.map((a: any) => ({
                  label: a.full_name,
                  value: a.id,
                }))}
                filterOption={(input, option) =>
                  (option?.label as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Col>
            <Col span={24}>
              <Field
                rows={7}
                name="references"
                as={TextArea}
                placeholder="Foydalanilgan adabiyotlar (har bir adabiyotdan so‘ng yangi qator tashlang!)"
                size="large"
              />
              <ErrorMessage
                name="references"
                component="div"
                className="text-red-700 text-[13px]"
              />
            </Col>
            <Col span={24}>
              <Dragger
                showUploadList={false}
                {...UploadPropsPdf(setFieldValue)}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Maqola manbaasini yuklang.</p>
                <p className="ant-upload-hint">
                  Faqat PDF, DOC yoki DOCX formatidagi fayllarni yuklash mumkin.
                  <br />
                  Maksimal fayl hajmi: 5 MB
                </p>
              </Dragger>
              {file && (
                <div className="mt-3 flex items-center justify-between">
                  <div className="uploaded-file-info gap-3 flex items-center">
                    {/* Ikonka turi */}
                    {file.type?.includes("pdf") && (
                      <FilePdfOutlined style={{ fontSize: "20px" }} />
                    )}
                    {file.type?.includes("word") && (
                      <FileWordOutlined style={{ fontSize: "20px" }} />
                    )}
                    <span>{file.name}</span>
                  </div>
                  <CiCircleCheck className="text-xl text-green-600" />
                </div>
              )}

              <ErrorMessage
                className="text-red-700 text-[13px]"
                name="source_id"
                component="div"
              />
            </Col>
          </Row>
          <div className="flex items-center justify-end mt-4">
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="uppercase px-10"
              disabled={isSubmitting}
            >
              {isEdit ? "Yangilash" : "Yuborish"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateOrUpdateArticle;
