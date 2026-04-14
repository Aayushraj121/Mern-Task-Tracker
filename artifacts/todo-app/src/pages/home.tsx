import { useState, useMemo } from "react";
import { useGetTasks, useAddTask, useDeleteTask, getGetTasksQueryKey, setAuthTokenGetter } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, CheckCircle2, Circle, LogOut, BookOpen, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { useLocation } from "wouter";

export default function Home() {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return null;
    }
  }, []);

  const { data: tasks, isLoading } = useGetTasks();
  const addTask = useAddTask();
  const deleteTask = useDeleteTask();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthTokenGetter(null);
    setLocation("/login");
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || addTask.isPending) return;

    addTask.mutate(
      { data: { title: newTaskTitle.trim() } },
      {
        onSuccess: () => {
          setNewTaskTitle("");
          queryClient.invalidateQueries({ queryKey: getGetTasksQueryKey() });
        },
      }
    );
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask.mutate(
      { id: taskId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getGetTasksQueryKey() });
        },
      }
    );
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background flex justify-center pt-8 sm:pt-16 px-4 pb-24">
      <div className="w-full max-w-xl flex flex-col gap-8">
        
        {/* Header */}
        <header className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <BookOpen className="h-5 w-5" />
              <span className="font-serif text-lg">{user?.name}'s Notebook</span>
            </div>
            <h1 className="text-4xl font-serif text-foreground tracking-tight">Today</h1>
            <p className="text-muted-foreground text-sm font-medium">
              {format(new Date(), "EEEE, MMMM do")}
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </Button>
        </header>

        {/* Add Task Form */}
        <form 
          onSubmit={handleAddTask}
          className="relative flex items-center group"
        >
          <Input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full pl-6 pr-14 py-7 text-lg bg-card border-transparent shadow-sm hover:shadow-md focus-visible:ring-primary focus-visible:shadow-md transition-all duration-300 rounded-2xl"
            disabled={addTask.isPending}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-3 h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-transform active:scale-95"
            disabled={!newTaskTitle.trim() || addTask.isPending}
          >
            {addTask.isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
          </Button>
        </form>

        {/* Task List */}
        <div className="flex flex-col gap-3 mt-2">
          {isLoading ? (
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 rounded-2xl bg-card/50 animate-pulse border border-transparent" />
              ))}
            </div>
          ) : tasks && tasks.length > 0 ? (
            <AnimatePresence initial={false}>
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  layout
                  className="group flex items-center gap-3 p-4 bg-card rounded-2xl shadow-sm border border-transparent hover:border-border/50 transition-all duration-200"
                >
                  <div className="text-muted-foreground/30 group-hover:text-primary transition-colors duration-300">
                    <Circle className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-foreground font-medium truncate text-lg">
                      {task.title}
                    </span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteTask(task.id)}
                    disabled={deleteTask.isPending}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="h-20 w-20 rounded-full bg-secondary/50 flex items-center justify-center mb-6">
                <CheckCircle2 className="h-10 w-10 text-muted-foreground/40" />
              </div>
              <h3 className="text-xl font-serif text-foreground mb-2">All clear</h3>
              <p className="text-muted-foreground text-sm max-w-[240px]">
                Your notebook is empty. Enjoy the peace and quiet.
              </p>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
