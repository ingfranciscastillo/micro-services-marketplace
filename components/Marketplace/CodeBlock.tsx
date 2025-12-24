import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
}

export function CodeBlock({ code, language = "javascript", showLineNumbers = true }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const lines = code.split("\n");

    return (
        <div className="relative rounded-xl bg-code overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-muted/20">
                <span className="text-xs font-mono text-muted-foreground">{language}</span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-7 px-2 text-code-foreground hover:bg-muted/20"
                >
                    {copied ? (
                        <>
                            <Check className="h-3.5 w-3.5 mr-1" />
                            Copied
                        </>
                    ) : (
                        <>
                            <Copy className="h-3.5 w-3.5 mr-1" />
                            Copy
                        </>
                    )}
                </Button>
            </div>
            <div className="overflow-x-auto p-4">
        <pre className="text-sm font-mono text-code-foreground">
          {lines.map((line, index) => (
              <div key={index} className="flex">
                  {showLineNumbers && (
                      <span className="select-none pr-4 text-muted-foreground/50 text-right min-w-[2rem]">
                  {index + 1}
                </span>
                  )}
                  <code>{line}</code>
              </div>
          ))}
        </pre>
            </div>
        </div>
    );
}
