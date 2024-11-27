export interface Article {
    id: string;
    title: string;
    description?: string; // Drupal body.processed
    published?: string; // Drupal created
}

export async function fetchArticles(): Promise<{
    _embedded: {
        articles: Article[];
    };
    limit: number;
    total: number;
    page: number;
    pages: number;
}> {
    const response = await fetch("/api/jsonapi/node/article");
    if (!response.ok) {
        throw new Error("Failed to fetch articles");
    }

    const data = await response.json();

    // Átalakítjuk a Drupal JSON válaszát
    const articles = data.data.map((item: any) => ({
        id: item.id,
        title: item.attributes.title,
        description: item.attributes.body?.processed || "No description available",
        published: item.attributes.created,
    }));

    return {
        _embedded: {
            articles,
        },
        limit: 10,
        total: articles.length,
        page: 1,
        pages: 1,
    };
}
