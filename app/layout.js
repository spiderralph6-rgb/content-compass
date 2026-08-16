import './globals.css';

export const metadata = {
  title: {
    default: 'Content Compass — Your Practical Content Coach',
    template: '%s | Content Compass',
  },
  description: 'Turn your business strategy into practical, industry-specific content missions with scripts, filming plans, captions and clear next steps.',
  applicationName: 'Content Compass',
  keywords: ['content planning', 'social media content', 'content coach', 'small business marketing', 'content strategy'],
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Content Compass',
  },
  formatDetection: { telephone: false },
  openGraph: {
    title: 'Content Compass — Your Practical Content Coach',
    description: 'Know exactly what to create, what to say and what to film next.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#081321',
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
