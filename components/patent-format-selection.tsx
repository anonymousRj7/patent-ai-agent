"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Globe, Building, Scale } from "lucide-react";

interface PatentOffice {
  id: string;
  name: string;
  fullName: string;
  flagUrl: string;
  description: string;
  processingTime: string;
  cost: string;
  coverage: string;
  popular: boolean;
}

interface PatentFormatSelectionProps {
  onSelect: (office: PatentOffice) => void;
  selectedOffice?: PatentOffice;
}

export default function PatentFormatSelection({
  onSelect,
  selectedOffice,
}: PatentFormatSelectionProps) {
  const patentOffices: PatentOffice[] = [
    {
      id: "uspto",
      name: "USPTO",
      fullName: "United States Patent and Trademark Office",
      flagUrl: "https://flagcdn.com/w40/us.png",
      description: "File patents for protection in the United States market",
      processingTime: "18-24 months",
      cost: "$1,600 - $3,200",
      coverage: "United States",
      popular: true,
    },
    {
      id: "wipo",
      name: "WIPO",
      fullName: "World Intellectual Property Organization",
      flagUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Flag_of_the_United_Nations.svg/40px-Flag_of_the_United_Nations.svg.png",
      description: "International patent application under PCT system",
      processingTime: "30-31 months",
      cost: "$4,000 - $8,000",
      coverage: "156+ Countries",
      popular: true,
    },
    {
      id: "epo",
      name: "EPO",
      fullName: "European Patent Office",
      flagUrl: "https://flagcdn.com/w40/eu.png",
      description:
        "Single application for protection across European countries",
      processingTime: "24-36 months",
      cost: "$3,000 - $6,000",
      coverage: "38 European Countries",
      popular: true,
    },
    {
      id: "ipo",
      name: "IPO",
      fullName: "Indian Patent Office",
      flagUrl: "https://flagcdn.com/w40/in.png",
      description: "File patents for protection in the Indian market",
      processingTime: "12-18 months",
      cost: "$200 - $800",
      coverage: "India",
      popular: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Choose Your Patent Office
        </h2>
        <p className="text-foreground">
          Select the jurisdiction where you want to file your patent application
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {patentOffices.map((office) => (
          <Card
            key={office.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedOffice?.id === office.id
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => onSelect(office)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={office.flagUrl}
                    alt={`${office.name} flag`}
                    className="w-8 h-6 object-cover rounded-sm"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-xl">{office.name}</CardTitle>
                      {office.popular && (
                        <Badge variant="secondary" className="text-xs">
                          Popular
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm font-medium text-foreground">
                      {office.fullName}
                    </CardDescription>
                  </div>
                </div>
                {selectedOffice?.id === office.id && (
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground mb-4">
                {office.description}
              </p>

              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-foreground" />
                    <span className="text-foreground">Coverage:</span>
                  </div>
                  <span className="font-medium">{office.coverage}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Building className="h-4 w-4 text-foreground" />
                    <span className="text-foreground">Processing:</span>
                  </div>
                  <span className="font-medium">{office.processingTime}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Scale className="h-4 w-4 text-foreground" />
                    <span className="text-foreground">Est. Cost:</span>
                  </div>
                  <span className="font-medium">{office.cost}</span>
                </div>
              </div>

              {selectedOffice?.id === office.id && (
                <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm text-primary font-medium">
                    ✓ Selected for your patent application
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedOffice && (
        <div className="mt-8 p-6 bg-muted/50 rounded-lg border border-border">
          <h3 className="font-semibold text-foreground mb-2">
            Selected: {selectedOffice.fullName}
          </h3>
          <p className="text-sm text-foreground mb-4">
            You've chosen to file your patent with {selectedOffice.name}. This
            will provide protection in {selectedOffice.coverage.toLowerCase()}.
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <div>
              <span className="text-foreground">Expected Timeline: </span>
              <span className="font-medium">
                {selectedOffice.processingTime}
              </span>
            </div>
            <div>
              <span className="text-foreground">Estimated Cost: </span>
              <span className="font-medium">{selectedOffice.cost}</span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          💡 Need Help Choosing?
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>
            • <strong>USPTO:</strong> Best for US market focus and faster
            processing
          </li>
          <li>
            • <strong>WIPO/PCT:</strong> Ideal for international protection and
            market flexibility
          </li>
          <li>
            • <strong>EPO:</strong> Perfect for European market expansion
          </li>
          <li>
            • <strong>IPO:</strong> Cost-effective option for Indian market
          </li>
        </ul>
      </div>
    </div>
  );
}
