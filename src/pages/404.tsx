import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function NotFound() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Page Not Found"
      description="The page you're looking for doesn't exist.">
      <main style={{textAlign: 'center', padding: '4rem 1rem'}}>
        <Heading as="h1" style={{fontSize: '4rem', margin: 0, color: 'var(--ifm-color-primary)'}}>
          404
        </Heading>
        <p style={{fontSize: '1.2rem', margin: '1rem 0 2rem'}}>
          Oops! This page doesn't exist.
        </p>
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', maxWidth: 600, margin: '0 auto'}}>
          <Link to="/" className="button button--primary button--lg">
            🏠 Home
          </Link>
          <Link to="/docs/aws/chapter-01-what-is-cloud-computing" className="button button--secondary button--lg">
            ☁️ Start AWS
          </Link>
          <Link to="/docs/docker/" className="button button--secondary button--lg">
            🐳 Docker
          </Link>
        </div>
        <hr style={{maxWidth: 300, margin: '2rem auto', borderColor: 'var(--ifm-color-emphasis-300)'}} />
        <p style={{fontSize: '0.9rem', color: 'var(--ifm-color-emphasis-600)'}}>
          Search for what you need using the search bar at the top of the page.
        </p>
        <p style={{fontSize: '0.85rem', color: 'var(--ifm-color-emphasis-500)'}}>
          If you believe this is a broken link, please let us know on{' '}
          <a href={`https://github.com/${siteConfig.organizationName}/${siteConfig.projectName}/issues`}>
            GitHub
          </a>.
        </p>
      </main>
    </Layout>
  );
}
