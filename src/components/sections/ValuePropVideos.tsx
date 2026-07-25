import { Container } from '@/components/ui/Container'

interface ValuePropVideosProps {
  items: Array<{ title: string; video: string }>
}

export default function ValuePropVideos({ items }: ValuePropVideosProps) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container>
        <h2 className="sr-only">How Ozwell helps your practice</h2>
        <div className="grid gap-10 md:grid-cols-2">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl bg-ozwell-mist p-6 shadow-sm ring-1 ring-gray-100">
              <h3 className="text-xl font-bold text-ozwell-ink sm:text-2xl">{item.title}</h3>
              <video
                className="mt-5 w-full rounded-xl"
                src={item.video}
                autoPlay
                loop
                muted
                playsInline
                aria-label={item.title}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
