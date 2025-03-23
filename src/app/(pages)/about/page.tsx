/* eslint-disable react/no-unescaped-entities */
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col gap-y-10">
      {/* Banner Section */}
      <div className="relative h-[300px] w-full md:h-[400px] lg:h-[500px]">
        <div className="bg-muted/50 absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
            Our Story
          </h1>
          <p className="mb-6 max-w-2xl text-lg md:text-xl">
            Founded in 2015, we've been on a mission to provide high-quality
            products with exceptional customer service.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              We believe in creating products that enhance people's lives while
              maintaining a commitment to sustainability and ethical practices.
              Our goal is to provide exceptional value without compromising on
              quality or our values.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Card.Root className="w-full p-6 text-center md:w-[calc(33.333%-1rem)]">
                <Card.Content className="p-0">
                  <h3 className="mb-2 text-xl font-semibold">Quality</h3>
                  <p className="text-muted-foreground">
                    We never compromise on the quality of our products.
                  </p>
                </Card.Content>
              </Card.Root>
              <Card.Root className="w-full p-6 text-center md:w-[calc(33.333%-1rem)]">
                <Card.Content className="p-0">
                  <h3 className="mb-2 text-xl font-semibold">Sustainability</h3>
                  <p className="text-muted-foreground">
                    Committed to eco-friendly practices in everything we do.
                  </p>
                </Card.Content>
              </Card.Root>
              <Card.Root className="w-full p-6 text-center md:w-[calc(33.333%-1rem)]">
                <Card.Content className="p-0">
                  <h3 className="mb-2 text-xl font-semibold">Innovation</h3>
                  <p className="text-muted-foreground">
                    Constantly evolving to meet the needs of our customers.
                  </p>
                </Card.Content>
              </Card.Root>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                bio: "With over 15 years of industry experience, Sarah leads our company vision and strategy.",
              },
              {
                name: "Michael Chen",
                role: "Head of Product",
                bio: "Michael ensures our products meet the highest standards of quality and innovation.",
              },
              {
                name: "Aisha Patel",
                role: "Customer Experience",
                bio: "Aisha is dedicated to creating exceptional experiences for all our customers.",
              },
              {
                name: "David Rodriguez",
                role: "Operations Manager",
                bio: "David oversees our sustainable supply chain and efficient operations.",
              },
            ].map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-muted-foreground mb-4 size-40 rounded-full"></div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-muted-foreground text-center">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company History */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Our Journey</h2>
            <div className="space-y-12">
              {[
                {
                  year: "2015",
                  title: "The Beginning",
                  description:
                    "Started in a small garage with just three products and a vision to revolutionize the industry.",
                },
                {
                  year: "2018",
                  title: "Expanding Horizons",
                  description:
                    "Opened our first physical store and expanded our product line to over 50 unique items.",
                },
                {
                  year: "2020",
                  title: "Going Global",
                  description:
                    "Launched international shipping and partnered with sustainable manufacturers worldwide.",
                },
                {
                  year: "2023",
                  title: "Innovation Focus",
                  description:
                    "Established our R&D department to develop next-generation products with cutting-edge technology.",
                },
              ].map((milestone, index) => (
                <div key={index} className="flex flex-col gap-4 md:flex-row">
                  <div className="md:w-1/4">
                    <h2 className="text-primary border-b-2 text-2xl font-bold">
                      {milestone.year}
                    </h2>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="mb-2 text-xl font-semibold">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Get In Touch</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Have questions about our company or products? We'd love to hear
              from you.
            </p>
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center p-4">
                <Phone className="text-primary mb-4 size-8" />
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <Mail className="text-primary mb-4 size-8" />
                <p className="text-muted-foreground">contact@yourstore.com</p>
              </div>
              <div className="flex flex-col items-center p-4">
                <MapPin className="text-primary mb-4 size-8" />
                <p className="text-muted-foreground">
                  123 Commerce St, City, State
                </p>
              </div>
            </div>
            <Button size="lg" className="group">
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
