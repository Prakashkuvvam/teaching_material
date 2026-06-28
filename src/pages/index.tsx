import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const isBrowser = useIsBrowser();
  const prefersDark = isBrowser ? window.matchMedia('(prefers-color-scheme: dark)').matches : true;

  return (
    <header className={clsx('hero', styles.heroBanner, prefersDark && styles.heroBannerDark)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/aws/chapter-01-what-is-cloud-computing">
            ☁️ Start with AWS
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/docker/">
            🐳 Learn Docker
          </Link>
        </div>
      </div>
    </header>
  );
}

function HowItWorksSection() {
  return (
    <section style={{padding: '3rem 0', backgroundColor: 'var(--ifm-color-emphasis-100)'}}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          How It Works
        </Heading>
        <div className="row" style={{justifyContent: 'center'}}>
          <div className="col col--4" style={{textAlign: 'center', padding: '1rem'}}>
            <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>📖</div>
            <Heading as="h3">Read the Story</Heading>
            <p>Every concept starts with a story set in a school — making abstract cloud ideas instantly relatable.</p>
          </div>
          <div className="col col--4" style={{textAlign: 'center', padding: '1rem'}}>
            <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>🔨</div>
            <Heading as="h3">Build It Yourself</Heading>
            <p>Follow step-by-step hands-on labs to practice everything you learn in a real AWS environment.</p>
          </div>
          <div className="col col--4" style={{textAlign: 'center', padding: '1rem'}}>
            <div style={{fontSize: '2.5rem', marginBottom: '0.5rem'}}>✅</div>
            <Heading as="h3">Test Your Knowledge</Heading>
            <p>Each chapter includes quizzes and real interview questions to make sure the concepts stick.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} — Learn DevOps`}
      description="Free, beginner-friendly guides for AWS, Docker, Kubernetes, Terraform and more. Learn through simple analogies and hands-on labs.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HowItWorksSection />
      </main>
    </Layout>
  );
}
