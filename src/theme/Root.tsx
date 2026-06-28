import {useEffect, type ReactNode} from 'react';

export default function Root({children}: {children: ReactNode}) {
  useEffect(() => {
    const saved = localStorage.getItem('sidebar-collapsed');
    if (saved === 'true') {
      document.documentElement.classList.add('sidebar-collapsed');
    }

    const btn = document.createElement('button');
    btn.id = 'sidebar-toggle';
    btn.setAttribute('aria-label', 'Toggle sidebar navigation');

    const updateIcon = () => {
      const collapsed = document.documentElement.classList.contains('sidebar-collapsed');
      btn.innerHTML = collapsed
        ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>'
        : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>';
    };

    updateIcon();

    btn.addEventListener('click', () => {
      document.documentElement.classList.toggle('sidebar-collapsed');
      updateIcon();
      localStorage.setItem(
        'sidebar-collapsed',
        document.documentElement.classList.contains('sidebar-collapsed') ? 'true' : 'false',
      );
    });

    document.body.appendChild(btn);
    return () => {
      document.body.removeChild(btn);
    };
  }, []);

  return <>{children}</>;
}
