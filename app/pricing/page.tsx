import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Sparkles, Check, Star, FileText, Clock, Shield, Users, Zap, ArrowRight } from "lucide-react"

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for individual inventors and small projects",
      price: "$299",
      period: "per patent",
      popular: false,
      features: [
        "AI-powered patent drafting",
        "Prior art search (basic)",
        "USPTO filing preparation",
        "Standard processing time (7-10 days)",
        "Email support",
        "1 revision included",
        "Basic compliance checking",
      ],
      limitations: ["Single jurisdiction (US only)", "Up to 10 claims", "Standard templates only"],
      cta: "Start Filing",
      badge: null,
    },
    {
      name: "Professional",
      description: "Ideal for startups and growing businesses",
      price: "$599",
      period: "per patent",
      popular: true,
      features: [
        "Everything in Starter",
        "Advanced AI drafting with custom templates",
        "Comprehensive prior art search",
        "Multi-jurisdiction support (US, EU, India)",
        "Priority processing (3-5 days)",
        "Phone & chat support",
        "3 revisions included",
        "Advanced compliance checking",
        "Drawing generation assistance",
        "Patent landscape analysis",
      ],
      limitations: ["Up to 20 claims", "Standard attorney review"],
      cta: "Most Popular",
      badge: "Most Popular",
    },
    {
      name: "Enterprise",
      description: "For established companies and patent portfolios",
      price: "$999",
      period: "per patent",
      popular: false,
      features: [
        "Everything in Professional",
        "Unlimited claims",
        "Global jurisdiction support (50+ countries)",
        "Express processing (1-2 days)",
        "Dedicated account manager",
        "Unlimited revisions",
        "Expert attorney review",
        "Custom AI model training",
        "Portfolio management tools",
        "API access for bulk filing",
        "White-label options",
        "Priority phone support",
      ],
      limitations: [],
      cta: "Contact Sales",
      badge: "Best Value",
    },
  ]

  const addOns = [
    {
      name: "Express Processing",
      description: "Rush your patent application",
      price: "$199",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      name: "Additional Jurisdiction",
      description: "File in extra countries",
      price: "$149",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      name: "Expert Attorney Review",
      description: "Senior attorney consultation",
      price: "$299",
      icon: <Users className="h-6 w-6" />,
    },
    {
      name: "Patent Monitoring",
      description: "Track similar patents for 1 year",
      price: "$99",
      icon: <Shield className="h-6 w-6" />,
    },
  ]

  const faqs = [
    {
      question: "How does per-patent pricing work?",
      answer:
        "You pay once per patent application. This includes AI drafting, prior art search, compliance checking, and filing preparation. No hidden fees or monthly subscriptions.",
    },
    {
      question: "What's included in the base price?",
      answer:
        "Each plan includes AI-powered patent drafting, prior art search, filing preparation, and support. Higher tiers include more jurisdictions, faster processing, and additional features.",
    },
    {
      question: "Can I upgrade my plan after starting?",
      answer:
        "Yes! You can upgrade to a higher tier at any time during the patent process. You'll only pay the difference in pricing.",
    },
    {
      question: "Do you offer refunds?",
      answer:
        "We offer a 30-day money-back guarantee if you're not satisfied with our AI-generated patent draft before filing.",
    },
    {
      question: "How long does the patent process take?",
      answer:
        "Our AI generates initial drafts within hours. Total processing time depends on your plan: Starter (7-10 days), Professional (3-5 days), Enterprise (1-2 days).",
    },
    {
      question: "Is there a volume discount?",
      answer: "Yes! Contact our sales team for custom pricing on 10+ patents or enterprise licensing options.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Back to Home
                </span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">PatentAI</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/about">
                <Button variant="outline" size="sm">
                  About
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background via-card to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium mb-6">
              <Zap className="h-4 w-4 mr-2" />
              Simple Per-Patent Pricing
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Transparent Pricing for <span className="text-primary">Every Innovation</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Pay per patent with no hidden fees. Choose the plan that fits your needs and scale as you grow.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.popular ? "border-primary shadow-lg scale-105 bg-primary/5" : "border-border bg-card"
                } hover:shadow-lg transition-all duration-300`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-card-foreground">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground mt-2">{plan.description}</CardDescription>
                  <div className="mt-6">
                    <div className="text-4xl font-bold text-primary">{plan.price}</div>
                    <div className="text-muted-foreground">{plan.period}</div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-card-foreground">Included Features:</h4>
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {plan.limitations.length > 0 && (
                    <div className="space-y-3 pt-4 border-t border-border">
                      <h4 className="font-semibold text-card-foreground">Limitations:</h4>
                      {plan.limitations.map((limitation, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <div className="h-5 w-5 mt-0.5 flex-shrink-0 text-muted-foreground">•</div>
                          <span className="text-sm text-muted-foreground">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <Link href="/dashboard" className="block">
                    <Button
                      className={`w-full mt-6 ${
                        plan.popular ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Optional Add-ons</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Enhance your patent application with these additional services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {addOns.map((addon, index) => (
              <Card
                key={index}
                className="text-center bg-card border-border hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <div className="text-primary">{addon.icon}</div>
                  </div>
                  <CardTitle className="text-lg text-card-foreground">{addon.name}</CardTitle>
                  <div className="text-2xl font-bold text-primary mt-2">{addon.price}</div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{addon.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Everything you need to know about our pricing and services.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg text-card-foreground">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{faq.answer}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Ready to File Your Patent?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90 text-pretty">
            Start your patent application today with our AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
