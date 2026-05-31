import { useEffect, useState } from 'react'
import './App.css'

const navItems = [
  {
    id: 'about',
    number: '01',
    title: 'ABOUT',
    descriptor: 'Background & origin story',
    keyHint: 'Enter',
  },
  {
    id: 'research',
    number: '02',
    title: 'RESEARCH',
    descriptor: 'BSDEs, CVA, neural PDEs',
    keyHint: 'R',
  },
  {
    id: 'projects',
    number: '03',
    title: 'PROJECTS',
    descriptor: 'Monte Carlo, XVA tooling',
    keyHint: 'P',
  },
  {
    id: 'contact',
    number: '04',
    title: 'CONTACT',
    descriptor: 'Establish uplink',
    keyHint: 'C',
  },
]

const skills = [
  { name: 'STOCHASTIC CALC', shortName: 'STOCH CALC', value: 92 },
  { name: 'DEEP LEARNING', shortName: 'DEEP LEARN', value: 80 },
  { name: 'C++ / PYTHON', shortName: 'C++ / PYTH', value: 88 },
  { name: 'MONTE CARLO SIM', shortName: 'MC SIM', value: 95 },
  { name: 'XVA / CVA', shortName: 'XVA / CVA', value: 85 },
]

const interestTags = [
  '#StochasticCalculus',
  '#DeepLearning',
  '#BSDEs',
  '#QuantFinance',
  '#AIResearch',
  '#SciFi',
  '#MechanicalWatches',
]

const researchCards = [
  {
    title: 'Deep BSDEs for XVA',
    body:
      'Applying the Han-Jentzen-E deep BSDE framework to wrong-way risk-adjusted XVA PDEs. The goal is to replace Monte Carlo nesting with a neural network that learns the solution to the backward SDE directly, scaling to high-dimensional exposure profiles.',
    tags: ['BSDE', 'XVA', 'Deep Learning'],
  },
  {
    title: 'Neural Operators for CVA Sensitivities',
    body:
      'Using Fourier Neural Operators and DeepONet architectures to learn solution operators for CVA sensitivity computation, eliminating the need for full re-simulation under bumped market scenarios.',
    tags: ['FNO', 'DeepONet', 'CVA'],
  },
  {
    title: 'Score-Based Diffusion for Exposure Simulation',
    body:
      'Exploring score-based generative models as a replacement for parametric copulas in joint exposure simulation, targeting more faithful tail dependence in multi-asset CCR portfolios.',
    tags: ['Diffusion', 'CCR', 'Tail Risk'],
  },
  {
    title: 'PINNs for SIMM / MVA Dynamics',
    body:
      'Physics-Informed Neural Networks applied to Initial Margin dynamics under SIMM, targeting efficient MVA calculation without finite-difference grid methods.',
    tags: ['PINNs', 'SIMM', 'MVA'],
  },
]

const projects = [
  {
    title: 'Monte Carlo CVA Engine',
    description:
      'High-performance Monte Carlo simulation framework for Counterparty Credit Risk, implementing exposure profile generation across multi-asset portfolios with netting set aggregation and collateral modelling.',
    tags: ['C++', 'Python', 'Monte Carlo', 'CVA', 'CCR'],
  },
  {
    title: 'Market Models: A History',
    description:
      '14-slide presentation tracing the evolution of mathematical market models from Bachelier through Black-Scholes-Merton to Neural SDEs, delivered to a sell-side audience with coverage of Ito calculus, HJM, LIBOR Market Model, and modern ML approaches.',
    tags: ['Quantitative Finance', 'Stochastic Calculus', 'Presentation'],
  },
  {
    title: 'Deep BSDE Solver (WIP)',
    description:
      'Working implementation of the Han-Jentzen-E deep BSDE method applied to high-dimensional parabolic PDEs, with experimental extensions toward CVA-relevant payoff structures.',
    tags: ['Python', 'PyTorch', 'BSDEs', 'PDEs', 'Research'],
  },
  {
    title: 'This Website',
    description:
      'Cyberpunk game-menu personal site with scanlines, glitch typography, animated skill bars, and a dense terminal-inspired layout implemented without UI libraries.',
    tags: ['React', 'CSS', 'Vite', 'UI Engineering'],
  },
]

const contacts = [
  {
    label: 'GITHUB',
    icon: '[GH]',
    value: 'github.com/theMashrur',
    href: 'https://github.com/theMashrur',
  },
  {
    label: 'LINKEDIN',
    icon: '[LI]',
    value: 'linkedin.com/in/mashrur-khondokar/',
    href: 'https://www.linkedin.com/in/mashrur-khondokar/',
  },
  {
    label: 'EMAIL',
    icon: '[ML]',
    value: 'shafi0802@gmail.com',
    href: 'mailto:shafi0802@gmail.com',
  },
]

