# PLAN-11: Contact Section + API Route

> **For agentic workers:** REQUIRED SUB-SKILL: `superpowers:subagent-driven-development`

**Goal:** Build the Contact section with form validation, API route handler, social links, and success/error feedback.

**Context:** Next.js 16.2.6 App Router at `/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio`.
- Contact: ggvgabriel05@gmail.com | GitHub: GgvGomes
- API route at `app/api/contact/route.ts` (logs to console; Resend integration stubbed)
- Client-side validation with TypeScript only (no library)
- Social links: GitHub, LinkedIn, Instagram, WhatsApp, Email

**Prerequisite:** PLAN-01, PLAN-04, PLAN-06 must be complete.

---

## Task 1: API Route

**Files:**
- Create: `app/api/contact/route.ts`

- [ ] **Step 1: Create contact API route**

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'

interface ContactBody {
  name: string
  email: string
  subject: string
  message: string
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactBody = await request.json()
    const { name, email, subject, message } = body

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Log to console (production: integrate Resend or Nodemailer here)
    console.log('[Contact Form]', {
      from: name,
      email,
      subject,
      message: message.slice(0, 100),
      timestamp: new Date().toISOString(),
    })

    // TODO: Send email via Resend
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'contact@linumcore.com',
    //   to: 'ggvgabriel05@gmail.com',
    //   subject: `[Linum Core] ${subject}`,
    //   text: `From: ${name} <${email}>\n\n${message}`,
    // })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

---

## Task 2: Contact Section

**Files:**
- Create: `components/sections/ContactSection.tsx`

- [ ] **Step 1: Create ContactSection**

```tsx
// components/sections/ContactSection.tsx
'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { ScrollReveal } from '@/components/animations/ScrollReveal'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

const socialLinks = [
  {
    href: 'https://github.com/GgvGomes',
    label: 'GitHub',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    href: 'https://linkedin.com/in/gabriel-gomes',
    label: 'LinkedIn',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: 'mailto:ggvgabriel05@gmail.com',
    label: 'Email',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: 'https://wa.me/5500000000000',
    label: 'WhatsApp',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.138.565 4.147 1.55 5.882L0 24l6.267-1.523A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.02-1.38l-.36-.213-3.72.904.95-3.631-.234-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
      </svg>
    ),
  },
]

function InputField({
  id, label, value, error, onChange, type = 'text', required = true,
}: {
  id: string; label: string; value: string; error?: string
  onChange: (v: string) => void; type?: string; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm text-neutral-300 font-medium">
        {label}{required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`
          bg-primary-light/50 border rounded px-4 py-3 text-white placeholder-neutral-600 text-sm
          focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent
          transition-all duration-200
          ${error ? 'border-red-500/60' : 'border-secondary/20 hover:border-secondary/40'}
        `}
      />
      {error && (
        <p id={`${id}-error`} className="text-red-400 text-xs" role="alert">{error}</p>
      )}
    </div>
  )
}

export function ContactSection() {
  const { t } = useTranslation()
  const [form, setForm] = useState<FormData>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const set = (field: keyof FormData) => (value: string) => {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: undefined }))
  }

  function validate(): boolean {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section
      id="contact"
      aria-label="Contact — Let's Connect"
      className="py-20 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionTitle
            title="Let's Connect"
            subtitle="Ready to restore the unseen connection in your business?"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <ScrollReveal>
            <form
              onSubmit={handleSubmit}
              className="bg-primary-light/30 border border-secondary/15 rounded-xl p-8 flex flex-col gap-5"
              noValidate
            >
              <InputField id="name" label={t('contact.form.name')} value={form.name} onChange={set('name')} error={errors.name} />
              <InputField id="email" label={t('contact.form.email')} value={form.email} onChange={set('email')} error={errors.email} type="email" />
              <InputField id="subject" label={t('contact.form.subject')} value={form.subject} onChange={set('subject')} error={errors.subject} />

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm text-neutral-300 font-medium">
                  {t('contact.form.message')}<span className="text-accent ml-1">*</span>
                </label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={e => set('message')(e.target.value)}
                  rows={5}
                  required
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`
                    bg-primary-light/50 border rounded px-4 py-3 text-white placeholder-neutral-600 text-sm resize-none
                    focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent
                    transition-all duration-200
                    ${errors.message ? 'border-red-500/60' : 'border-secondary/20 hover:border-secondary/40'}
                  `}
                />
                {errors.message && (
                  <p id="message-error" className="text-red-400 text-xs" role="alert">{errors.message}</p>
                )}
              </div>

              {status === 'success' && (
                <div className="p-3 rounded bg-green-500/10 border border-green-500/30 text-green-400 text-sm" role="status">
                  ✓ {t('contact.form.success')}
                </div>
              )}
              {status === 'error' && (
                <div className="p-3 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-sm" role="alert">
                  ✗ {t('contact.form.error')}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={status === 'loading'}
                className="w-full mt-2"
              >
                {status === 'loading' ? t('contact.form.sending') : t('contact.form.send')}
              </Button>
            </form>
          </ScrollReveal>

          {/* Social links */}
          <ScrollReveal delay={0.15}>
            <div className="flex flex-col gap-8">
              <div>
                <p className="font-heading text-secondary text-sm tracking-widest uppercase mb-6">
                  {t('contact.social')}
                </p>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map(({ href, label, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      aria-label={label}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg border border-secondary/20 text-neutral-400 hover:text-white hover:border-accent/60 hover:bg-accent/5 transition-all duration-300"
                    >
                      {icon}
                      <span className="text-sm">{label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-secondary/10">
                <p className="text-neutral-500 text-sm mb-2">Direct email</p>
                <a
                  href="mailto:ggvgabriel05@gmail.com"
                  className="font-heading text-secondary hover:text-secondary-light transition-colors text-lg"
                >
                  ggvgabriel05@gmail.com
                </a>
              </div>

              <div className="bg-primary-light/20 border border-secondary/10 rounded-xl p-6">
                <h3 className="font-heading text-white font-semibold mb-2">Response Time</h3>
                <p className="text-neutral-400 text-sm">
                  We typically respond within 24 hours on business days.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to app/page.tsx**
```tsx
import { ContactSection } from '@/components/sections/ContactSection'
// inside <main> after FeedbacksSection:
<ContactSection />
```

- [ ] **Step 3: Commit**
```bash
cd "/Users/gabrielgv/Documents/softs/linum core/linum-core-portifolio"
git add app/api/ components/sections/ContactSection.tsx app/page.tsx
git commit -m "feat: add Contact section with form validation and API route"
```
