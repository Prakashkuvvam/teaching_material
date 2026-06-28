import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: ReactNode;
  link: string;
  status: 'ready' | 'coming-soon';
  chapterCount?: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'AWS',
    emoji: '☁️',
    description: (
      <>
        24 chapters covering everything from cloud computing basics to a complete production architecture. Learn VPCs, EC2, S3, IAM, and more through a simple school analogy.
      </>
    ),
    link: '/docs/aws/chapter-01-what-is-cloud-computing',
    status: 'ready',
    chapterCount: '24 chapters',
  },
  {
    title: 'Docker',
    emoji: '🐳',
    description: (
      <>
        Containers, images, Dockerfiles, Compose, networking, volumes, and production best practices. Coming soon — from zero to container hero.
      </>
    ),
    link: '/docs/docker/',
    status: 'coming-soon',
  },
  {
    title: 'Kubernetes',
    emoji: '⚓',
    description: (
      <>
        Pods, deployments, services, ingress, storage, Helm, and cluster management. Coming soon — orchestrate your containers with confidence.
      </>
    ),
    link: '/docs/kubernetes/',
    status: 'coming-soon',
  },
  {
    title: 'Terraform',
    emoji: '🏗️',
    description: (
      <>
        Infrastructure as Code fundamentals, HCL syntax, modules, state management, and CI/CD integration. Coming soon — build cloud infrastructure with code.
      </>
    ),
    link: '/docs/terraform/',
    status: 'coming-soon',
  },
];

function FeatureCard({title, emoji, description, link, status, chapterCount}: FeatureItem) {
  return (
    <div className="col col--3">
      <div className={`card ${styles.card} ${status === 'coming-soon' ? styles.cardComingSoon : ''}`}>
        <div className="card__body">
          <div className={styles.cardEmoji}>{emoji}</div>
          <Heading as="h3" className={styles.cardTitle}>{title}</Heading>
          {chapterCount && <span className={styles.chapterBadge}>{chapterCount}</span>}
          <p className={styles.cardDesc}>{description}</p>
          {status === 'coming-soon' && (
            <span className={styles.comingSoonBadge}>🚧 Coming Soon</span>
          )}
        </div>
        <div className="card__footer">
          {status === 'ready' ? (
            <a href={link} className="button button--primary button--block">
              Start Learning →
            </a>
          ) : (
            <button className="button button--secondary button--block" disabled>
              Coming Soon
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row" style={{justifyContent: 'center'}}>
          {FeatureList.map((props, idx) => (
            <FeatureCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
