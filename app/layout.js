import './globals.css';

export const metadata = {
  title: 'Content Compass',
  description: 'Never wonder what to post again.',
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
