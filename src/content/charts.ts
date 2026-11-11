// Real numbers behind the case-study charts, copied from Google Search Console, Bing
// Webmaster Tools and Cloudflare Web Analytics on 11 Nov 2026. Update the source note when refreshing.

export type DailyPoint = { date: string; values: Record<string, number> }
export type DailySeries = {
  title: string
  source: string
  metrics: readonly { key: string; label: string }[]
  points: readonly DailyPoint[]
  events?: readonly { date: string; label: string }[]
}
export type BarItem = { label: string; value: number }
export type BarSeries = { title: string; source: string; unit: string; items: readonly BarItem[] }

const day = (date: string, clicks: number, impressions: number): DailyPoint => ({ date, values: { clicks, impressions } })

export const dailyCharts: Record<string, DailySeries> = {
  anilumiGoogle: {
    title: "AniLumi on Google, daily",
    source: "Google Search Console, 22 Oct – 9 Nov 2026",
    metrics: [
      { key: "clicks", label: "Clicks" },
      { key: "impressions", label: "Impressions" },
    ],
    events: [{ date: "2026-11-01", label: "Drop: host move + new-site pullback" }],
    points: [
      day("2026-10-22", 0, 0), day("2026-10-23", 0, 3), day("2026-10-24", 3, 272), day("2026-10-25", 9, 1824),
      day("2026-10-26", 12, 4002), day("2026-10-27", 38, 8013), day("2026-10-28", 62, 11167), day("2026-10-29", 68, 12812),
      day("2026-10-30", 67, 14365), day("2026-10-31", 76, 17925), day("2026-11-01", 2, 545), day("2026-11-02", 2, 162),
      day("2026-11-03", 0, 149), day("2026-11-04", 3, 137), day("2026-11-05", 1, 112), day("2026-11-06", 1, 134),
      day("2026-11-07", 1, 131), day("2026-11-08", 6, 107), day("2026-11-09", 2, 21),
    ],
  },
  anilumiBing: {
    title: "AniLumi on Bing, daily",
    source: "Bing Webmaster Tools, 28 Oct – 8 Nov 2026",
    metrics: [
      { key: "clicks", label: "Clicks" },
      { key: "impressions", label: "Impressions" },
    ],
    events: [{ date: "2026-11-04", label: "Bing picks up Hindi-dub pages" }],
    points: [
      day("2026-10-28", 0, 0), day("2026-10-29", 0, 6), day("2026-10-30", 0, 54), day("2026-10-31", 0, 62),
      day("2026-11-01", 2, 181), day("2026-11-02", 0, 197), day("2026-11-03", 4, 145), day("2026-11-04", 44, 781),
      day("2026-11-05", 35, 820), day("2026-11-06", 26, 705), day("2026-11-07", 15, 592), day("2026-11-08", 14, 662),
    ],
  },
  payhoursGoogle: {
    title: "PayHours Calc on Google, daily",
    source: "Google Search Console, 21 Oct – 9 Nov 2026",
    metrics: [
      { key: "impressions", label: "Impressions" },
      { key: "clicks", label: "Clicks" },
    ],
    events: [{ date: "2026-10-30", label: "Drop, no deploy that day" }],
    points: [
      day("2026-10-21", 0, 0), day("2026-10-22", 0, 2), day("2026-10-23", 1, 240), day("2026-10-24", 0, 693),
      day("2026-10-25", 1, 856), day("2026-10-26", 1, 1056), day("2026-10-27", 0, 1292), day("2026-10-28", 1, 1271),
      day("2026-10-29", 0, 548), day("2026-10-30", 0, 2), day("2026-10-31", 0, 4), day("2026-11-01", 0, 3),
      day("2026-11-02", 0, 1), day("2026-11-03", 0, 2), day("2026-11-04", 0, 2), day("2026-11-05", 0, 5),
      day("2026-11-06", 0, 1), day("2026-11-07", 0, 5), day("2026-11-08", 0, 3), day("2026-11-09", 0, 3),
    ],
  },
  harshonroadsGoogle: {
    title: "HarshOnRoads on Google, daily",
    source: "Google Search Console, 16 Sep – 9 Nov 2026",
    metrics: [
      { key: "impressions", label: "Impressions" },
      { key: "clicks", label: "Clicks" },
    ],
    events: [{ date: "2026-10-16", label: "Steady climb begins" }],
    points: [day("2026-09-16", 0, 0), day("2026-09-17", 0, 0), day("2026-09-18", 0, 0), day("2026-09-19", 0, 4), day("2026-09-20", 2, 7), day("2026-09-21", 1, 11), day("2026-09-22", 2, 14), day("2026-09-23", 0, 10), day("2026-09-24", 0, 7), day("2026-09-25", 0, 9), day("2026-09-26", 0, 3), day("2026-09-27", 0, 8), day("2026-09-28", 2, 10), day("2026-09-29", 0, 6), day("2026-09-30", 0, 6), day("2026-10-01", 0, 5), day("2026-10-02", 0, 14), day("2026-10-03", 0, 12), day("2026-10-04", 0, 4), day("2026-10-05", 0, 2), day("2026-10-06", 0, 1), day("2026-10-07", 0, 4), day("2026-10-08", 0, 1), day("2026-10-09", 0, 2), day("2026-10-10", 0, 1), day("2026-10-11", 0, 6), day("2026-10-12", 0, 9), day("2026-10-13", 0, 12), day("2026-10-14", 1, 19), day("2026-10-15", 0, 29), day("2026-10-16", 3, 114), day("2026-10-17", 1, 179), day("2026-10-18", 1, 189), day("2026-10-19", 3, 224), day("2026-10-20", 0, 227), day("2026-10-21", 0, 208), day("2026-10-22", 1, 168), day("2026-10-23", 1, 195), day("2026-10-24", 3, 245), day("2026-10-25", 4, 221), day("2026-10-26", 3, 201), day("2026-10-27", 2, 287), day("2026-10-28", 1, 356), day("2026-10-29", 0, 346), day("2026-10-30", 1, 307), day("2026-10-31", 2, 229), day("2026-11-01", 6, 299), day("2026-11-02", 1, 253), day("2026-11-03", 1, 263), day("2026-11-04", 1, 233), day("2026-11-05", 2, 222), day("2026-11-06", 2, 271), day("2026-11-07", 2, 248), day("2026-11-08", 1, 209), day("2026-11-09", 6, 323)],
  },
  kundliGoogle: {
    title: "Kundli Jyoti on Google, daily",
    source: "Google Search Console, 23 Oct – 9 Nov 2026",
    metrics: [
      { key: "impressions", label: "Impressions" },
      { key: "clicks", label: "Clicks" },
    ],
    events: [{ date: "2026-11-08", label: "Bhai Dooj searches" }],
    points: [
      day("2026-10-23", 0, 0), day("2026-10-24", 0, 0), day("2026-10-25", 0, 0), day("2026-10-26", 0, 4),
      day("2026-10-27", 0, 11), day("2026-10-28", 0, 16), day("2026-10-29", 2, 70), day("2026-10-30", 1, 287),
      day("2026-10-31", 7, 438), day("2026-11-01", 5, 349), day("2026-11-02", 2, 340), day("2026-11-03", 7, 546),
      day("2026-11-04", 7, 786), day("2026-11-05", 4, 888), day("2026-11-06", 6, 817), day("2026-11-07", 8, 983),
      day("2026-11-08", 11, 2995), day("2026-11-09", 5, 1919),
    ],
  },
}

