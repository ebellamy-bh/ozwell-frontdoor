import GoogleAnalytics from './GoogleAnalytics'
import HubSpot from './HubSpot'
import MicrosoftClarity from './MicrosoftClarity'

/**
 * Every third-party tag the site loads, in one place so the root layout has a
 * single mount point. Each child no-ops when its id is unset — see
 * `lib/analytics.ts`.
 */
export default function Analytics() {
  return (
    <>
      <GoogleAnalytics />
      <MicrosoftClarity />
      <HubSpot />
    </>
  )
}
