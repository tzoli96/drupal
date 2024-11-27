"use client";

import { useEffect, useState } from "react";
import { Article, fetchArticles } from "./lib/api";
import ArticleList from "./components/ArticleList";
import LoadingMessage from "./components/LoadingMessage";
import styles from "./page.module.css";

export default function Home() {
  const [articlesData, setArticlesData] = useState<{
    _embedded: { articles: Article[] };
    limit: number;
    total: number;
    page: number;
    pages: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await fetchArticles();
        console.log(data)
        setArticlesData(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
      <div className={styles.page}>
        <main className={styles.main}>
          <h1>Articles</h1>
          {loading ? <LoadingMessage /> : <ArticleList articlesData={articlesData} />}
        </main>
      </div>
  );
}
