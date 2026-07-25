import { Container } from '@/components/ui/Container'

interface FeatureVideoProps {
  youtubeId: string
  title: string
}

export default function FeatureVideo({ youtubeId, title }: FeatureVideoProps) {
  return (
    <section className="bg-white pb-4 pt-10">
      <Container>
        <h2 className="sr-only">{title}</h2>
        <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </Container>
    </section>
  )
}
