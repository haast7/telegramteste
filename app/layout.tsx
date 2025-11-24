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
            fbq('init', '1530106888207964');
            fbq('track', 'PageView');
            
            // Facebook Conversions API (server-side tracking)
            window.fbConversionAPI = {
              pixelId: '1530106888207964',
              accessToken: 'EAAP3tgf9qYwBQHKEczFRNX7Ow0pQZCIemPyT3kHPyaW53qYs2OsykHnHhbu5t1OQTpZBxvglZAcd5K5uNRIl7m3b86dEWS6YxdayXod3iOA4cpH6auwdy5kJ3vpTZBvdZBC00hRi7M25c69NuUX5o9x32JgrPaEWmOj1OHTId2iP1d4ZAaV9ZAEsf5ZAIlR1NwZDZD',
              sendEvent: function(eventName, eventData) {
                fetch('https://graph.facebook.com/v18.0/' + this.pixelId + '/events', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    data: [{
                      event_name: eventName,
                      event_time: Math.floor(Date.now() / 1000),
                      user_data: {
                        client_ip_address: eventData.ip || '',
                        client_user_agent: navigator.userAgent,
                      },
                      custom_data: eventData.customData || {},
                    }],
                    access_token: this.accessToken,
                  }),
                }).catch(console.error);
              }
            };
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
            src="https://www.facebook.com/tr?id=1530106888207964&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* Telegram Funnel Tracker Script */}
        <Script
          src={process.env.NEXT_PUBLIC_TRACKING_URL || "http://localhost:3000/api/tracking/ad75cfdc-cba2-4d70-a5ab-c94881f76c39.js"}
          strategy="afterInteractive"
        />
        {/* Facebook Conversions API - Track Button Clicks */}
        <Script id="fb-conversions-tracking" strategy="afterInteractive">
          {`
            // Track clicks on telegram-button elements
            document.addEventListener('click', function(e) {
              const target = e.target.closest('.telegram-button');
              if (target) {
                // Client-side Pixel event
                if (typeof fbq !== 'undefined') {
                  fbq('track', 'Lead');
                }
                
                // Server-side Conversions API event
                if (typeof window.fbConversionAPI !== 'undefined') {
                  window.fbConversionAPI.sendEvent('Lead', {
                    customData: {
                      content_name: 'Telegram Button Click',
                      content_category: 'CTA',
                      value: 0,
                      currency: 'BRL',
                    }
                  });
                }
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}

