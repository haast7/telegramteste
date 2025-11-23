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
        {/* Telegram Tracker Script */}
        <Script id="telegram-tracker" strategy="afterInteractive">
          {`
            (function() {
              var funnelId = 'Tk2435PVqcIoDjdXO5HV';
              var apiUrl = 'https://us-central1-telegram-tracker-28650.cloudfunctions.net';
              
              // Track Pageview
              function trackPageview() {
                fetch(apiUrl + '/trackPageview', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    funnelId: funnelId,
                    url: window.location.href,
                    timestamp: new Date().toISOString()
                  })
                }).catch(function(err) {
                  console.error('Tracking error:', err);
                });
              }
              
              // Track Click
              function trackClick(buttonId) {
                fetch(apiUrl + '/trackClick', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    funnelId: funnelId,
                    buttonId: buttonId || 'telegram-button',
                    url: window.location.href,
                    timestamp: new Date().toISOString()
                  })
                }).catch(function(err) {
                  console.error('Tracking error:', err);
                });
              }
              
              // Auto track pageview on load
              if (document.readyState === 'complete') {
                trackPageview();
              } else {
                window.addEventListener('load', trackPageview);
              }
              
              // Track clicks on elements with class 'telegram-button' or data-telegram-track
              document.addEventListener('click', function(e) {
                var target = e.target;
                // Busca o elemento clicável mais próximo
                while (target && target !== document) {
                  if (target.classList && (
                      target.classList.contains('telegram-button') ||
                      target.hasAttribute('data-telegram-track')
                    )) {
                    var buttonId = target.getAttribute('data-telegram-track') || target.id || 'telegram-button';
                    trackClick(buttonId);
                    break;
                  }
                  target = target.parentElement;
                }
              });
              
              // Expor função global para tracking manual
              window.telegramTracker = {
                trackClick: trackClick,
                trackPageview: trackPageview
              };
            })();
          `}
        </Script>
        
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
      </body>
    </html>
  );
}