export const barCharts: Record<string, BarSeries> = {
  anilumiBingQueries: {
    title: "Top Bing searches for AniLumi",
    source: "Bing Webmaster Tools, last 3 months",
    unit: "impressions",
    items: [
      { label: "anime dub hindi", value: 182 },
      { label: "anime airing in fall 2026", value: 145 },
      { label: "anime hindi", value: 47 },
      { label: "anime hindi dubbed", value: 44 },
      { label: "sub dub anime", value: 42 },
      { label: "anime in hindi", value: 32 },
      { label: "what anime is this", value: 25 },
    ],
  },
  anilumiCountries: {
    title: "Where AniLumi's visitors are",
    source: "Cloudflare Web Analytics, 10 Nov 2026, bots excluded",
    unit: "page views",
    items: [
      { label: "India", value: 323 },
      { label: "Pakistan", value: 81 },
      { label: "Bangladesh", value: 39 },
    ],
  },
  harshonroadsQueries: {
    title: "Top Google searches for HarshOnRoads",
    source: "Google Search Console, last 3 months",
    unit: "impressions",
    items: [
      { label: "best time to visit shangarh", value: 73 },
      { label: "route optimiser", value: 73 },
      { label: "route optimizer", value: 72 },
      { label: "shangarh best time to visit", value: 51 },
      { label: "optimize my route", value: 43 },
      { label: "shangarh in november", value: 39 },
      { label: "places to visit near delhi in january", value: 11 },
    ],
  },
  payhoursGoogleQueries: {
    title: "Top Google searches for PayHours Calc",
    source: "Google Search Console, last 3 months",
    unit: "impressions",
    items: [
      { label: "150 an hour is how much a year", value: 86 },
      { label: "military time converter", value: 40 },
      { label: "$55k a year is how much an hour", value: 37 },
      { label: "$150 an hour is how much a year", value: 33 },
      { label: "$12.50 an hour is how much a year", value: 26 },
      { label: "military time conversion chart", value: 24 },
      { label: "pay raise calculator", value: 20 },
    ],
  },
  payhoursBingQueries: {
    title: "Top Bing searches for PayHours Calc",
    source: "Bing Webmaster Tools, 23 Oct – 8 Nov 2026",
    unit: "impressions",
    items: [
      { label: "military minutes conversion chart", value: 21 },
      { label: "military minute conversion chart", value: 3 },
      { label: "military minutes conversion chart images", value: 2 },
      { label: "military hundreths", value: 2 },
      { label: "1 hour and 75 mins in decimal military time", value: 2 },
    ],
  },
  kundliQueries: {
    title: "Top Google searches for Kundli Jyoti",
    source: "Google Search Console, last 3 months",
    unit: "impressions",
    items: [
      { label: "bhai dooj muhurat 2026 date and time", value: 420 },
      { label: "bhaiya dooj kab hai 2026 date", value: 195 },
      { label: "bhai dooj muhurat 2026", value: 117 },
      { label: "bhai dooj 2026 date and time in hindi", value: 38 },
      { label: "makar राशि 2028 कैसा रहेगा", value: 13 },
      { label: "bhai dooj kab hai 2026 date and time", value: 10 },
    ],
  },
}
