import Section from '@/components/ui/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import YouTubeEmbed from '@/components/ui/YouTubeEmbed'

interface FeatureVideoProps {
  eyebrow: string
  youtubeId: string
  title: string
  description: string
}

/**
 * Product video.
 *
 * Previously an `<h2 class="sr-only">` above a bare autoloading iframe: the
 * section had no visible heading, so the video arrived unannounced, and the
 * player's JavaScript loaded on every visit whether or not anyone pressed play.
 * `YouTubeEmbed` defers all of that behind a thumbnail.
 */
export default function FeatureVideo({
  eyebrow,
  youtubeId,
  title,
  description,
}: FeatureVideoProps) {
  return (
    <Section spacing="md">
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      {/* Capped: at the full 1,152px container a 16:9 embed is 648px tall, which
          made this the second-tallest band on the page for a two-minute video. */}
      <div className="mx-auto mt-10 max-w-4xl">
        <YouTubeEmbed id={youtubeId} title={title} />
      </div>
    </Section>
  )
}
