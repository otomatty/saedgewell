const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ENABLE_REACT_COMPILER = process.env.ENABLE_REACT_COMPILER === 'true';

const INTERNAL_PACKAGES = [
  '@kit/ui',
  '@kit/auth',
  '@kit/accounts',
  '@kit/shared',
  '@kit/supabase',
  '@kit/i18n',
  '@kit/next',
];

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  /** Enables hot reloading for local packages without a build step */
  transpilePackages: INTERNAL_PACKAGES,
  images: {
    remotePatterns: getRemotePatterns(),
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // HTTP プロキシAPIが多くの外部リソースにアクセスできるように設定
  // 通常、Next.jsはセキュリティ上の理由から外部リソースへのアクセスを制限
  // 但し、これらのAPIはサーバーサイドで実行されるため、必要に応じて制限を緩和
  async rewrites() {
    return [
      {
        source: '/api/og-image',
        destination: '/api/og-image',
      },
      {
        source: '/api/proxy-image',
        destination: '/api/proxy-image',
      },
      {
        source: '/api/optimize-image',
        destination: '/api/optimize-image',
      },
    ];
  },
  serverExternalPackages: [],
  // needed for supporting dynamic imports for local content
  outputFileTracingIncludes: {
    '/*': ['./content/**/*'],
  },
  experimental: {
    mdxRs: false,
    reactCompiler: ENABLE_REACT_COMPILER,
    // ハイドレーションエラーを検出して修正するオプションを追加
    optimisticClientCache: false,
    turbo: {
      resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.mdx'],
    },
    optimizePackageImports: [
      'recharts',
      'lucide-react',
      '@radix-ui/react-icons',
      '@radix-ui/react-avatar',
      '@radix-ui/react-select',
      'date-fns',
      ...INTERNAL_PACKAGES,
    ],
  },
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
  },
  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

export default config;

function getRemotePatterns() {
  /** @type {import('next').NextConfig['remotePatterns']} */
  const remotePatterns = [
    {
      protocol: 'https',
      hostname: 'i.gyazo.com',
    },
    // 一般的な外部画像ドメインを追加
    {
      protocol: 'https',
      hostname: 'github.githubassets.com',
    },
    {
      protocol: 'https',
      hostname: 'avatars.githubusercontent.com',
    },
    {
      protocol: 'https',
      hostname: 'user-images.githubusercontent.com',
    },
    {
      protocol: 'https',
      hostname: 'opengraph.githubassets.com',
    },
    {
      protocol: 'https',
      hostname: '*.gyazo.com',
    },
    {
      protocol: 'https',
      hostname: '*.cloudfront.net',
    },
    {
      protocol: 'https',
      hostname: '*.githubusercontent.com',
    },
  ];

  if (SUPABASE_URL) {
    const hostname = new URL(SUPABASE_URL).hostname;

    remotePatterns.push({
      protocol: 'https',
      hostname,
    });
  }

  return IS_PRODUCTION
    ? remotePatterns
    : [
        ...remotePatterns,
        {
          protocol: 'http',
          hostname: '127.0.0.1',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
        },
      ];
}
