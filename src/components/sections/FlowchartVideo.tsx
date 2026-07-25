import { Container } from '@/components/ui/Container'

interface FlowchartVideoProps {
  video: string
  title: string
}

/** Full-width workflow flowchart video band — matches the live standalone video section. */
export default function FlowchartVideo({ video, title }: FlowchartVideoProps) {
  return (
    <section className="bg-white py-12">
      <Container>
        <h2 className="sr-only">{title}</h2>
        <video
          className="w-full rounded-2xl"
          src={video}
          autoPlay
          loop
          muted
          playsInline
          aria-label={title}
        />
      </Container>
    </section>
  )
}
