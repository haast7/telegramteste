import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Entre no Grupo do Telegram",
  description: "Junte-se à nossa comunidade no Telegram e fique por dentro de tudo!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Meta Pixel Code */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '847289988241178');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body>
        {children}
        {/* Meta Pixel Noscript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=847289988241178&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* Telegram Funnel Tracker Script */}
        <Script
          src="http://localhost:3000/api/tracking/ad75cfdc-cba2-4d70-a5ab-c94881f76c39.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

