"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment !== '');

  return (
    <nav className={styles.breadcrumbs}>
      <div className="container">
        <ul>
          <li>
            <Link href="/">
              <Home size={16} />
              <span>Home</span>
            </Link>
          </li>
          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
            const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

            return (
              <li key={href}>
                <ChevronRight size={16} className={styles.separator} />
                {isLast ? (
                  <span className={styles.current}>{label}</span>
                ) : (
                  <Link href={href}>{label}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
