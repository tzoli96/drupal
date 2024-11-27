import React from "react";
import { Article } from "../lib/api";
import styles from "../page.module.css";

interface ArticleListProps {
    articlesData: {
        _embedded: {
            articles: Article[];
        };
        limit: number;
        total: number;
        page: number;
        pages: number;
    };
}

const ArticleList: React.FC<ArticleListProps> = ({ articlesData }) => {
    const articles = articlesData._embedded?.articles || [];

    return (
        <ul className={styles.articlesList}>
            {articles.map((article) => (
                <li key={article.id} className={styles.articleItem}>
                    <h2>{article.title}</h2>
                    <div
                        dangerouslySetInnerHTML={{ __html: article.description || 'No content available' }}
                    />
                </li>
            ))}
        </ul>
    );
};

export default ArticleList;
