import Link from "next/link"
import { Github, Twitter, Linkedin, Youtube, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-2xl">🤖</div>
              <span>Adal</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The AI community building the future. Collaborate on models, datasets, and applications.
            </p>
            <div className="flex gap-3 pt-2">
              <Link
                href="https://twitter.com/adal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="size-5" />
              </Link>
              <Link
                href="https://github.com/adal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="size-5" />
              </Link>
              <Link
                href="https://linkedin.com/company/adal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </Link>
              <Link
                href="https://discord.gg/adal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Discord"
              >
                <MessageCircle className="size-5" />
              </Link>
              <Link
                href="https://youtube.com/@adal"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="size-5" />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/models" className="text-muted-foreground hover:text-foreground transition-colors">
                  Models
                </Link>
              </li>
              <li>
                <Link href="/datasets" className="text-muted-foreground hover:text-foreground transition-colors">
                  Datasets
                </Link>
              </li>
              <li>
                <Link href="/spaces" className="text-muted-foreground hover:text-foreground transition-colors">
                  Spaces
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-muted-foreground hover:text-foreground transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t pt-8">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Adal. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
