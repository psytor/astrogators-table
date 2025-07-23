import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// This is a workaround to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Your other config options here */

  // Add the following webpack configuration
  webpack: (config, { isServer }) => {
    if (isServer) {
      // This is the crucial part. It ensures the Prisma query engine files
      // are copied to the .next/server/ directory.
      config.externals.push({
        '@prisma/client': 'commonjs @prisma/client',
      });

      // This is a fix for a known issue with Prisma in Next.js.
      // It ensures that the engine file is correctly located.
      if (config.output.path) {
          const prismaClientPath = path.join(
              __dirname,
              '../../packages/database/node_modules/@prisma/client'
          );
          const queryEnginePath = path.join(
              prismaClientPath,
              'libquery_engine-debian-openssl-3.0.x.so.node'
          );

          const newQueryEnginePath = path.join(
              config.output.path,
              path.basename(queryEnginePath)
          );

          if (fs.existsSync(queryEnginePath)) {
              fs.copyFileSync(queryEnginePath, newQueryEnginePath);
          }
      }
    }

    return config;
  },
};

export default nextConfig;