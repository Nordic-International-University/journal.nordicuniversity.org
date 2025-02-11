import React from "react";
import HomePageCardClient from "@/app/components/home/homeCard/HomePageCardClient";

const getArticles = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/article/necessary?articles=6&topArticles=2&lastArticles=8`,
      { cache: "no-cache" },
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch articles: ${res.status} ${res.statusText}`,
      );
    }

    return await res.json();
  } catch (e) {
    console.error("Error fetching articles:", e);
    return null;
  }
};

const HomePageCard = async () => {
  const data = await getArticles();
  return (
    <div>
      <HomePageCardClient
        articles={data?.articles || []}
        topArticles={data?.topArticles || []}
        lastArticles={data?.lastArticles || []}
      />
    </div>
  );
};

export default HomePageCard;
