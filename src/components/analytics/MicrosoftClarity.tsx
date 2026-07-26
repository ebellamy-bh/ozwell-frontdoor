import Script from 'next/script'
import { CLARITY_PROJECT_ID, TAGS_ENABLED } from '@/lib/analytics'

/**
 * Microsoft Clarity — session replay and heatmaps.
 *
 * The vendor snippet, unmodified apart from the interpolated project id. Clarity
 * follows History API navigations on its own, so client-side route changes need
 * no extra wiring here.
 */
export default function MicrosoftClarity() {
  if (!TAGS_ENABLED || !CLARITY_PROJECT_ID) return null

  return (
    <Script id="clarity-init" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`}
    </Script>
  )
}
