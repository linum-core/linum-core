import Image from 'next/image'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SkillsRadarChart } from './RadarChart'

const technicalSkills = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'PostgreSQL',
  'Docker',
  'Python',
  'FastAPI',
  'Redis',
  'AWS',
  'Git',
  'CI/CD',
]

function Avatar() {
  return (
    <div className="relative">
      <div className="w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden border-2 border-secondary/30 shadow-lg shadow-secondary/10">
        <Image
          src="/assets/Frame.png"
          alt="Gabriel Gomes — CEO Linum Core"
          width={224}
          height={224}
          className="object-cover w-full h-full"
          priority
        />
      </div>
      {/* Gold frame accent */}
      <div
        className="absolute -bottom-3 -right-3 w-16 h-16 border-2 border-accent/40 rounded-xl"
        aria-hidden="true"
      />
    </div>
  )
}

export function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About — Gabriel Gomes CEO"
      className="py-20 md:py-32"
      style={{ backgroundColor: 'rgba(15,15,15,0.3)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionTitle title="About the CEO" subtitle="Gabriel Gomes" />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Photo + bio */}
          <div className="flex flex-col gap-8">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-shrink-0">
                  <Avatar />
                </div>
                <div className="flex flex-col gap-4">
                  <p className="text-neutral-300 leading-relaxed">
                    I&apos;m Gabriel Gomes, founder and CEO of Linum Core. With years of experience
                    in software development, systems consulting, and digital transformation, I help
                    companies build the connections they didn&apos;t know they were missing.
                  </p>
                  <p className="text-neutral-300 leading-relaxed">
                    My work bridges the gap between business strategy and technical execution —
                    designing architectures that scale, automating the right processes, and
                    delivering solutions that actually stick.
                  </p>
                  <div className="flex flex-col gap-2 pt-2">
                    <a
                      href="https://github.com/GgvGomes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      github.com/GgvGomes
                    </a>
                    <a
                      href="mailto:ggvgabriel05@gmail.com"
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      ggvgabriel05@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Technical skills tags */}
            <ScrollReveal delay={0.15}>
              <div>
                <h3 className="font-heading text-secondary text-sm tracking-widest uppercase mb-4">
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-code px-3 py-1 rounded border border-accent/20 text-accent/80 hover:border-accent/60 hover:text-accent transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Radar chart */}
          <ScrollReveal delay={0.2}>
            <div className="bg-primary-light/30 rounded-xl border border-secondary/10 p-6">
              <h3 className="font-heading text-white text-center text-sm tracking-widest uppercase mb-6">
                Expertise Radar
              </h3>
              <SkillsRadarChart />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
