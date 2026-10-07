import { QuartzComponent, QuartzComponentProps } from "./types"

const ECHO_THREAD_API_KEY = "ejrvqdb78hyHq0Tknb0pYlCZqHDwbiYJNGnVsYxAkAU"

const EchoThread: QuartzComponent = ({ cfg, fileData }: QuartzComponentProps) => {
  // `rss: true` already marks the authored articles that belong in the public feed.
  // Using it here keeps discussion off landing, section, and collection pages.
  if (fileData.frontmatter?.rss !== true || !fileData.slug) return null

  const siteUrl = new URL(`https://${cfg.baseUrl}`)
  const pageUrl = new URL(fileData.slug, siteUrl).toString()
  const title = String(fileData.frontmatter?.title ?? fileData.slug)
  const isPersianArticle = fileData.slug.startsWith("parsalogue-persian/")

  return (
    <section
      class="echothread-container"
      aria-label="Comments and reactions"
      dir={isPersianArticle ? "rtl" : "ltr"}
    >
      <div
        id="echothread"
        data-shortname="parsalogue"
        data-api-key={ECHO_THREAD_API_KEY}
        data-identifier={`parsalogue:${fileData.slug}`}
        data-page-url={pageUrl}
        data-page-title={title}
        data-theme-source="--light"
      />
    </section>
  )
}

EchoThread.css = `
.echothread-container {
  margin-top: 0.5rem;
  padding-top: 0;
}

/* Parsalogue accepts guest comments, so the optional social sign-in band is unnecessary. */
#echothread .et-compose-signin-band {
  display: none !important;
}

/* Give the service-owned composer an editorial, editor-first layout. */
#echothread .et-header,
#echothread .et-empty-state {
  display: none !important;
}

#echothread .et-widget,
#echothread .et-compose,
#echothread .et-compose-row,
#echothread .et-compose-inner {
  background: transparent;
  border: 0 !important;
  box-shadow: none !important;
}

#echothread .et-compose-row {
  display: block !important;
}

#echothread .et-avatar-guest {
  display: none !important;
}

#echothread .et-compose-inner {
  display: flex !important;
  flex-direction: column !important;
  gap: 0 !important;
  width: 100% !important;
  background: transparent !important;
  border-radius: 0 !important;
  overflow: visible !important;
}

#echothread .et-compose-toolbar {
  display: flex !important;
  align-items: center !important;
  flex-wrap: nowrap !important;
  gap: 0.5rem !important;
  order: -1 !important;
  min-height: 4.5rem !important;
  padding: 0.5rem 0.75rem !important;
  background: var(--lightgray) !important;
  border: 1px solid var(--gray) !important;
  border-bottom: 0 !important;
  border-radius: 0 !important;
}

#echothread .et-compose-toolbar-left {
  display: flex !important;
  align-items: center !important;
  flex: 0 1 auto;
  min-width: 0;
  gap: 0.25rem !important;
  background-image: none !important;
}

#echothread .et-toolbar-spacer {
  flex: 1 1 auto !important;
}

#echothread .et-format-btn,
#echothread .et-image-btn,
#echothread .et-gif-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 2rem !important;
  height: 2rem !important;
  min-width: 2rem !important;
  padding: 0 !important;
  color: var(--darkgray);
  background: transparent !important;
  border: 0 !important;
  border-radius: 0;
}

#echothread .et-toolbar-divider {
  width: 1px !important;
  height: 1.5rem !important;
  margin: 0 0.25rem !important;
  background: var(--gray) !important;
}

#echothread .et-emoji-btn {
  display: none !important;
}

#echothread .et-gif-btn {
  display: none !important;
}

#echothread .et-compose-area {
  display: flex !important;
  flex-direction: column !important;
  min-height: 18rem !important;
  padding: 0 !important;
  background: var(--light) !important;
  border: 1px solid var(--gray) !important;
  border-radius: 0 !important;
}

#echothread .et-compose-editor {
  order: 1 !important;
  flex: 1 !important;
  min-height: 13rem !important;
  padding: 1.25rem !important;
  color: var(--darkgray) !important;
  font-family: inherit !important;
  line-height: 1.8 !important;
}

#echothread .et-compose-editor:empty::before {
  content: attr(data-placeholder);
  color: var(--darkgray);
  pointer-events: none;
}

#echothread .et-format-hint {
  display: none !important;
}

#echothread .et-guest-fields {
  order: 3 !important;
  display: grid !important;
  grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  gap: 1rem !important;
  padding: 1rem 1.25rem 1.25rem !important;
  border-top: 1px solid var(--lightgray) !important;
}

#echothread .et-guest-name,
#echothread .et-guest-email {
  min-height: 3.25rem;
  padding: 0 1rem;
  color: var(--darkgray);
  background: var(--light);
  border: 1px solid var(--gray);
  border-radius: 0;
  font-family: inherit;
}

#echothread .et-send-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  min-width: 7rem;
  min-height: 2.75rem;
  padding: 0 1.25rem;
  color: var(--light);
  background: var(--secondary);
  border: 0 !important;
  border-radius: 0;
  font-family: inherit;
  font-weight: 700;
}

#echothread .et-parsalogue-signin {
  min-height: 2.75rem;
  padding: 0 1rem;
  color: var(--darkgray);
  background: transparent;
  border: 1px solid var(--gray);
  border-radius: 0;
  font-family: inherit;
  font-weight: 700;
}

.et-parsalogue-signin-dialog {
  width: min(32rem, calc(100vw - 2rem));
  padding: 0;
  color: var(--darkgray);
  background: var(--light);
  border: 1px solid var(--gray);
}

.et-parsalogue-signin-dialog::backdrop {
  background: rgb(0 0 0 / 0.65);
}

.et-parsalogue-signin-dialog__content {
  padding: 1.5rem;
}

.et-parsalogue-signin-dialog__heading {
  margin: 0 0 1.25rem;
  font-size: 1.35rem;
}

.et-parsalogue-signin-dialog__close {
  float: right;
  padding: 0.25rem 0.5rem;
  color: var(--darkgray);
  background: transparent;
  border: 0;
  font-size: 1.5rem;
  line-height: 1;
}

[dir="rtl"] .et-parsalogue-signin-dialog__close {
  float: left;
}

.et-parsalogue-signin-dialog .et-compose-signin-band {
  display: block !important;
}

.et-parsalogue-signin-dialog .et-signin-band-divider,
.et-parsalogue-signin-dialog .et-signin-band-benefit {
  display: none !important;
}

.et-parsalogue-signin-dialog .et-signin-band-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

#echothread .et-comments-list {
  display: none;
}

#echothread .et-footer {
  margin-top: 1rem;
}

@media (max-width: 600px) {
  #echothread .et-compose-area {
    min-height: 15rem;
  }

  #echothread .et-compose-editor {
    min-height: 10rem;
  }

  #echothread .et-guest-fields {
    grid-template-columns: 1fr;
  }

  .et-parsalogue-signin-dialog .et-signin-band-row {
    grid-template-columns: 1fr;
  }
}
`

