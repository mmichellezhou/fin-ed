import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, ChevronDown, Play, Check, ExternalLink } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

interface LessonDetailsDialogProps {
  lesson: any;
  ageGroup: string;
  isLessonCompleted: (lesson: any) => boolean;
  goToQuiz: (lesson: any) => void;
  startLesson: (lesson: any) => void;
  categoryColors: Record<string, string>;
  categories: Record<string, string>;
  children: React.ReactNode; // For DialogTrigger
}

const LessonDetailsDialog: React.FC<LessonDetailsDialogProps> = ({
  lesson,
  ageGroup,
  isLessonCompleted,
  goToQuiz,
  startLesson,
  categoryColors,
  categories,
  children,
}) => {
  // --- StartLessonButton logic inlined here ---
  const videos = lesson.videos;
  const lessonId = lesson.id;
  const [open, setOpen] = useState(false);
  const {
    isVideoCompleted,
    updateVideoProgress,
    getLessonVideoProgress,
    userProfile,
  } = useUser();

  // Local state for testing
  const [localCompleted, setLocalCompleted] = useState<{ [key: number]: boolean }>({});

  const videoProgress = getLessonVideoProgress(
    ageGroup,
    lessonId,
    videos?.length || 0
  );

  // Combine UserContext progress with local state
  const localCompletedCount = Object.values(localCompleted).filter(Boolean).length;
  const combinedProgress = {
    completed: videoProgress.completed + localCompletedCount,
    total: videoProgress.total,
  };

  const progressPercentage =
    combinedProgress.total > 0
      ? (combinedProgress.completed / combinedProgress.total) * 100
      : 0;

  const anyCompleted = combinedProgress.completed > 0 && combinedProgress.completed < combinedProgress.total;
  const allCompleted = combinedProgress.completed === combinedProgress.total && combinedProgress.total > 0;

  useEffect(() => {}, [userProfile]);

  const handleVideoClick = (videoIndex: number, url: string) => {
    updateVideoProgress(ageGroup, lessonId, videoIndex, true);
    try {
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (!newWindow) {
        window.location.href = url;
      }
    } catch (error) {
      window.location.href = url;
    }
  };
  // --- End StartLessonButton logic ---

  // Render the dialog
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{lesson.image}</span>
            {lesson.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-muted-foreground">{lesson.description}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {lesson.duration}
            </span>
            <Badge className={categoryColors[lesson.category] || ""}>
              {categories[lesson.category as keyof typeof categories]}
            </Badge>
          </div>
          {/* StartLessonButton UI inlined here */}
          <div className="pt-4 w-full">
            <div className="flex gap-2 w-full">
              {/* Start Lesson button or dropdown */}
              {(!videos || videos.length === 0) ? (
                <Button
                  onClick={startLesson ? () => startLesson(lesson) : undefined}
                  size="default"
                  className="bg-gradient-to-r from-primary to-secondary text-white w-full"
                >
                  <Play className="w-4 h-4" />
                  Start Lesson
                </Button>
              ) : (
                <div className="w-full">
                  <Button
                    onClick={() => setOpen(!open)}
                    size="default"
                    className="w-full flex items-center justify-between bg-gradient-to-r from-primary to-secondary text-white"
                  >
                    <span className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      {allCompleted
                        ? "Review Lessons"
                        : anyCompleted
                        ? "Continue Lesson"
                        : "Start Lesson"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </Button>
                </div>
              )}
              {/* Take Quiz button, now next to Start Lesson */}
              {isLessonCompleted(lesson) && (
                <Button
                  onClick={() => goToQuiz(lesson)}
                  variant="success"
                  size="default"
                  // No w-full, button will size to content
                >
                  <Target className="w-4 h-4" />
                  Take Quiz
                </Button>
              )}
            </div>
            {/* Dropdown content remains below, if open */}
            {videos && videos.length > 0 && open && (
              <div className="mt-4 p-5 bg-background border border-border rounded-xl shadow-md w-full max-w-lg mx-auto space-y-3 animate-fade-in">
                {/* Progress bar */}
                <div>
                  <div className="w-full bg-muted rounded-full h-3 mb-2">
                    <div
                      className="bg-gradient-to-r from-primary to-success h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground text-center">
                    {combinedProgress.completed} of {combinedProgress.total} videos completed
                    {combinedProgress.completed === combinedProgress.total && combinedProgress.total > 0 && ' 🎉'}
                  </div>
                </div>
                {/* Video list */}
                <div className="space-y-2">
                  {videos.map((video: any, idx: number) => {
                    const isCompleted = isVideoCompleted(ageGroup, lessonId, idx);
                    return (
                      <div
                        key={idx}
                        className={`flex items-center justify-between gap-3 p-3 rounded-lg transition border border-border cursor-pointer ${
                          isCompleted
                            ? "bg-success/10"
                            : "hover:bg-primary/10"
                        }`}
                      >
                        <button
                          type="button"
                          aria-label={isCompleted ? "Mark as not completed" : "Mark as completed"}
                          onClick={e => {
                            e.stopPropagation();
                            updateVideoProgress(ageGroup, lessonId, idx, !isCompleted);
                          }}
                          className={`w-5 h-5 flex items-center justify-center rounded-full border transition-colors duration-200 outline-none cursor-pointer border ${
                            isCompleted ? "border-success" : "border-muted-foreground"
                          } bg-white`}
                        >
                          {isCompleted && <Check className="w-4 h-4 text-success" />}
                        </button>
                        <span className="font-medium text-sm text-foreground flex-1 ml-2">
                          {video.title}
                        </span>
                        <a
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="text-muted-foreground hover:text-primary transition"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LessonDetailsDialog; 