function PanelCorners() {
  return (
    <>
      <span className="panel-corner panel-corner-tl" aria-hidden="true" />
      <span className="panel-corner panel-corner-tr" aria-hidden="true" />
      <span className="panel-corner panel-corner-bl" aria-hidden="true" />
      <span className="panel-corner panel-corner-br" aria-hidden="true" />
    </>
  )
}

function SectionLabel({ label }) {
  return <div className="section-label">// {label}</div>
}

function App() {
  const [activeSection, setActiveSection] = useState('about')
  const [visibleSections, setVisibleSections] = useState(['hero'])
  const [skillsVisible, setSkillsVisible] = useState(false)

  useEffect(() => {
    const updateVisibleSection = (sectionId) => {
      setVisibleSections((current) =>
        current.includes(sectionId) ? current : [...current, sectionId],
      )
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateVisibleSection(entry.target.id)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -10% 0px' },
    )

    const activeObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0]

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      { threshold: [0.35, 0.5, 0.7], rootMargin: '-10% 0px -45% 0px' },
    )

    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSkillsVisible(true)
            skillObserver.disconnect()
          }
        })
      },
      { threshold: 0.35 },
    )

    const sectionElements = document.querySelectorAll('[data-observe="section"]')
    const navSections = document.querySelectorAll('[data-nav-section="true"]')
    const skillPanel = document.getElementById('skills')

    sectionElements.forEach((section) => revealObserver.observe(section))
    navSections.forEach((section) => activeObserver.observe(section))
    if (skillPanel) {
      skillObserver.observe(skillPanel)
    }

    const handleKeyDown = (event) => {
      const target = event.target
      const targetIsEditable =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON'].includes(target.tagName))

      if (targetIsEditable || event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      const key = event.key.toLowerCase()
      const keyMap = {
        enter: 'about',
        r: 'research',
        p: 'projects',
        c: 'contact',
      }

      const destination = keyMap[key]
      if (!destination) {
        return
      }

      event.preventDefault()
      const element = document.getElementById(destination)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      revealObserver.disconnect()
      activeObserver.disconnect()
      skillObserver.disconnect()
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="site-shell">
      <div className="grid-overlay" aria-hidden="true" />
      <div className="scanlines-overlay" aria-hidden="true" />
      <a className="skip-link" href="#about">
        Skip to content
      </a>

      <div className="layout-frame">
        <aside className="hud-column">
          <section
            id="hero"
            className={`panel hero-panel reveal ${visibleSections.includes('hero') ? 'is-visible' : ''}`}
            data-label="// system"
            data-observe="section"
            aria-label="Hero header"
          >
            <PanelCorners />
            <div className="system-tag">// system online - v2.0.26</div>
            <p className="eyebrow">London quantitative systems</p>
            <h1 className="glitch-name" aria-label="MASHRUR">
              <span className="glitch-name-text" data-text="MASHRUR" aria-hidden="true">
                MASHRUR
              </span>
            </h1>
            <p className="tagline">[ QUANT DEV · MATHEMATICIAN · RESEARCHER ]</p>
            <div className="status-grid" aria-label="Status indicators">
              <div className="status-pill">
                <span className="status-dot status-dot-green" aria-hidden="true" />
                <span>OPEN TO OPPORTUNITIES</span>
              </div>
              <div className="status-pill">
                <span className="status-dot status-dot-amber" aria-hidden="true" />
                <span>LONDON, GBR</span>
              </div>
              <div className="status-pill">
                <span className="status-dot status-dot-blue" aria-hidden="true" />
                <span>IMPERIAL COLLEGE · MSci 2024</span>
              </div>
            </div>
          </section>

          <section
            className={`panel nav-panel reveal ${visibleSections.includes('hero') ? 'is-visible' : ''}`}
            data-label="// navigation"
            aria-label="Primary navigation"
          >
            <PanelCorners />
            <nav className="nav-grid">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-card ${activeSection === item.id ? 'is-active' : ''}`}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    scrollToSection(item.id)
                  }}
                >
                  <span className="nav-number">{item.number}</span>
                  <span className="nav-title">{item.title}</span>
                  <span className="nav-descriptor">{item.descriptor}</span>
                  <span className="nav-key">{item.keyHint}</span>
                </a>
              ))}
            </nav>
          </section>

          <section
            id="skills"
            className={`panel skill-panel reveal ${visibleSections.includes('skills') ? 'is-visible' : ''} ${skillsVisible ? 'is-animated' : ''}`}
            data-label="// attributes"
            data-observe="section"
            aria-label="Skill loadout"
          >
            <PanelCorners />
            <SectionLabel label="attributes" />
            <div className="skill-stack">
              {skills.map((skill, index) => (
                <div className="skill-row" key={skill.name} style={{ '--value': `${skill.value}%`, '--delay': `${index * 100}ms` }}>
                  <div className="skill-label" aria-label={skill.name}>
                    <span className="skill-label-full">{skill.name}</span>
                    <span className="skill-label-short">{skill.shortName}</span>
                  </div>
                  <div className="skill-track" aria-hidden="true">
                    <div className="skill-fill" />
                  </div>
                  <span className="skill-value">{skill.value}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <main className="content-column">
          <section
            id="about"
            className={`panel content-panel reveal ${visibleSections.includes('about') ? 'is-visible' : ''}`}
            data-label="// about"
            data-observe="section"
            data-nav-section="true"
            aria-label="About Mashrur"
          >
            <PanelCorners />
            <SectionLabel label="about" />
            <div className="section-copy-wrap">
              <p className="lead-copy">
                Quantitative Developer at a large sell-side bank in London, specialising in Counterparty Credit Risk with Monte Carlo simulation engines for CVA and CCR. First Class Honours MSci in Mathematics from Imperial College London (2024).
              </p>
              <p>
                I work at the junction of rigorous mathematical theory and production engineering. My current intellectual focus is on deep learning methods for high-dimensional PDEs, particularly deep BSDEs and neural operators applied to XVA problems.
              </p>
              <p>
                Outside quant finance, I spend time on AI and ML foundations, mathematical physics, and the history of market models. I have presented on the evolution of mathematical market models to sell-side audiences and judged algorithmic trading hackathons.
              </p>
            </div>
            <div className="tag-cloud" aria-label="Research interests">
              {interestTags.map((tag) => (
                <span key={tag} className="interest-tag">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section
            id="research"
            className={`panel content-panel reveal ${visibleSections.includes('research') ? 'is-visible' : ''}`}
            data-label="// research"
            data-observe="section"
            data-nav-section="true"
            aria-label="Research directions"
          >
            <PanelCorners />
            <SectionLabel label="research" />
            <p className="section-intro">Active research directions and technical interests.</p>
            <div className="research-grid">
              {researchCards.map((card) => (
                <article key={card.title} className="research-card">
                  <PanelCorners />
                  <h2>{card.title}</h2>
                  <p>{card.body}</p>
                  <div className="mini-tags">
                    {card.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            id="projects"
            className={`panel content-panel reveal ${visibleSections.includes('projects') ? 'is-visible' : ''}`}
            data-label="// projects"
            data-observe="section"
            data-nav-section="true"
            aria-label="Projects"
          >
            <PanelCorners />
            <SectionLabel label="projects" />
            <div className="project-list">
              {projects.map((project) => (
                <article key={project.title} className="project-card">
                  <div className="project-header">
                    <div>
                      <h2>{project.title}</h2>
                      <p>{project.description}</p>
                    </div>
                    <span className="project-link-placeholder" aria-label="Project link pending">
                      [LINK:PENDING]
                    </span>
                  </div>
                  <div className="mini-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            id="contact"
            className={`panel content-panel reveal ${visibleSections.includes('contact') ? 'is-visible' : ''}`}
            data-label="// contact"
            data-observe="section"
            data-nav-section="true"
            aria-label="Contact links"
          >
            <PanelCorners />
            <SectionLabel label="contact" />
            <p className="section-intro">
              Open to research collaborations, quant roles, and interesting conversations.
            </p>
            <div className="contact-stack">
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  className="contact-row"
                  href={contact.href}
                  target={contact.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={contact.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                >
                  <span className="contact-icon">{contact.icon}</span>
                  <span className="contact-label">{contact.label}</span>
                  <span className="contact-value">{contact.value}</span>
                </a>
              ))}
            </div>
          </section>
        </main>
      </div>

      <footer className="footer-bar">
        <span>SYS::PERSONAL_SITE_v2</span>
        <span>IMPERIAL_MSci_2024</span>
        <span>© 2026 MASHRUR</span>
        <span className="cursor" aria-hidden="true">
          █
        </span>
      </footer>
    </div>
  )
}

export default App
