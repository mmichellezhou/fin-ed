import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface UserProfile {
  name: string;
  ageGroup: string;
  currentAgeGroup: string;
  completedAgeGroups: string[];
  progress: {
    [ageGroup: string]: {
      completedLessons: number;
      totalLessons: number;
      completedQuizzes: number;
      totalQuizzes: number;
      averageScore: number;
      streak: number;
      lastActivity: string;
      videoProgress: {
        [lessonId: number]: {
          [videoIndex: number]: boolean;
        };
      };
    };
  };
  badges: {
    id: number;
    name: string;
    description: string;
    earned: boolean;
    icon: string;
    ageGroup: string;
  }[];
}

interface UserContextType {
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  updateProgress: (
    ageGroup: string,
    lessonId: number,
    completed: boolean
  ) => void;
  updateVideoProgress: (
    ageGroup: string,
    lessonId: number,
    videoIndex: number,
    completed: boolean
  ) => void;
  isVideoCompleted: (
    ageGroup: string,
    lessonId: number,
    videoIndex: number
  ) => boolean;
  getLessonVideoProgress: (
    ageGroup: string,
    lessonId: number,
    totalVideos: number
  ) => { completed: number; total: number };
  updateQuizScore: (ageGroup: string, quizId: number, score: number) => void;
  completeAgeGroup: (ageGroup: string) => void;
  isAgeGroupCompleted: (ageGroup: string) => boolean;
  getCurrentAgeGroupProgress: () => UserProfile["progress"][string] | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
    }
  }, [userProfile]);

  const updateProgress = (
    ageGroup: string,
    lessonId: number,
    completed: boolean
  ) => {
    if (!userProfile) return;

    const updatedProfile = { ...userProfile };

    if (!updatedProfile.progress[ageGroup]) {
      updatedProfile.progress[ageGroup] = {
        completedLessons: 0,
        totalLessons: 0,
        completedQuizzes: 0,
        totalQuizzes: 0,
        averageScore: 0,
        streak: 0,
        lastActivity: new Date().toISOString(),
        videoProgress: {},
      };
    }

    if (completed) {
      updatedProfile.progress[ageGroup].completedLessons++;
    } else {
      updatedProfile.progress[ageGroup].completedLessons = Math.max(
        0,
        updatedProfile.progress[ageGroup].completedLessons - 1
      );
    }

    updatedProfile.progress[ageGroup].lastActivity = new Date().toISOString();
    setUserProfile(updatedProfile);
  };

  const updateVideoProgress = (
    ageGroup: string,
    lessonId: number,
    videoIndex: number,
    completed: boolean
  ) => {
    if (!userProfile) return;

    const updatedProfile = { ...userProfile };

    if (!updatedProfile.progress[ageGroup]) {
      updatedProfile.progress[ageGroup] = {
        completedLessons: 0,
        totalLessons: 0,
        completedQuizzes: 0,
        totalQuizzes: 0,
        averageScore: 0,
        streak: 0,
        lastActivity: new Date().toISOString(),
        videoProgress: {},
      };
    }

    if (!updatedProfile.progress[ageGroup].videoProgress[lessonId]) {
      updatedProfile.progress[ageGroup].videoProgress[lessonId] = {};
    }

    updatedProfile.progress[ageGroup].videoProgress[lessonId][videoIndex] =
      completed;

    // Check if all videos in the lesson are completed
    const lessonVideos =
      updatedProfile.progress[ageGroup].videoProgress[lessonId];
    const completedVideos = Object.values(lessonVideos).filter(Boolean).length;
    const totalVideos = Object.keys(lessonVideos).length;

    // If all videos are completed, update lesson completion
    if (completedVideos === totalVideos && totalVideos > 0) {
      // Add lesson completion to recent activity
      // updatedProfile.recentActivity.unshift({
      //   type: "lesson",
      //   title: `Completed lesson`,
      //   date: new Date().toISOString(),
      //   ageGroup,
      //   lessonId,
      // });

      // Update completed lessons count
      updatedProfile.progress[ageGroup].completedLessons++;
    }

    // Add video completion to recent activity
    // updatedProfile.recentActivity.unshift({
    //   type: "video",
    //   title: `Watched video in lesson`,
    //   date: new Date().toISOString(),
    //   ageGroup,
    //   lessonId,
    //   videoIndex,
    // });

    // Keep only last 10 activities
    // updatedProfile.recentActivity = updatedProfile.recentActivity.slice(0, 10);

    updatedProfile.progress[ageGroup].lastActivity = new Date().toISOString();
    setUserProfile(updatedProfile);
  };

  const isVideoCompleted = (
    ageGroup: string,
    lessonId: number,
    videoIndex: number
  ) => {
    if (!userProfile) return false;
    return (
      userProfile.progress[ageGroup]?.videoProgress?.[lessonId]?.[videoIndex] ||
      false
    );
  };

  const getLessonVideoProgress = (
    ageGroup: string,
    lessonId: number,
    totalVideos: number
  ) => {
    if (!userProfile) return { completed: 0, total: totalVideos };
    const progress = userProfile.progress[ageGroup];
    if (!progress) return { completed: 0, total: totalVideos };
    const videos = progress.videoProgress?.[lessonId];
    if (!videos) return { completed: 0, total: totalVideos };

    // Auto-cleanup: remove out-of-bounds video progress
    const validIndices = Array.from({ length: totalVideos }, (_, i) =>
      i.toString()
    );
    let cleaned = false;
    Object.keys(videos).forEach((idx) => {
      if (!validIndices.includes(idx)) {
        delete videos[idx];
        cleaned = true;
      }
    });
    if (cleaned) {
      // Save cleaned progress back to userProfile
      setUserProfile({ ...userProfile });
    }

    const completed = Object.keys(videos)
      .filter((idx) => Number(idx) < totalVideos)
      .map((idx) => videos[idx])
      .filter(Boolean).length;
    return { completed, total: totalVideos };
  };

  const updateQuizScore = (ageGroup: string, quizId: number, score: number) => {
    if (!userProfile) return;

    const updatedProfile = { ...userProfile };

    if (!updatedProfile.progress[ageGroup]) {
      updatedProfile.progress[ageGroup] = {
        completedLessons: 0,
        totalLessons: 0,
        completedQuizzes: 0,
        totalQuizzes: 0,
        averageScore: 0,
        streak: 0,
        lastActivity: new Date().toISOString(),
        videoProgress: {},
      };
    }

    updatedProfile.progress[ageGroup].completedQuizzes++;

    // Update average score
    const currentTotal =
      updatedProfile.progress[ageGroup].averageScore *
      (updatedProfile.progress[ageGroup].completedQuizzes - 1);
    updatedProfile.progress[ageGroup].averageScore =
      (currentTotal + score) /
      updatedProfile.progress[ageGroup].completedQuizzes;

    updatedProfile.progress[ageGroup].lastActivity = new Date().toISOString();
    setUserProfile(updatedProfile);
  };

  const completeAgeGroup = (ageGroup: string) => {
    if (!userProfile) return;

    const updatedProfile = { ...userProfile };
    if (!updatedProfile.completedAgeGroups.includes(ageGroup)) {
      updatedProfile.completedAgeGroups.push(ageGroup);
    }
    setUserProfile(updatedProfile);
  };

  const isAgeGroupCompleted = (ageGroup: string) => {
    if (!userProfile) return false;
    return userProfile.completedAgeGroups.includes(ageGroup);
  };

  const getCurrentAgeGroupProgress = () => {
    if (!userProfile) return null;
    return userProfile.progress[userProfile.currentAgeGroup] || null;
  };

  const value = {
    userProfile,
    setUserProfile,
    updateProgress,
    updateVideoProgress,
    isVideoCompleted,
    getLessonVideoProgress,
    updateQuizScore,
    completeAgeGroup,
    isAgeGroupCompleted,
    getCurrentAgeGroupProgress,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
