import { Link, useParams } from 'react-router-dom';
import SmartImage from '../components/ui/SmartImage';
import NotFound from './NotFound';
import useSEO from '../hooks/useSEO';
import { getArticle } from '../data/journal';

export default function ArticlePage() {
  const { slug } = useParams();
  const article = getArticle(slug);
  useSEO(article?.title, article?.excerpt);
  if (!article) return <NotFound />;
  return (
    <article className="mx-auto max-w-3xl px-5 py-12 md:py-20">
      <Link to="/journal" className="text-sm text-muted hover:text-ink">← Journal</Link>
      <p className="mt-6 text-sm text-muted">{article.category} · {article.readTime}</p>
      <h1 className="mt-2 text-4xl md:text-5xl">{article.title}</h1>
      <div className="mt-8 overflow-hidden rounded-2xl">
        <SmartImage src={article.image} alt={article.title} ratio="16 / 9" eager />
      </div>
      <div className="mt-8 space-y-5 text-[17px] leading-relaxed">
        {article.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </article>
  );
}
