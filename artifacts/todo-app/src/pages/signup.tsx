import { useState } from "react";
import { useSignup } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLocation, Link } from "wouter";
import { Loader2, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const signupMutation = useSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    signupMutation.mutate(
      { data: { name, email, password } },
      {
        onSuccess: () => {
          toast({
            title: "Account created",
            description: "Please log in with your new credentials.",
          });
          setLocation("/login");
        },
        onError: (error) => {
          toast({
            title: "Sign up failed",
            description: error?.data?.error || "Could not create account",
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
          <h1 className="text-3xl font-serif text-foreground tracking-tight mb-2">Create an account</h1>
          <p className="text-muted-foreground text-sm">Start managing your personal tasks</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 sm:p-8 rounded-3xl shadow-sm border border-border/50">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl h-11"
              disabled={signupMutation.isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl h-11"
              disabled={signupMutation.isPending}
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
              disabled={signupMutation.isPending}
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-xl font-medium mt-2"
            disabled={signupMutation.isPending || !name || !email || !password}
          >
            {signupMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign up"}
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Log in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
