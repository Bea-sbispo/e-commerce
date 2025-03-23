import { Card } from "@/components/ui/card";
import { Clock, Mail, Phone } from "lucide-react";

export default function ContactInfo() {
  const contactSessions = [
    {
      icon: <Phone className="text-primary size-5" />,
      title: "Phone",
      description: (
        <>
          Customer Service: +1 (800) 123-4567
          <br />
          Technical Support: +1 (800) 765-4321
        </>
      ),
    },
    {
      icon: <Mail className="text-primary size-5" />,
      title: "Email",
      description: (
        <>
          Customer Service: support@yourstore.com
          <br />
          Returns: returns@yourstore.com
          <br />
          Press Inquiries: press@yourstore.com
        </>
      ),
    },
    {
      icon: <Clock className="text-primary size-5" />,
      title: "Business Hours",
      description: (
        <>
          Monday - Friday: 9:00 AM - 6:00 PM EST
          <br />
          Saturday: 10:00 AM - 4:00 PM EST
          <br />
          Sunday: Closed
        </>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {contactSessions.map((session, index) => (
        <Card.Root key={index}>
          <Card.Content className="flex items-start space-x-4">
            {session.icon}
            <div>
              <h3 className="font-medium">{session.title}</h3>
              <p className="text-muted-foreground mt-1">
                {session.description}
              </p>
            </div>
          </Card.Content>
        </Card.Root>
      ))}
    </div>
  );
}