EchoThread.afterDOMLoaded = `
(() => {
  const scriptId = "echothread-widget-script"
  const signInDialogId = "echothread-signin-dialog"

  const setupSignIn = () => {
    const container = document.getElementById("echothread")
    const toolbar = container?.querySelector(".et-compose-toolbar")
    const signInBand = container?.querySelector(".et-compose-signin-band")
    if (!container || !toolbar || !signInBand || toolbar.dataset.parsalogueSigninReady === "true") {
      return toolbar?.dataset.parsalogueSigninReady === "true"
    }

    toolbar.dataset.parsalogueSigninReady = "true"
    document.getElementById(signInDialogId)?.remove()

    const isRtl = container.closest("[dir=rtl]") !== null
    const signInButton = document.createElement("button")
    signInButton.type = "button"
    signInButton.className = "et-parsalogue-signin"
    signInButton.textContent = isRtl ? "ورود" : "Sign in"
    signInButton.setAttribute("aria-haspopup", "dialog")

    const dialog = document.createElement("dialog")
    dialog.id = signInDialogId
    dialog.className = "et-parsalogue-signin-dialog"
    dialog.dir = isRtl ? "rtl" : "ltr"

    const content = document.createElement("div")
    content.className = "et-parsalogue-signin-dialog__content"
    const closeButton = document.createElement("button")
    closeButton.type = "button"
    closeButton.className = "et-parsalogue-signin-dialog__close"
    closeButton.textContent = "×"
    closeButton.setAttribute("aria-label", isRtl ? "بستن" : "Close")
    const heading = document.createElement("h2")
    heading.className = "et-parsalogue-signin-dialog__heading"
    heading.textContent = isRtl ? "ورود به EchoThread" : "Sign in to EchoThread"
    content.append(closeButton, heading)
    dialog.append(content)
    document.body.append(dialog)

    const placeholder = document.createComment("EchoThread sign-in controls")
    signInBand.before(placeholder)
    const restoreSignInBand = () => {
      if (placeholder.parentNode) placeholder.parentNode.insertBefore(signInBand, placeholder.nextSibling)
    }

    signInButton.addEventListener("click", () => {
      content.append(signInBand)
      dialog.showModal()
    })
    closeButton.addEventListener("click", () => dialog.close())
    dialog.addEventListener("close", restoreSignInBand)
    toolbar.querySelector(".et-toolbar-spacer")?.before(signInButton)
    return true
  }

  const waitForSignIn = () => {
    let attempts = 0
    const poll = () => {
      if (setupSignIn() || attempts >= 50) return
      attempts += 1
      window.setTimeout(poll, 100)
    }
    poll()
  }

  const bootstrapEchoThread = () => {
    const container = document.getElementById("echothread")
    if (!container || !window.EchoThread?.bootstrap) return false

    if (container.dataset.echothreadBootstrapped !== "true") {
      window.EchoThread.bootstrap()
      container.dataset.echothreadBootstrapped = "true"
    }
    waitForSignIn()
    return true
  }

  const waitForWidgetApi = () => {
    let attempts = 0
    const poll = () => {
      if (!document.getElementById("echothread") || bootstrapEchoThread() || attempts >= 100) return
      attempts += 1
      window.setTimeout(poll, 100)
    }
    poll()
  }

  const mountEchoThread = () => {
    const container = document.getElementById("echothread")
    if (!container) return

    if (bootstrapEchoThread()) return

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script")
      script.id = scriptId
      script.src = "https://cdn.echothread.io/widget.js"
      script.async = true
      script.addEventListener("load", waitForWidgetApi, { once: true })
      document.body.appendChild(script)
    }
    waitForWidgetApi()
  }

  mountEchoThread()
  document.addEventListener("nav", mountEchoThread)
  document.addEventListener("render", mountEchoThread)
  document.addEventListener("themechange", mountEchoThread)
})()
`

export default EchoThread
