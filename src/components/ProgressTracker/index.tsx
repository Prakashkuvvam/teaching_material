import {useState, useEffect} from 'react';
import styles from './styles.module.css';

const STORAGE_KEY = 'chapter-progress';
const TOTAL_CHAPTERS = 24;

function getSlug(): string | null {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/chapter-(\d+)/);
  return match ? `ch${match[1]}` : null;
}

function getCompleted(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function toggleChapter(slug: string): string[] {
  const completed = getCompleted();
  const idx = completed.indexOf(slug);
  if (idx >= 0) completed.splice(idx, 1);
  else completed.push(slug);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  return completed;
}

export default function ProgressTracker() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);

  useEffect(() => {
    setCompleted(getCompleted());
    setCurrentSlug(getSlug());
  }, []);

  const handleToggle = () => {
    if (!currentSlug) return;
    const updated = toggleChapter(currentSlug);
    setCompleted([...updated]);
  };

  const isCurrentCompleted = currentSlug ? completed.includes(currentSlug) : false;
  const count = completed.length;
  const pct = Math.round((count / TOTAL_CHAPTERS) * 100);

  return (
    <div className={styles.container}>
      <div className={styles.progressBadge}>
        <span>
          <span className={styles.count}>{count}</span> / {TOTAL_CHAPTERS} chapters
        </span>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{width: `${pct}%`}} />
        </div>
      </div>
      {currentSlug && (
        <button
          className={`${styles.toggleBtn} ${isCurrentCompleted ? styles.completed : ''}`}
          onClick={handleToggle}
          title={isCurrentCompleted ? 'Mark as incomplete' : 'Mark as complete'}>
          {isCurrentCompleted ? '✅ Completed' : '⬜ Mark Complete'}
        </button>
      )}
    </div>
  );
}
