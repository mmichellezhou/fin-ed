import { ChevronDown, Play, Check, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";

export const StartLessonButton = ({
  videos,
  lessonId,
  ageGroup,
  onStart,
}: {
  videos?: { title: string; url: string }[];
  lessonId: number;
  ageGroup: string;
  onStart?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const {
    isVideoCompleted,
    updateVideoProgress,
    getLessonVideoProgress,
    userProfile,
  } = useUser();

  // Local state for testing
  const [localCompleted, setLocalCompleted] = useState<{
    [key: number]: boolean;
  }>({});

  const videoProgress = getLessonVideoProgress(
    ageGroup,
    lessonId,
    videos?.length || 0
  );

  // Combine UserContext progress with local state
  const localCompletedCount =
    Object.values(localCompleted).filter(Boolean).length;
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

  // Listen for userProfile changes to force re-render
  useEffect(() => {
    // Component will re-render when userProfile changes
  }, [userProfile]);

  const handleVideoClick = (videoIndex: number, url: string) => {
    // Mark video as completed
    updateVideoProgress(ageGroup, lessonId, videoIndex, true);

    // Try to open video in new tab with better error handling
    try {
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (!newWindow) {
        // If popup is blocked, try to open in same tab
        window.location.href = url;
      }
    } catch (error) {
      // Fallback: try to open in same tab
      window.location.href = url;
    }
  };

  // If no videos, render a single Start Lesson button
  if (!videos || videos.length === 0) {
    return (
      <Button
        onClick={onStart}
        size="default"
        className="bg-gradient-to-r from-primary to-secondary text-white"
      >
        <Play className="w-4 h-4" />
        Start Lesson
      </Button>
    );
  }

  // If videos exist, render dropdown button and dropdown content
  return (
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

      {open && (
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
            </div>
          </div>

          {/* Video list */}
          <div className="space-y-2">
            {videos.map((video, idx) => {
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

          {/* Completion message */}
          {combinedProgress.completed === combinedProgress.total && combinedProgress.total > 0 && (
            <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-xl flex items-center gap-2 text-success justify-center">
              <Check className="w-6 h-6" />
              <span className="text-base font-semibold">Lesson completed! 🎉</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
