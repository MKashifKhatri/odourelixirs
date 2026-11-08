import { useParams } from 'react-router-dom';
import NotFound from './NotFound';
import useSEO from '../hooks/useSEO';
import { INFO_PAGES } from '../data/info';

export default function InfoPage() {
  const { page } = useParams();
  const info = INFO_PAGES[page];
  useSEO(info?.title);
  if (!info) return <NotFound />;
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:py-20">
      <h1 className="text-4xl md:text-5xl">{info.title}</h1>
      {info.sections.map((s) => (
        <section key={s.h} className="mt-8">
          <h2 className="font-sans text-lg font-medium">{s.h}</h2>
          <p className="mt-2 leading-relaxed text-muted">{s.p}</p>
        </section>
      ))}
    </div>
  );
}
