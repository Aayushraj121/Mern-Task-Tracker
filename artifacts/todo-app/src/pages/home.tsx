import { useState } from "react";
import { useGetTasks, useAddTask, getGetTasksQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus, GripVertical, CheckCircle2, Circle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

export default function Home() {
  const queryClient = useQueryClient();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const { data: tasks, isLoading } = useGetTasks();
  const addTask = useAddTask();

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

  return (
    <div className="min-h-[100dvh] w-full bg-background flex justify-center pt-12 sm:pt-24 px-4 pb-24">
      <div className="w-full max-w-xl flex flex-col gap-8">
        
        {/* Header */}
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-serif text-foreground tracking-tight">Today</h1>
          <p className="text-muted-foreground text-sm font-medium">
            {format(new Date(), "EEEE, MMMM do")}
          </p>
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
            className="w-full pl-5 pr-14 py-6 text-lg bg-card border-transparent shadow-sm hover:shadow-md focus-visible:ring-primary focus-visible:shadow-md transition-all duration-300 rounded-2xl"
            disabled={addTask.isPending}
            data-testid="input-task-title"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-transform active:scale-95"
            disabled={!newTaskTitle.trim() || addTask.isPending}
            data-testid="button-add-task"
          >
            {addTask.isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
          </Button>
        </form>

        {/* Task List */}
        <div className="flex flex-col gap-3">
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
                  className="group flex items-center gap-3 p-4 bg-card rounded-2xl shadow-sm border border-transparent hover:border-border transition-colors"
                  data-testid={`card-task-${task.id}`}
                >
                  <button className="text-muted-foreground/50 hover:text-primary transition-colors">
                    <Circle className="h-6 w-6" strokeWidth={1.5} />
                  </button>
                  
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-foreground font-medium truncate" data-testid={`text-task-title-${task.id}`}>
                      {task.title}
                    </span>
                  </div>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground/40 cursor-grab active:cursor-grabbing">
                    <GripVertical className="h-5 w-5" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
              data-testid="empty-state"
            >
              <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center mb-4">
                <CheckCircle2 className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">All clear</h3>
              <p className="text-muted-foreground text-sm max-w-[200px]">
                Looks like you've got a clean slate. Enjoy the calm.
              </p>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
