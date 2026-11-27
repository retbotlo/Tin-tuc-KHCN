import type { Article, Category, NewsPayload } from "@/lib/types";

export type { Article, Category, NewsPayload } from "@/lib/types";
export {
  CATEGORIES,
  filterArticles,
  formatRelativeVi,
} from "@/lib/types";

const SAMPLE_ARTICLES: Article[] = [
  {
    id: "sample-1",
    title: "Chip mới giúp mô hình AI chạy nhanh hơn trên thiết bị biên",
    summary:
      "Kiến trúc tiết kiệm năng lượng mở đường cho trợ lý thông minh hoạt động ngoại tuyến trên điện thoại và cảm biến IoT.",
    source: "Lumen Desk",
    category: "ai",
    url: "#",
    publishedAt: "2026-11-26T08:00:00.000Z",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "sample-2",
    title: "Kính thiên văn James Webb phát hiện dấu hiệu nước trên ngoại hành tinh",
    summary:
      "Quan sát phổ hồng ngoại cho thấy bầu khí quyển của hành tinh cách Trái Đất hàng trăm năm ánh sáng có hơi nước.",
    source: "Lumen Desk",
    category: "vu-tru",
    url: "#",
    publishedAt: "2026-11-25T14:30:00.000Z",
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "sample-3",
    title: "Pin natri-ion sẵn sàng thương mại hóa cho lưới điện tái tạo",
    summary:
      "Vật liệu cathode mới giúp pin rẻ hơn lithium, phù hợp lưu trữ năng lượng mặt trời và gió quy mô lớn.",
    source: "Lumen Desk",
    category: "khoa-hoc",
    url: "#",
    publishedAt: "2026-11-25T09:15:00.000Z",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "sample-4",
    title: "Mạng 6G thử nghiệm đạt tốc độ đa gigabit trong môi trường đô thị",
    summary:
      "Các nhà mạng dùng phổ terahertz kết hợp AI định tuyến để giảm độ trễ cho robot và xe tự lái.",
    source: "Lumen Desk",
    category: "cong-nghe",
    url: "#",
    publishedAt: "2026-11-24T16:45:00.000Z",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "sample-5",
    title: "Protein thiết kế bằng AI rút ngắn thời gian phát triển vaccine",
    summary:
      "Mô hình dự đoán cấu trúc giúp phòng thí nghiệm tạo kháng nguyên ổn định trong vài tuần thay vì nhiều tháng.",
    source: "Lumen Desk",
    category: "ai",
    url: "#",
    publishedAt: "2026-11-24T11:00:00.000Z",
    image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "sample-6",
    title: "Vệ tinh nhỏ theo dõi rừng nhiệt đới theo thời gian thực",
    summary:
      "Chùm CubeSat kết hợp radar và ảnh quang học giúp phát hiện phá rừng sớm hơn so với quan sát mặt đất.",
    source: "Lumen Desk",
    category: "vu-tru",
    url: "#",
    publishedAt: "2026-11-23T07:20:00.000Z",
    image:
      "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&w=1600&q=80",
  },
];

type FeedConfig = {
  url: string;
  source: string;
  category: Exclude<Category, "tat-ca">;
};

const FEEDS: FeedConfig[] = [
  {
    url: "https://www.nasa.gov/rss/dyn/breaking_news.rss",
    source: "NASA",
    category: "vu-tru",
  },
  {
    url: "https://feeds.bbci.co.uk/news/technology/rss.xml",
    source: "BBC Tech",
    category: "cong-nghe",
  },
  {
    url: "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml",
    source: "BBC Science",
    category: "khoa-hoc",
  },
];

function decodeXml(text: string): string {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .trim();
}

function stripTags(html: string): string {
  return decodeXml(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTag(block: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = block.match(re);
  return match ? decodeXml(match[1]) : "";
}

function extractAttr(block: string, tag: string, attr: string): string {
  const re = new RegExp(`<${tag}[^>]*\\s${attr}=["']([^"']+)["'][^>]*/?>`, "i");
  const match = block.match(re);
  return match ? match[1] : "";
}

function parseRssItems(xml: string, feed: FeedConfig): Article[] {
  const items = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];
  return items.slice(0, 8).map((item, index) => {
    const title = stripTags(extractTag(item, "title")) || "Không có tiêu đề";
    const link =
      stripTags(extractTag(item, "link")) ||
      extractAttr(item, "link", "href") ||
      "#";
    const description = stripTags(
      extractTag(item, "description") || extractTag(item, "content:encoded"),
    );
    const pubDate =
      stripTags(extractTag(item, "pubDate")) ||
      stripTags(extractTag(item, "dc:date")) ||
      new Date().toISOString();
    const image =
      extractAttr(item, "enclosure", "url") ||
      extractAttr(item, "media:content", "url") ||
      extractAttr(item, "media:thumbnail", "url") ||
      undefined;
    const published = new Date(pubDate);
    return {
      id: `${feed.source}-${index}-${link}`.slice(0, 120),
      title,
      summary: description.slice(0, 220) || "Đọc bài gốc để xem chi tiết.",
      source: feed.source,
      category: feed.category,
      url: link,
      publishedAt: Number.isNaN(published.getTime())
        ? new Date().toISOString()
        : published.toISOString(),
      image,
    };
  });
}

async function fetchFeed(feed: FeedConfig): Promise<Article[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(feed.url, {
      signal: controller.signal,
      headers: { Accept: "application/rss+xml, application/xml, text/xml" },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRssItems(xml, feed);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

export async function getNews(): Promise<NewsPayload> {
  const results = await Promise.all(FEEDS.map(fetchFeed));
  const live = results.flat().sort((a, b) => {
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });

  if (live.length >= 4) {
    return { articles: live, fromSample: false };
  }

  const merged = [...SAMPLE_ARTICLES, ...live].sort((a, b) => {
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });
  return { articles: merged, fromSample: live.length === 0 };
}
