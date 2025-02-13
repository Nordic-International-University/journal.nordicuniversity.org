import React, { FC } from "react";
import CreateOrUpdateArticle from "@/app/components/profile/createArticle";

const Page: FC<{ params: { slug: string } }> = ({ params }) => {
  const slug: string = params.slug;
  return (
    <div className="container">
      <CreateOrUpdateArticle slug={slug} />
    </div>
  );
};

export default Page;
