import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Search,
  FileText,
  Calculator,
  Lock,
  Sparkles,
  Brain,
  Zap,
  CheckCircle,
  Scale,
} from "lucide-react";
import { DemoVideoModal } from "@/components/demo-video-modal";

export default function PatentAILanding() {
  const features = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Invention Disclosure Intake",
      description:
        "Structured intake form where inventors describe problems and solutions. AI converts natural language into structured claims & technical summaries.",
      highlights: [
        "Natural language processing",
        "Structured claim generation",
        "Technical summary automation",
      ],
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Automated Prior Art Search",
      description:
        "NLP-powered similarity search across USPTO, WIPO, EPO, and Indian IPO databases with semantic search and keyword clustering.",
      highlights: [
        "Multi-database search",
        "Semantic similarity",
        "Auto-generated summaries",
      ],
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI Drafting Assistant",
      description:
        "Auto-generation of abstracts, claims, detailed descriptions, and drawing outlines with AI-powered patent drafting.",
      highlights: [
        "Complete patent drafts",
        "AI-powered writing",
        "Drawing generation",
      ],
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Filing Preparation",
      description:
        "Auto-fill patent office forms for India, USPTO, EPO, and WIPO with templates for provisional, non-provisional, and PCT filings.",
      highlights: [
        "Multi-jurisdiction forms",
        "Template library",
        "Missing field detection",
      ],
    },
    {
      icon: <Calculator className="h-8 w-8" />,
      title: "Cost & Time Estimator",
      description:
        "Auto-calculates expected fees and timelines for each filing route with budget forecasts for inventors and startups.",
      highlights: [
        "Fee calculation",
        "Timeline estimation",
        "Budget forecasting",
      ],
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Security & Confidentiality",
      description:
        "Encrypted local storage of invention disclosures with role-based access for inventors, attorneys, and reviewers.",
      highlights: [
        "End-to-end encryption",
        "Role-based access",
        "Secure storage",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                PatentAI
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <Link
                href="/pricing"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <a
                href="#contact"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-card to-background">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm font-medium"
              >
                <Zap className="h-4 w-4 mr-2" />
                AI-Powered Patent Filing
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Transform Patent Filing with{" "}
              <span className="text-primary">Intelligent AI</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Streamline your patent process from invention disclosure to filing
              with our comprehensive AI-powered platform. Reduce time, costs,
              and complexity while ensuring compliance across multiple
              jurisdictions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-3">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <DemoVideoModal>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-3 bg-transparent"
                >
                  Watch Demo
                </Button>
              </DemoVideoModal>
            </div>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Time Saved</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">
                  Jurisdictions
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">10k+</div>
                <div className="text-sm text-muted-foreground">
                  Patents Filed
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Brain className="h-4 w-4 mr-2" />
              Comprehensive AI Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Everything You Need for Patent Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Our AI-powered platform handles every aspect of patent filing,
              from initial disclosure to final submission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/20 bg-card"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {feature.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl text-card-foreground">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4 text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {feature.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        {highlight}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Shield className="h-4 w-4 mr-2" />
              Trusted by Legal Professionals
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
              Built for Inventors, Attorneys & Startups
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Join thousands of innovators who trust our platform for their
              patent filing needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center bg-card border-border">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-card-foreground">
                  For Inventors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Simplify your patent journey with AI-guided workflows and
                  automated documentation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-card border-border">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <Scale className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-card-foreground">
                  For Attorneys
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Enhance your practice with AI-powered research, drafting, and
                  compliance checking.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-card border-border">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-card-foreground">
                  For Startups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Protect your innovations cost-effectively with transparent
                  pricing and expert guidance.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">
            Ready to Revolutionize Your Patent Process?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90 text-pretty">
            Join the future of patent filing with AI-powered automation and
            expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-3"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  PatentAI
                </span>
              </div>
              <p className="text-muted-foreground">
                Transforming patent filing with intelligent AI automation and
                expert guidance.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    API
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Documentation
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 PatentAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
