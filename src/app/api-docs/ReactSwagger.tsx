'use client';

import { useEffect } from 'react';
import 'swagger-ui-dist/swagger-ui.css';

type Props = {
  spec: Record<string, any>;
};

const ReactSwagger = ({ spec }: Props) => {
  useEffect(() => {
    const initSwagger = async () => {
      try {
        const SwaggerUI = (await import('swagger-ui-dist/swagger-ui-es-bundle.js')).default;
        if (document.getElementById('swagger-ui')) {
          SwaggerUI({
            spec,
            dom_id: '#swagger-ui',
            layout: 'BaseLayout',
          });
        }
      } catch (error) {
        console.error("Failed to load Swagger UI", error);
      }
    };

    initSwagger();
  }, [spec]);

  return <div id="swagger-ui" />;
};

export default ReactSwagger;
