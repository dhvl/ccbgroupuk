import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

const ServiceCard = ({ title, description, icon: Icon, href }: ServiceCardProps) => {
  return (
    <Link href={href} className={styles.card}>
      <div className={styles.iconWrapper}>
        <Icon size={32} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className={styles.learnMore}>Learn More →</span>
    </Link>
  );
};

export default ServiceCard;
