// app/publications/[volumeId]/page.tsx

import React from "react";
import BigArticlesCard from "@/app/components/Cards/BigArticlesCard";

export async function generateStaticParams() {
  const res = await fetch("https://journal2.nordicun.uz/category");

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }

  const categories = await res.json();

  return categories.map((category: any) => ({
    categoryId: category.id.toString(),
  }));
}

const PublicationPage = async ({
  params,
}: {
  params: { volumeId: string };
}) => {
  const res = await fetch(
    `https://journal2.nordicun.uz/article/user/volume/${params.volumeId}`,
  );

  if (!res.ok) {
    return <div>Error loading data</div>;
  }

  const categoryData = await res.json();

  return (
    <div className="container">
      <div className="grid grid-cols-4 gap-4">
        {categoryData.map((article: any, index: number) => (
          <BigArticlesCard
            key={index}
            title={article.title}
            date={article.createdAt}
            slug={article.slug}
            category={article.category.name}
            description={article.description}
            author={article.author.full_name}
            imageUrl={article.image.file_path}
          />
        ))}
      </div>
    </div>
  );
};

export default PublicationPage;