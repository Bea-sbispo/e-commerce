import type { Metadata } from "next";

import map from "@/assets/map-placeholder.png";

import ContactInfo from "@/components/contact-info-card";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact Us | Your Store",
  description: "Get in touch with our customer support team",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Contact Us</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-2xl font-semibold">Contact Information</h2>
          <ContactInfo />
        </div>

        <div className="space-y-4">
          <h2 className="mb-6 text-2xl font-semibold">Our Location</h2>
          <Image
            src={map}
            width={1200}
            height={1200}
            alt="map"
            className="w-full rounded-lg"
          />
          <Card.Root>
            <Card.Content className="flex items-start space-x-4">
              <MapPin className="text-primary size-5" />
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-muted-foreground mt-1">
                  123 Commerce Street
                  <br />
                  New York, NY 10001
                  <br />
                  United States
                </p>
              </div>
            </Card.Content>
          </Card.Root>
        </div>
      </div>
    </div>
  );
}
