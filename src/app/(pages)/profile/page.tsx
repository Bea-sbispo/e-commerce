"use client";

import { ChevronDown, Heart, Package, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Tabs } from "@/components/ui/tabs";
import { useAuth } from "@/helpers/use-auth";

export default function UserProfile() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 lg:px-8">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <div className="border-primary/10 flex size-16 items-center justify-center rounded-full border-2">
            <User className="size-10" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">Member since January 2022</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="size-4" />
            Settings
          </Button>
          <Link href="/favorites">
            <Button size="sm" className="gap-2">
              <Heart className="size-4" />
              Favorites
            </Button>
          </Link>
        </div>
      </div>

      <Tabs.Root defaultValue="profile" className="w-full">
        <Tabs.List className="grid w-full grid-cols-3 md:flex md:w-auto">
          <Tabs.Trigger value="profile" className="flex items-center gap-2">
            <User className="size-4" />
            <span className="hidden sm:inline">Profile</span>
          </Tabs.Trigger>
          <Tabs.Trigger value="purchases" className="flex items-center gap-2">
            <Package className="size-4" />
            <span className="hidden sm:inline">Purchases</span>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="profile" className="mt-6 space-y-6">
          <Card.Root>
            <Card.Header>
              <Card.Title>Personal Information</Card.Title>
              <Card.Description>
                Your personal details and preferences
              </Card.Description>
            </Card.Header>
            <Card.Content className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-muted-foreground text-sm font-medium">
                    Full Name
                  </h3>
                  <p>{user.name}</p>
                </div>
                <div>
                  <h3 className="text-muted-foreground text-sm font-medium">
                    Email
                  </h3>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h3 className="text-muted-foreground text-sm font-medium">
                    Phone
                  </h3>
                  <p>{user.phone}</p>
                </div>
                <div>
                  <h3 className="text-muted-foreground text-sm font-medium">
                    Location
                  </h3>
                  <p>{user.country}</p>
                </div>
              </div>
            </Card.Content>
          </Card.Root>

          <Card.Root>
            <Card.Header>
              <Card.Title>Shipping Address</Card.Title>
              <Card.Description>
                Your personal details and preferences
              </Card.Description>
            </Card.Header>
            <Card.Content className="space-y-4">
              <div>
                <p>123 Main Street</p>
                <p>Apt 4B</p>
                <p>New York, NY 10001</p>
                <p>United States</p>
              </div>
            </Card.Content>
          </Card.Root>

          <Card.Root>
            <Card.Header>
              <Card.Title>Account Preferences</Card.Title>
              <Card.Description>Manage your account settings</Card.Description>
            </Card.Header>
            <Card.Content className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-muted-foreground text-sm font-medium">
                    Language
                  </h3>
                  <p>English (US)</p>
                </div>
                <div>
                  <h3 className="text-muted-foreground text-sm font-medium">
                    Currency
                  </h3>
                  <p>USD ($)</p>
                </div>
                <div>
                  <h3 className="text-muted-foreground text-sm font-medium">
                    Newsletter
                  </h3>
                  <p>Subscribed</p>
                </div>
                <div>
                  <h3 className="text-muted-foreground text-sm font-medium">
                    Two-Factor Authentication
                  </h3>
                  <p>Enabled</p>
                </div>
              </div>
            </Card.Content>
          </Card.Root>
        </Tabs.Content>

        <Tabs.Content value="purchases" className="mt-6 space-y-6">
          <Card.Root>
            <Card.Header>
              <div className="flex items-center justify-between">
                <div>
                  <Card.Title>Purchase History</Card.Title>
                  <Card.Description>
                    Your recent orders and purchases
                  </Card.Description>
                </div>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <Button variant="outline" size="sm" className="gap-1">
                      Filter
                      <ChevronDown className="size-4" />
                    </Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content align="end">
                    <DropdownMenu.Label>Filter by</DropdownMenu.Label>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item>All Orders</DropdownMenu.Item>
                    <DropdownMenu.Item>Completed</DropdownMenu.Item>
                    <DropdownMenu.Item>Processing</DropdownMenu.Item>
                    <DropdownMenu.Item>Shipped</DropdownMenu.Item>
                    <DropdownMenu.Item>Cancelled</DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </div>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                {/* Order 1 */}
                <div className="overflow-hidden rounded-lg border">
                  <div className="bg-muted/40 flex items-center justify-between p-4">
                    <div>
                      <div className="font-medium">Order #A80942</div>
                      <div className="text-muted-foreground text-sm">
                        March 14, 2023
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge>Delivered</Badge>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="flex gap-3">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src="/placeholder.svg?height=64&width=64"
                            width={64}
                            height={64}
                            alt="Product"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">Wireless Headphones</div>
                          <div className="text-muted-foreground text-sm">
                            Black
                          </div>
                          <div className="text-sm">Qty: 1</div>
                        </div>
                      </div>
                      <div className="md:text-center">
                        <div className="text-muted-foreground text-sm">
                          Total
                        </div>
                        <div className="font-medium">$129.99</div>
                      </div>
                      <div className="flex justify-start md:justify-end">
                        <Button variant="outline" size="sm">
                          Buy Again
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order 2 */}
                <div className="overflow-hidden rounded-lg border">
                  <div className="bg-muted/40 flex items-center justify-between p-4">
                    <div>
                      <div className="font-medium">Order #A80899</div>
                      <div className="text-muted-foreground text-sm">
                        February 28, 2023
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge>Delivered</Badge>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="flex gap-3">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src="/placeholder.svg?height=64&width=64"
                            width={64}
                            height={64}
                            alt="Product"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">Smart Watch</div>
                          <div className="text-muted-foreground text-sm">
                            Silver
                          </div>
                          <div className="text-sm">Qty: 1</div>
                        </div>
                      </div>
                      <div className="md:text-center">
                        <div className="text-muted-foreground text-sm">
                          Total
                        </div>
                        <div className="font-medium">$249.99</div>
                      </div>
                      <div className="flex justify-start md:justify-end">
                        <Button variant="outline" size="sm">
                          Buy Again
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order 3 */}
                <div className="overflow-hidden rounded-lg border">
                  <div className="bg-muted/40 flex items-center justify-between p-4">
                    <div>
                      <div className="font-medium">Order #A80756</div>
                      <div className="text-muted-foreground text-sm">
                        January 15, 2023
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge>Delivered</Badge>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      <div className="flex gap-3">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                          <Image
                            src="/placeholder.svg?height=64&width=64"
                            width={64}
                            height={64}
                            alt="Product"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">Bluetooth Speaker</div>
                          <div className="text-muted-foreground text-sm">
                            Blue
                          </div>
                          <div className="text-sm">Qty: 1</div>
                        </div>
                      </div>
                      <div className="md:text-center">
                        <div className="text-muted-foreground text-sm">
                          Total
                        </div>
                        <div className="font-medium">$79.99</div>
                      </div>
                      <div className="flex justify-start md:justify-end">
                        <Button variant="outline" size="sm">
                          Buy Again
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card.Root>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
