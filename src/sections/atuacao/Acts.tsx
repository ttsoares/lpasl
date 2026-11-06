import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { initiativePeriod, type Initiative } from '../../content/initiatives'
import { useReveal } from './useReveal'
import { useScrollProgress } from './useScrollProgress'

const media = '/media/atuacao'

/** Position in an act's entrance sequence; atuacao.css turns it into a delay. */
const step = (index: number) => ({ '--i': index }) as CSSProperties

/**
 * Name, founding year, body and the project link, shared by every act. Each
 * line is one step of the act's entrance, after the image (step 0).
 */
function Copy({ initiative, children }: { initiative: Initiative; children?: ReactNode }) {
  let next = 1
  return (
    <div className="atu-copy">
      <h2 className="atu-name atu-r" style={step(next++)}>
        {initiative.name}
      </h2>
      {initiative.since && (
        <p className="atu-since atu-r" style={step(next++)}>
          {initiativePeriod(initiative)}
        </p>
      )}
      {children && (
        <div className="atu-r" style={step(next++)}>
          {children}
        </div>
      )}
      {initiative.body.map((paragraph) => (
        <p key={paragraph.slice(0, 24)} className="atu-body atu-r" style={step(next++)}>
          {paragraph}
        </p>
      ))}
      {initiative.url && (
        <a
          className="atu-link atu-r"
          style={step(next++)}
          href={initiative.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Saiba mais sobre ${initiative.name} (abre em nova aba)`}
        >
          Saiba mais
        </a>
      )}
    </div>
  )
}

/** Opener: the page title and one lead sentence, nothing in front of them. */
export function AtuacaoHero({ lead }: { lead: string }) {
  return (
    <section className="atu-hero" aria-labelledby="page-title">
      <div className="atu-wrap">
        <h1 id="page-title" className="atu-title fade-in">
          Atuação
        </h1>
        <p className="atu-lead">{lead}</p>
      </div>
    </section>
  )
}

/** The paper panel settles in and the PSL.Br logo turns into place on it. */
export function PslAct({ initiative }: { initiative: Initiative }) {
  const ref = useReveal<HTMLElement>()
  return (
    <article ref={ref} id={initiative.slug} className="atu-act atu-psl">
      <div className="atu-wrap atu-split">
        <div className="atu-psl-panel">
          <img
            src={`${media}/pslbr.png`}
            alt="Logotipo do Projeto Software Livre Brasil"
            width={180}
            height={180}
          />
        </div>
        <Copy initiative={initiative} />
      </div>
    </article>
  )
}

/** The FISL sign swings upright, like a road sign set in place. */
export function FislAct({ initiative }: { initiative: Initiative }) {
  const ref = useReveal<HTMLElement>()
  return (
    <article ref={ref} id={initiative.slug} className="atu-act atu-fisl">
      <div className="atu-wrap atu-split atu-split-flip">
        <Copy initiative={initiative} />
        <div className="atu-fisl-frame">
          <img
            src={`${media}/fisl.webp`}
            alt="Cartaz do FISL: a placa amarela em losango com a frase Informação e comunicação abertas para a sociedade"
            width={389}
            height={389}
          />
        </div>
      </div>
    </article>
  )
}

/**
 * The peak. FISL 10 footage arrives as a small scanlined monitor and grows
 * until it fills the screen. It loops with sound while in view. Browsers block
 * sound before the visitor's first interaction with the site; when that
 * happens it plays muted and turns the sound on at the first click or key.
 */
export function TvAct({ initiative }: { initiative: Initiative }) {
  const ref = useScrollProgress<HTMLDivElement>('pin')
  const copyRef = useReveal<HTMLDivElement>()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(false)
  // The visitor's own choice wins over the automatic unmute.
  const chosen = useRef(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    // Under reduced motion nothing starts on its own; native controls instead.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.controls = true
      return
    }

    const unmuteOnGesture = () => {
      if (!chosen.current) {
        video.muted = false
        setMuted(false)
      }
    }

    const play = () => {
      video.play().catch(() => {
        // Sound was refused: play muted and wait for the first gesture.
        video.muted = true
        setMuted(true)
        video.play().catch(() => {})
        document.addEventListener('pointerdown', unmuteOnGesture, { once: true })
        document.addEventListener('keydown', unmuteOnGesture, { once: true })
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play()
        else video.pause()
      },
      { threshold: 0.25 },
    )
    observer.observe(video)
    return () => {
      observer.disconnect()
      document.removeEventListener('pointerdown', unmuteOnGesture)
      document.removeEventListener('keydown', unmuteOnGesture)
    }
  }, [])

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return
    chosen.current = true
    video.muted = !video.muted
    setMuted(video.muted)
    if (video.paused) video.play().catch(() => {})
  }

  return (
    <article id={initiative.slug} className="atu-act atu-tv">
      <div ref={ref} className="atu-tv-track">
        <div className="atu-stage atu-tv-stage">
          <p className="atu-tv-giant" aria-hidden="true">
            TV
          </p>
          <figure className="atu-tv-frame">
            <div className="atu-tv-screen">
              <video
                ref={videoRef}
                src={`${media}/tv-fisl10.mp4`}
                poster={`${media}/tv-fisl10-poster.webp`}
                width={654}
                height={480}
                loop
                playsInline
                preload="metadata"
                aria-label="Luiz Inácio Lula da Silva discursa no FISL 10, em 2009"
              />
            </div>
            <figcaption className="atu-tv-caption">
              <span>FISL 10, Porto Alegre, 2009</span>
              <button
                type="button"
                className="atu-tv-sound"
                onClick={toggleSound}
                aria-pressed={!muted}
              >
                {muted ? 'Ativar som' : 'Silenciar'}
              </button>
            </figcaption>
          </figure>
        </div>
      </div>
      <div ref={copyRef} className="atu-wrap atu-tv-copy">
        <Copy initiative={initiative} />
      </div>
    </article>
  )
}

/** A studio photo drifting inside its frame, the copy beside it. */
export function RadioAct({ initiative }: { initiative: Initiative }) {
  const ref = useScrollProgress<HTMLElement>('pass')
  const revealRef = useReveal<HTMLDivElement>()
  return (
    <article ref={ref} id={initiative.slug} className="atu-act atu-radio">
      <div ref={revealRef} className="atu-wrap atu-split atu-split-flip">
        <div className="atu-radio-photo">
          <img
            src={`${media}/radio.webp`}
            alt="Entrevista no estúdio de vidro da Rádio Software Livre, com o logotipo da rádio ao fundo"
            width={1024}
            height={682}
            loading="lazy"
          />
        </div>
        <Copy initiative={initiative}>
          <p className="atu-onair">
            <span className="atu-onair-dot" aria-hidden="true" />
            No ar desde a madrugada de 19 de junho de 2009
          </p>
        </Copy>
      </div>
    </article>
  )
}

/** Letterbox bars part on the Cine Kafuné logo, like house lights going down. */
export function KafuneAct({ initiative }: { initiative: Initiative }) {
  const ref = useReveal<HTMLElement>()
  return (
    <article ref={ref} id={initiative.slug} className="atu-act atu-kafune">
      <div className="atu-kafune-screen">
        <img
          src={`${media}/kafune.webp`}
          alt="Logotipo do Cine Kafuné: o perfil de uma mulher dentro da palavra Cine"
          width={2276}
          height={377}
          loading="lazy"
        />
      </div>
      <div className="atu-wrap atu-kafune-copy">
        <Copy initiative={initiative} />
      </div>
    </article>
  )
}
