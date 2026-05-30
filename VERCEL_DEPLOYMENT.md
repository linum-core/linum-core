# Vercel Deployment Guide

## Quick Start

### 1. Connect GitHub Repository to Vercel

```bash
# Option A: Via Vercel CLI
npm i -g vercel
vercel

# Option B: Via Web Dashboard
# 1. Go to https://vercel.com
# 2. Click "New Project"
# 3. Import this GitHub repository
# 4. Vercel auto-detects Next.js framework
```

### 2. Configure Environment Variables

Set these in Vercel Project Settings → Environment Variables:

**Production (.env)**
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://api.your-domain.com
NODE_ENV=production
```

**Preview (.env.preview)**
```
NEXT_PUBLIC_SITE_URL=https://preview-branch.vercel.app
NEXT_PUBLIC_API_URL=https://api-preview.your-domain.com
NODE_ENV=production
```

**Development (.env.development)**
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Deploy

```bash
# Automatic: Push to main branch
git push origin main

# Manual via CLI
vercel --prod
```

---

## Environment Variables by Environment

| Variable | Production | Preview | Development | Secret |
|----------|-----------|---------|-------------|--------|
| `NEXT_PUBLIC_SITE_URL` | domain.com | preview.vercel.app | localhost:3000 | No |
| `NEXT_PUBLIC_API_URL` | api.domain.com | api-preview | localhost | No |
| `NEXT_PUBLIC_DEFAULT_LOCALE` | en-US | en-US | en-US | No |
| `NEXT_PUBLIC_SUPPORTED_LOCALES` | en-US,pt-BR,es-ES | en-US,pt-BR,es-ES | en-US,pt-BR,es-ES | No |
| `NODE_ENV` | production | production | development | No |
| `API_KEY_SECRET` | [secret] | [secret] | dev-key | **Yes** |
| `JWT_SECRET` | [secret] | [secret] | dev-secret | **Yes** |
| `ALLOWED_ORIGINS` | domain.com,api.domain.com | preview.vercel.app | localhost:3000 | Yes |
| `EMAIL_API_KEY` | [secret] | [secret] | - | **Yes** |
| `GITHUB_TOKEN` | [token] | [token] | [token] | **Yes** |

---

## Key Configuration Files

### vercel.json
Located at project root. Defines:
- Build & dev commands
- Environment variable schema
- Git deployment settings
- Regional deployment

**Do NOT commit secrets to vercel.json** — only schema/descriptions.

### next.config.ts
- Configured with next-intl plugin
- Ready for edge functions
- Optimized for Serverless runtime

---

## Environment Variable Setup in Vercel Dashboard

1. Go to **Project Settings** → **Environment Variables**
2. For each variable:
   - **Production**: Available in production deployments
   - **Preview**: Available in preview deployments
   - **Development**: Available when running `vercel dev`

3. **Secrets** (marked in table above):
   - Only expose in necessary environments
   - Never set `NEXT_PUBLIC_` prefix for secrets
   - Use separate secrets for preview vs production

---

## Deployment Workflow

### Automatic (Recommended)
```bash
# Main branch → Production
# Feature branches → Preview deployments
# Auto-generated URLs for each PR
git push origin feature/my-feature
# Vercel creates preview URL in GitHub PR comment
```

### Manual Deployment
```bash
# Deploy to production
vercel --prod

# Deploy with custom message
vercel --prod --comment "Hotfix for i18n routing"

# View logs
vercel logs
```

---

## First Deployment Checklist

- [ ] GitHub repo connected to Vercel
- [ ] Production environment variables set (all `NEXT_PUBLIC_*` + secrets)
- [ ] Preview environment variables set (use preview URLs)
- [ ] Domain configured (if using custom domain)
- [ ] Git auto-deploy enabled
- [ ] Build succeeds locally: `npm run build`
- [ ] Start command works: `npm run start`
- [ ] Test preview deployment with a feature branch

---

## Monitoring & Logs

```bash
# Stream production logs
vercel logs --prod

# Stream preview logs for a specific URL
vercel logs https://preview-branch.vercel.app

# View build logs
vercel logs --build
```

**Access Vercel Dashboard**: https://vercel.com/dashboard

---

## Troubleshooting

### Build Fails: "next-intl plugin not found"
```
✗ Error: Cannot find module 'next-intl/plugin'
```
**Fix**: Ensure `next-intl` is in package.json dependencies
```bash
npm list next-intl
```

### 404 on non-English routes
**Cause**: next-intl middleware not configured in preview env
**Fix**: Verify middleware is enabled in `next.config.ts`

### Environment variables undefined at runtime
**Cause**: `NEXT_PUBLIC_*` not set in Vercel environment
**Fix**: 
1. Check Vercel dashboard → Environment Variables
2. Rebuild: Vercel → Deployments → Redeploy (with cached deps)
3. Or: Clear cache and rebuild

### Preview uses production database
**Danger**: Data corruption risk
**Fix**: Set separate `*_PREVIEW_*` URLs for preview deployments
```
NEXT_PUBLIC_API_URL (prod) = https://api.domain.com
NEXT_PUBLIC_API_URL (preview) = https://api-preview.domain.com
```

---

## Performance Tips

1. **Serverless Functions**: Kept under 50MB (default limit)
2. **Edge Functions**: Use for fast geolocation/redirects (limited Node.js APIs)
3. **Build Cache**: Vercel caches dependencies — speeds up subsequent builds
4. **Image Optimization**: Next.js `<Image>` auto-optimizes for Vercel
5. **Analytics**: Enable in Vercel dashboard to track Core Web Vitals

---

## Security Notes

- [ ] All secrets (`*_KEY`, `*_SECRET`, `*_TOKEN`) must be Vercel secrets (not source code)
- [ ] Never commit `.env.local` or `.env.*.local` (git ignored by default)
- [ ] Review CORS `ALLOWED_ORIGINS` for production
- [ ] Use separate JWT secrets for preview vs production
- [ ] Rotate email service API keys regularly

---

## Next Steps

1. Run `vercel` in project root (auto-configures)
2. Set production environment variables
3. Test with `vercel dev`
4. Push to main branch to deploy
5. Monitor via Vercel Dashboard
