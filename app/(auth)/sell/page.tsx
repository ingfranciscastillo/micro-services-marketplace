"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CodeBlock } from "@/components/marketplace/CodeBlock";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Upload,
  Plus,
  X,
  FileCode,
  DollarSign,
  Settings,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

const steps = [
  { id: 1, name: "Basic Info", icon: FileCode },
  { id: 2, name: "Pricing", icon: DollarSign },
  { id: 3, name: "API Details", icon: Settings },
  { id: 4, name: "Preview", icon: Eye },
];

const categories = [
  "AI & Machine Learning",
  "Authentication",
  "Payments",
  "Email & Messaging",
  "Data Processing",
  "Storage",
  "Analytics",
  "DevOps",
];

export default function SellerOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    shortDescription: "",
    fullDescription: "",
    tags: [] as string[],
    tagInput: "",
    logo: null as File | null,
    // Pricing
    hasFreeplan: true,
    freeRequestLimit: "1000",
    starterPrice: "29",
    starterRequests: "10000",
    proPrice: "99",
    proRequests: "100000",
    enterpriseCustom: true,
    // API Details
    baseUrl: "",
    authType: "api_key",
    endpoints: [{ method: "GET", path: "/", description: "" }],
    exampleCode: `fetch('https://api.example.com/v1/data', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
})
.then(res => res.json())
.then(data => console.log(data));`,
    documentation: "",
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (formData.tagInput.trim() && formData.tags.length < 5) {
      updateFormData("tags", [...formData.tags, formData.tagInput.trim()]);
      updateFormData("tagInput", "");
    }
  };

  const removeTag = (index: number) => {
    updateFormData(
      "tags",
      formData.tags.filter((_, i) => i !== index)
    );
  };

  const addEndpoint = () => {
    updateFormData("endpoints", [
      ...formData.endpoints,
      { method: "GET", path: "/", description: "" },
    ]);
  };

  const updateEndpoint = (index: number, field: string, value: string) => {
    const newEndpoints = [...formData.endpoints];
    newEndpoints[index] = { ...newEndpoints[index], [field]: value };
    updateFormData("endpoints", newEndpoints);
  };

  const removeEndpoint = (index: number) => {
    if (formData.endpoints.length > 1) {
      updateFormData(
        "endpoints",
        formData.endpoints.filter((_, i) => i !== index)
      );
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    toast.success("Microservice submitted for review!", {
      description: "We'll notify you once it's approved.",
    });
    router.push("/dashboard");
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                currentStep > step.id
                  ? "bg-accent text-accent-foreground"
                  : currentStep === step.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {currentStep > step.id ? (
                <Check className="w-5 h-5" />
              ) : (
                <step.icon className="w-5 h-5" />
              )}
            </div>
            <span
              className={`text-xs mt-2 hidden sm:block ${
                currentStep >= step.id
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {step.name}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-12 sm:w-24 h-0.5 mx-2 ${
                currentStep > step.id ? "bg-accent" : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Service Name *</Label>
          <Input
            id="name"
            placeholder="e.g., Smart Image Optimizer"
            value={formData.name}
            onChange={(e) => updateFormData("name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => updateFormData("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="shortDescription">Short Description *</Label>
        <Input
          id="shortDescription"
          placeholder="A brief one-liner about your service (max 120 chars)"
          maxLength={120}
          value={formData.shortDescription}
          onChange={(e) => updateFormData("shortDescription", e.target.value)}
        />
        <p className="text-xs text-muted-foreground text-right">
          {formData.shortDescription.length}/120
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="fullDescription">Full Description *</Label>
        <Textarea
          id="fullDescription"
          placeholder="Describe your microservice in detail. What problem does it solve? What are the key features?"
          rows={6}
          value={formData.fullDescription}
          onChange={(e) => updateFormData("fullDescription", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Tags (up to 5)</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Add a tag"
            value={formData.tagInput}
            onChange={(e) => updateFormData("tagInput", e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTag())
            }
          />
          <Button
            type="button"
            variant="outline"
            onClick={addTag}
            disabled={formData.tags.length >= 5}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="gap-1">
              {tag}
              <button
                onClick={() => removeTag(index)}
                className="ml-1 hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Service Logo</Label>
        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
          <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">
            Drag & drop or click to upload
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PNG, JPG up to 2MB (recommended: 256x256)
          </p>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
        <div>
          <h4 className="font-medium">Free Plan</h4>
          <p className="text-sm text-muted-foreground">
            Offer a free tier for developers to try
          </p>
        </div>
        <Switch
          checked={formData.hasFreeplan}
          onCheckedChange={(checked) => updateFormData("hasFreeplan", checked)}
        />
      </div>

      {formData.hasFreeplan && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Free Tier</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Monthly Request Limit</Label>
              <Input
                type="number"
                value={formData.freeRequestLimit}
                onChange={(e) =>
                  updateFormData("freeRequestLimit", e.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            Starter Plan
            <Badge variant="default">Popular</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Price ($/month)</Label>
              <Input
                type="number"
                value={formData.starterPrice}
                onChange={(e) => updateFormData("starterPrice", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Monthly Requests</Label>
              <Input
                type="number"
                value={formData.starterRequests}
                onChange={(e) =>
                  updateFormData("starterRequests", e.target.value)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Pro Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Price ($/month)</Label>
              <Input
                type="number"
                value={formData.proPrice}
                onChange={(e) => updateFormData("proPrice", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Monthly Requests</Label>
              <Input
                type="number"
                value={formData.proRequests}
                onChange={(e) => updateFormData("proRequests", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
        <div>
          <h4 className="font-medium">Enterprise Plan</h4>
          <p className="text-sm text-muted-foreground">
            Custom pricing for large organizations
          </p>
        </div>
        <Switch
          checked={formData.enterpriseCustom}
          onCheckedChange={(checked) =>
            updateFormData("enterpriseCustom", checked)
          }
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="baseUrl">Base API URL *</Label>
          <Input
            id="baseUrl"
            placeholder="https://api.yourservice.com/v1"
            value={formData.baseUrl}
            onChange={(e) => updateFormData("baseUrl", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Authentication Type</Label>
          <Select
            value={formData.authType}
            onValueChange={(value) => updateFormData("authType", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="api_key">API Key</SelectItem>
              <SelectItem value="oauth2">OAuth 2.0</SelectItem>
              <SelectItem value="jwt">JWT Token</SelectItem>
              <SelectItem value="basic">Basic Auth</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>API Endpoints</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addEndpoint}
          >
            <Plus className="w-4 h-4 mr-1" /> Add Endpoint
          </Button>
        </div>

        {formData.endpoints.map((endpoint, index) => (
          <Card key={index}>
            <CardContent className="pt-4">
              <div className="flex gap-2 items-start">
                <Select
                  value={endpoint.method}
                  onValueChange={(value) =>
                    updateEndpoint(index, "method", value)
                  }
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="/endpoint"
                  value={endpoint.path}
                  onChange={(e) =>
                    updateEndpoint(index, "path", e.target.value)
                  }
                  className="flex-1"
                />
                {formData.endpoints.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEndpoint(index)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <Input
                placeholder="Endpoint description"
                value={endpoint.description}
                onChange={(e) =>
                  updateEndpoint(index, "description", e.target.value)
                }
                className="mt-2"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-2">
        <Label>Example Code</Label>
        <Textarea
          rows={8}
          className="font-mono text-sm"
          value={formData.exampleCode}
          onChange={(e) => updateFormData("exampleCode", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Documentation URL (optional)</Label>
        <Input
          placeholder="https://docs.yourservice.com"
          value={formData.documentation}
          onChange={(e) => updateFormData("documentation", e.target.value)}
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl">
                {formData.name || "Your Service Name"}
              </CardTitle>
              <CardDescription className="mt-1">
                {formData.shortDescription ||
                  "Your short description will appear here"}
              </CardDescription>
            </div>
            <Badge variant="outline">{formData.category || "Category"}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <p className="text-muted-foreground">
            {formData.fullDescription ||
              "Your full description will appear here..."}
          </p>

          <div className="grid gap-4 sm:grid-cols-3 pt-4 border-t">
            {formData.hasFreeplan && (
              <div className="p-4 bg-muted/50 rounded-xl text-center">
                <p className="text-sm text-muted-foreground">Free</p>
                <p className="text-2xl font-bold">$0</p>
                <p className="text-xs text-muted-foreground">
                  {formData.freeRequestLimit} requests/mo
                </p>
              </div>
            )}
            <div className="p-4 bg-primary/10 rounded-xl text-center border-2 border-primary">
              <p className="text-sm text-primary font-medium">Starter</p>
              <p className="text-2xl font-bold">${formData.starterPrice}</p>
              <p className="text-xs text-muted-foreground">
                {formData.starterRequests} requests/mo
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-xl text-center">
              <p className="text-sm text-muted-foreground">Pro</p>
              <p className="text-2xl font-bold">${formData.proPrice}</p>
              <p className="text-xs text-muted-foreground">
                {formData.proRequests} requests/mo
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">API Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {formData.endpoints.map((endpoint, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg"
              >
                <Badge>{endpoint.method}</Badge>
                <code className="text-sm">
                  {formData.baseUrl || "https://api.example.com"}
                  {endpoint.path}
                </code>
              </div>
            ))}
          </div>
          <CodeBlock code={formData.exampleCode} language="javascript" />
        </CardContent>
      </Card>

      <Card className="bg-accent/10 border-accent">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="font-medium">Ready to Submit</h4>
              <p className="text-sm text-muted-foreground">
                Your microservice will be reviewed within 24-48 hours.
                We&apos;ll notify you via email once it&apos;s approved.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Publish Your Microservice</h1>
            <p className="text-muted-foreground mt-2">
              Share your API with thousands of developers worldwide
            </p>
          </div>

          {renderStepIndicator()}

          <Card>
            <CardHeader>
              <CardTitle>
                Step {currentStep}: {steps[currentStep - 1].name}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Tell us about your microservice"}
                {currentStep === 2 && "Set up your pricing tiers"}
                {currentStep === 3 && "Configure your API details"}
                {currentStep === 4 && "Review and submit your listing"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}

              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>

                {currentStep < 4 ? (
                  <Button onClick={nextStep}>
                    Continue
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-accent hover:bg-accent/90"
                  >
                    Submit for Review
                    <Check className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
