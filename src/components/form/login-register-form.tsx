"use client";

import {
  LoginFormData,
  loginSchema,
  RegisterFormData,
  registerSchema,
} from "@/helpers/validationSchema";
import { UserTypes } from "@/types/globals";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs } from "../ui/tabs";

export default function LoginRegisterForm() {
  const [activeTab, setActiveTab] = useState("login");
  const router = useRouter();

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const users = JSON.parse(sessionStorage.getItem("users") || "[]");
      const user = users.find(
        (u: UserTypes) =>
          u.email === data.email && u.password === data.password,
      );
      if (!user) throw new Error("Invalid credentials");
      return user;
    },
    onSuccess: (user) => {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => {
      const users = JSON.parse(sessionStorage.getItem("users") || "[]");
      const userExists = users.some((u: UserTypes) => u.email === data.email);
      if (userExists) throw new Error("User already exists");
      users.push(data);
      sessionStorage.setItem("users", JSON.stringify(users));
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      alert("Registration successful!");
      setActiveTab("login");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  return (
    <Card.Root className="mx-auto w-full max-w-md">
      <Card.Header>
        <Card.Title className="text-center text-2xl">Welcome</Card.Title>
        <Card.Description className="text-center">
          Sign in to your account or create a new one
        </Card.Description>
      </Card.Header>
      <Tabs.Root
        defaultValue="login"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <Tabs.List className="grid w-full grid-cols-2">
          <Tabs.Trigger value="login">Login</Tabs.Trigger>
          <Tabs.Trigger value="register">Register</Tabs.Trigger>
        </Tabs.List>
        <Card.Content className="pt-6">
          <Tabs.Content value="login">
            <form
              onSubmit={handleLoginSubmit((data) => loginMutation.mutate(data))}
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="name@example.com"
                    {...loginRegister("email")}
                  />
                  {loginErrors.email && (
                    <span className="text-sm text-red-500">
                      {loginErrors.email.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <Button
                      variant="link"
                      className="h-auto p-0 text-sm"
                      type="button"
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <Input
                    id="login-password"
                    type="password"
                    {...loginRegister("password")}
                  />
                  {loginErrors.password && (
                    <span className="text-sm text-red-500">
                      {loginErrors.password.message}
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </form>
          </Tabs.Content>
          <Tabs.Content value="register">
            <form
              onSubmit={handleRegisterSubmit((data) =>
                registerMutation.mutate(data),
              )}
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="register-name">Name</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="John Doe"
                    {...registerRegister("name")}
                  />
                  {registerErrors.name && (
                    <span className="text-sm text-red-500">
                      {registerErrors.name.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="name@example.com"
                    {...registerRegister("email")}
                  />
                  {registerErrors.email && (
                    <span className="text-sm text-red-500">
                      {registerErrors.email.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="register-phone">Phone</Label>
                  <Input
                    id="register-phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    {...registerRegister("phone")}
                  />
                  {registerErrors.phone && (
                    <span className="text-sm text-red-500">
                      {registerErrors.phone.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="register-country">Country</Label>
                  <Input
                    id="register-country"
                    type="text"
                    placeholder="Brazil"
                    {...registerRegister("country")}
                  />
                  {registerErrors.country && (
                    <span className="text-sm text-red-500">
                      {registerErrors.country.message}
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    {...registerRegister("password")}
                  />
                  {registerErrors.password && (
                    <span className="text-sm text-red-500">
                      {registerErrors.password.message}
                    </span>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </form>
          </Tabs.Content>
        </Card.Content>
      </Tabs.Root>
      <Card.Footer className="flex flex-col items-center justify-center pt-0">
        <p className="text-muted-foreground mt-2 text-center text-xs">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </Card.Footer>
    </Card.Root>
  );
}
