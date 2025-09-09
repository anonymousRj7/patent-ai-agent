import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Sparkles, Linkedin, Github, Mail, Users, Target, Lightbulb, Award } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Raj Singh Yadav",
      role: "Co-Founder & CEO",
      bio: "Patent attorney with 10+ years of experience in IP law and AI technology. Led patent filing for 500+ startups.",
      image: "/professional-headshot-of-raj-singh-yadav.jpg",
      linkedin: "#",
      github: "#",
      email: "raj@patentai.com",
    },
    {
      name: "Bhavya Shah",
      role: "Co-Founder & CTO",
      bio: "AI/ML engineer specializing in NLP and legal tech. Former Google AI researcher with expertise in patent analysis.",
      image: "/professional-headshot-of-bhavya-shah.jpg",
      linkedin: "#",
      github: "#",
      email: "bhavya@patentai.com",
    },
    {
      name: "Devansh",
      role: "Lead AI Engineer",
      bio: "Machine learning expert focused on document processing and automated patent drafting systems.",
      image: "/professional-headshot-of-devansh.jpg",
      linkedin: "#",
      github: "#",
      email: "devansh@patentai.com",
    },
    {
      name: "Dheeraj",
      role: "Senior Full-Stack Developer",
      bio: "Full-stack developer with expertise in building scalable legal tech platforms and secure document management.",
      image: "/professional-headshot-of-dheeraj.jpg",
      linkedin: "#",
      github: "#",
      email: "dheeraj@patentai.com",
    },
  ]

  const values = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Innovation First",
      description:
        "We believe every great invention deserves protection. Our mission is to make patent filing accessible to all innovators.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Transparency",
      description: "Clear pricing, honest timelines, and open communication throughout your patent journey.",
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "AI-Powered Excellence",
      description: "Combining human expertise with cutting-edge AI to deliver superior patent applications.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Assurance",
      description: "Every patent application is reviewed by experienced patent attorneys before filing.",
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
              <Link href="/pricing">
                <Button variant="outline" size="sm">
                  Pricing
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
              <Users className="h-4 w-4 mr-2" />
              Meet Our Team
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Revolutionizing Patent Filing with <span className="text-primary">AI Innovation</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              We're a team of patent attorneys, AI engineers, and legal tech experts on a mission to make patent
              protection accessible to every innovator.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Our Mission & Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Driven by innovation, guided by expertise, and committed to your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center bg-card border-border hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <div className="text-primary">{value.icon}</div>
                  </div>
                  <CardTitle className="text-xl text-card-foreground">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">Meet Our Expert Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Combining decades of patent law expertise with cutting-edge AI technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-card border-border">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-primary/10"
                    />
                  </div>
                  <CardTitle className="text-xl text-card-foreground">{member.name}</CardTitle>
                  <Badge variant="secondary" className="mx-auto w-fit">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-muted-foreground mb-4">{member.bio}</CardDescription>
                  <div className="flex justify-center space-x-3">
                    <Button variant="outline" size="sm" className="p-2 bg-transparent">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="p-2 bg-transparent">
                      <Github className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="p-2 bg-transparent">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Our Impact in Numbers</h2>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto text-pretty">
              Trusted by innovators worldwide to protect their intellectual property.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-2">10,000+</div>
              <div className="text-primary-foreground/80">Patents Filed</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-2">50+</div>
              <div className="text-primary-foreground/80">Countries</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-2">95%</div>
              <div className="text-primary-foreground/80">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold mb-2">24/7</div>
              <div className="text-primary-foreground/80">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Ready to Protect Your Innovation?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Join thousands of inventors who trust PatentAI for their patent filing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
