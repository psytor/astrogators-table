// src/app/api-docs/page.tsx
import React from 'react';
import { getApiDocs } from '@/backend/lib/swagger';
import ReactSwagger from './ReactSwagger';
import styles from './api-docs.module.css';

export default async function ApiDocPage() {
  const spec = await getApiDocs();
  return (
    <div className={styles.pageContainer}>
      <ReactSwagger spec={spec} />
    </div>
  );
}
