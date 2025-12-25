import { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";

interface FloatingCardsProps {
  isVisible: boolean;
}

export default function FloatingCards({ isVisible }: FloatingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const cards = [
    {
      id: 1,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      name: "María García",
      badge: "Top Rated",
      badgeColor: "bg-yellow-100 text-yellow-800",
      title: "Diseño de logo profesional y minimalista",
      rating: 4.9,
      reviews: 1200,
      deliveryTime: "24h",
      price: 25,
      delay: 600,
    },
    {
      id: 2,
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      name: "Carlos Ruiz",
      badge: "Verificado",
      badgeColor: "bg-blue-100 text-blue-800",
      title: "Revisión y optimización de código React",
      rating: 5.0,
      reviews: 85,
      deliveryTime: "12h",
      price: 15,
      delay: 300,
    },
    {
      id: 3,
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      name: "Ana Martínez",
      badge: "Verificado",
      badgeColor: "bg-blue-100 text-blue-800",
      title: "Traducción nativa Inglés-Español",
      rating: 4.8,
      reviews: 450,
      deliveryTime: "24h",
      price: 10,
      delay: 150,
    },
  ];

  return (
    <div ref={containerRef} className="relative h-[500px] md:h-[600px]">
      {/* Service Cards in a stacked layout */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Card 3 - Bottom/Back */}
        <div
          className={`absolute transition-all duration-1000`}
          style={{
            transitionDelay: `${cards[2].delay}ms`,
            transform: isVisible
              ? `translate(${30 + mousePosition.x * 5}px, ${
                  40 + mousePosition.y * 5
                }px) rotate(${2 + mousePosition.x * 2}deg)`
              : "translateY(100px)",
            opacity: isVisible ? 1 : 0,
            zIndex: 1,
          }}
        >
          <ServiceCard
            {...cards[2]}
            isVisible={isVisible}
            mousePosition={mousePosition}
          />
        </div>

        {/* Card 2 - Middle */}
        <div
          className={`absolute transition-all duration-1000`}
          style={{
            transitionDelay: `${cards[1].delay}ms`,
            transform: isVisible
              ? `translate(${-40 + mousePosition.x * 8}px, ${
                  10 + mousePosition.y * 8
                }px) rotate(${-3 + mousePosition.x * 3}deg)`
              : "translateY(100px)",
            opacity: isVisible ? 1 : 0,
            zIndex: 2,
          }}
        >
          <ServiceCard
            {...cards[1]}
            isVisible={isVisible}
            mousePosition={mousePosition}
          />
        </div>

        {/* Card 1 - Front/Top */}
        <div
          className={`absolute transition-all duration-1000`}
          style={{
            transitionDelay: `${cards[0].delay}ms`,
            transform: isVisible
              ? `translate(${10 + mousePosition.x * 12}px, ${
                  -20 + mousePosition.y * 12
                }px) rotate(${1 + mousePosition.x * 4}deg)`
              : "translateY(100px)",
            opacity: isVisible ? 1 : 0,
            zIndex: 3,
          }}
        >
          <ServiceCard
            {...cards[0]}
            isVisible={isVisible}
            mousePosition={mousePosition}
          />
        </div>
      </div>
    </div>
  );
}
