import { useState } from "react";
import { useLogin, setAuthTokenGetter } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation, Link } from "wouter";
import { Loader2, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    loginMutation.mutate(
      { data: { email, password } },
      {
        onSuccess: (data) => {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setAuthTokenGetter(() => data.token);
          setLocation("/");
        },
        onError: (error) => {
          toast({
            title: "Login failed",
            description: error?.data?.error || "Invalid credentials",
            variant: "destructive",
          });
        }
      }
    );
  };

  return (
    <div className="min-h-[100dvh] w-full flex bg-background items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="h-12 w-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
            <BookOpen className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-serif text-foreground tracking-tight mb-2">Welcome back</h1>
          <p className="text-muted-foreground text-sm">Enter your details to access your tasks</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 sm:p-8 rounded-3xl shadow-sm border border-border/50">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl h-11"
              disabled={loginMutation.isPending}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl h-11"
              disabled={loginMutation.isPending}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-xl font-medium mt-2"
            disabled={loginMutation.isPending || !email || !password}
          >
            {loginMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Log in"}
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
