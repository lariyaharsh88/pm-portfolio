import Script from "next/script"

const id = process.env.NEXT_PUBLIC_GA_ID

/** GA4, loaded after the page is idle so it never competes with the first paint. */
export function GoogleAnalytics() {
  if (!id) return null
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="lazyOnload" />
      <Script id="ga4" strategy="lazyOnload">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  )
}
