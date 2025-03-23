import LoginRegisterForm from "@/components/form/login-register-form";
import QueryProvider from "@/providers/query-provider";

export default function Auth() {
  return (
    <div className="container mx-auto py-6">
      <QueryProvider>
        <LoginRegisterForm />
      </QueryProvider>
    </div>
  );
}
