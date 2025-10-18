import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { AccountActions } from "@/components/account-actions"
import { AccountPreferences } from "@/components/account-preferences"
import { UserAvatar } from "@/components/user-avatar"

export default async function AccountPage() {
  const session = await getServerSession(authOptions as any)
  if (!session) {
    redirect("/login")
  }

  const user = session.user as { name?: string | null; email?: string | null; image?: string | null }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-bold mb-6">My Account</h1>
            <Card className="max-w-3xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <UserAvatar name={user?.name} src={user?.image || null} size={64} />
                  <div className="space-y-1">
                    <p className="text-lg font-semibold">{user?.name || "User"}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium mb-2">Profile</p>
                    <div className="rounded-lg border p-4 text-sm space-y-1">
                      <div className="flex justify-between"><span>Name</span><span className="text-muted-foreground">{user?.name || "-"}</span></div>
                      <div className="flex justify-between"><span>Email</span><span className="text-muted-foreground">{user?.email || "-"}</span></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Preferences</p>
                    <div className="rounded-lg border p-4 text-sm">
                      <AccountPreferences />
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <AccountActions />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}


