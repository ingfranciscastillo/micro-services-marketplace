"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, Code2, Gauge, Search, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingCards from "@/components/layout/FloatingServiceCards";
import Link from "next/link";

const HeaderSection = () => {
  return (
    <section className="relative gradient-hero py-20 lg:py-32 overflow-hidden">
      <div className="container relative z-10 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <Badge variant="secondary" className="px-4 py-1.5 text-sm">
              🚀 Más de 10,000 micro-servicios disponibles
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
              Micro-servicios profesionales.{" "}
              <span className="text-primary">Resultados en horas.</span>
            </h1>
            <p
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0"
              style={{ animationDelay: "0.1s" }}
            >
              Conecta al instante con expertos verificados para tareas de diseño, desarrollo y contenido. Simple, seguro y sin complicaciones.
            </p>

            {/* Search bar */}
            <div
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto lg:mx-0"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Busca diseño, desarrollo, traducciones…"
                  className="pl-12 h-14 text-base rounded-xl border-2 focus:border-primary"
                />
              </div>
              <Link href={"/marketplace"}>
                <Button variant="default" size="lg" className={"h-14"}>
                  Explorar servicios
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent" />
                <span>Profesionales verificados</span>
              </div>
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-accent" />
                <span>Pagos seguros y protegidos</span>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-accent" />
                <span>Entrega rápida garantizada</span>
              </div>
            </div>
          </div>

          {/* Code preview */}
          <div
            className="hidden lg:block animate-slide-in-right"
            style={{ animationDelay: "0.3s" }}
          >
            <FloatingCards isVisible={true}/>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-20 right-40 w-64 h-64 rounded-full bg-accent blur-3xl" />
      </div>
    </section>
  );
};
export default HeaderSection;
