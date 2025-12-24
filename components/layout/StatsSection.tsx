import React from 'react'

const StatsSection = () => {
    return (
        <section className="py-20 gradient-primary">
            <div className="container mx-auto relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                    {[
                        { value: "10,000+", label: "Microservices" },
                        { value: "50,000+", label: "Developers" },
                        { value: "99.9%", label: "Uptime SLA" },
                        { value: "$2M+", label: "Paid to sellers" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-foreground">
                            <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                            <div className="text-foreground/80">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default StatsSection
