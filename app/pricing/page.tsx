import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "For individuals and hobbyists",
      features: [
        "Access to public models & datasets",
        "Create unlimited public Spaces",
        "Community support",
        "Basic compute resources",
      ],
    },
    {
      name: "Pro",
      price: "$9",
      description: "For professionals and small teams",
      features: [
        "Everything in Free",
        "Private models & datasets",
        "Priority compute access",
        "Advanced analytics",
        "Email support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations with advanced needs",
      features: [
        "Everything in Pro",
        "Dedicated compute resources",
        "SSO & advanced security",
        "Custom integrations",
        "24/7 priority support",
        "SLA guarantees",
      ],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
              <p className="text-lg text-muted-foreground">
                Choose the plan that's right for you. All plans include access to our platform.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              {plans.map((plan, i) => (
                <Card
                  key={i}
                  className={`relative hover:shadow-lg transition-all ${
                    plan.popular ? "border-primary shadow-lg" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.price !== "Custom" && <span className="text-muted-foreground ml-1">/month</span>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <Check className="size-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${
                        plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
