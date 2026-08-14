import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import ComingSoon from '@/components/ComingSoon';

export const metadata: Metadata = {
  title: 'Aegis QE',
  description: 'Enterprise Agentic Quality Engineering Framework',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="flex h-screen overflow-hidden antialiased flex-col">
        <Navigation>
          {/* Main Content Area */}
          <main className="flex-1 p-4 md:p-8 pt-4 md:pt-4 pb-24 md:pb-4 relative z-10 flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-2 md:pr-4">
               {children}
            </div>
            
            {/* Universal Footer */}
            <footer className="mt-4 py-3 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 pr-2 md:pr-4">
               <div className="flex flex-wrap justify-center gap-4">
                 <ComingSoon><span className="hover:text-blue-600 transition-colors cursor-pointer">Privacy Policy</span></ComingSoon>
                 <ComingSoon><span className="hover:text-blue-600 transition-colors cursor-pointer">Security Audits</span></ComingSoon>
                 <ComingSoon><span className="hover:text-blue-600 transition-colors cursor-pointer">Terms of Service</span></ComingSoon>
               </div>
               <div className="flex flex-wrap justify-center gap-4">
                 <ComingSoon>
                   <span className="hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer">
                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                     Confluence Wiki
                   </span>
                 </ComingSoon>
                 <span>&copy; {new Date().getFullYear()} Nexus AI Enterprise</span>
               </div>
            </footer>
          </main>
        </Navigation>
      </body>
    </html>
  );
}
