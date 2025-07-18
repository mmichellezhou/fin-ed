import { ChevronDown, Play, Check, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";

export const LessonVideosDropdown = ({
  videos,
  lessonId,
  ageGroup,
}: {
  videos: { title: string; url: string }[];
  lessonId: number;
  ageGroup: string;
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
    videos.length
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

  return (
    <div className="w-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-md hover:shadow-lg transition-all duration-300 hover:scale-105"
      >
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4" />
          <span>Start Lesson</span>
          {combinedProgress.completed > 0 && (
            <span className="text-xs bg-white/20 px-2 py-1 rounded">
              {combinedProgress.completed}/{combinedProgress.total}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-2 p-3 bg-white border rounded-md shadow space-y-2">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Progress text */}
          <div className="text-sm text-gray-600 text-center">
            {combinedProgress.completed} of {combinedProgress.total} videos
            completed
          </div>

          {/* Videos list */}
          <div className="space-y-2">
            {videos.map((video, idx) => {
              const isCompleted = isVideoCompleted(ageGroup, lessonId, idx);
              return (
                <div key={idx} className="relative">
                  <div
                    className={`w-full flex items-center justify-between p-3 rounded-md border-2 transition-all duration-200 ${
                      isCompleted
                        ? "bg-green-100 border-green-300 text-green-800"
                        : "bg-blue-50 border-blue-200 text-blue-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isCompleted || localCompleted[idx]}
                          onChange={() => {
                            // Update local state immediately for testing
                            setLocalCompleted((prev) => ({
                              ...prev,
                              [idx]: !prev[idx],
                            }));

                            // Also try to update UserContext
                            updateVideoProgress(
                              ageGroup,
                              lessonId,
                              idx,
                              !isCompleted
                            );
                          }}
                          className="w-6 h-6 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 checked:bg-green-600 checked:border-green-600 cursor-pointer"
                        />
                        <span className="text-sm font-medium">
                          {video.title}
                        </span>
                        <span className="text-xs text-gray-500">
                          (
                          {isCompleted || localCompleted[idx]
                            ? "Completed"
                            : "Not completed"}
                          )
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completion message */}
          {combinedProgress.completed === combinedProgress.total &&
            combinedProgress.total > 0 && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center gap-2 text-green-700">
                  <Check className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Lesson completed! 🎉
                  </span>
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
};
