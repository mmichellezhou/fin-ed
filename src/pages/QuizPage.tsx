import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Trophy, Clock, AlertCircle, ClipboardList } from "lucide-react";

// Mock quiz data
const quizzes = [
  {
    id: 1,
    title: "What is Money? Quiz",
    lessonTitle: "What is Money?",
    completed: true,
    score: 85,
    questions: [
      {
        id: 1,
        question: "What is the main purpose of money?",
        options: [
          "To look pretty",
          "To buy things we need and want",
          "To play games with",
          "To collect"
        ],
        correctAnswer: 1,
        explanation: "Money is primarily used as a medium of exchange to buy goods and services."
      },
      {
        id: 2,
        question: "Which of these is NOT a form of money?",
        options: [
          "Coins",
          "Paper bills",
          "Rocks",
          "Credit cards"
        ],
        correctAnswer: 2,
        explanation: "While rocks have been used as currency in some ancient cultures, they are not considered modern money."
      }
    ]
  },
  {
    id: 2,
    title: "Your First Budget Quiz",
    lessonTitle: "Your First Budget",
    completed: false,
    score: null,
    questions: [
      {
        id: 1,
        question: "What percentage of your income should you try to save?",
        options: [
          "0%",
          "10-20%",
          "50%",
          "90%"
        ],
        correctAnswer: 1,
        explanation: "Financial experts recommend saving 10-20% of your income for emergencies and future goals."
      }
    ]
  },
  {
    id: 3,
    title: "Saving vs Spending Quiz",
    lessonTitle: "Saving vs Spending",
    completed: false,
    score: null,
    questions: []
  }
];

const QuizPage = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const completedQuizzes = quizzes.filter(q => q.completed);
  const incompleteQuizzes = quizzes.filter(q => !q.completed);

  const startQuiz = (quiz: any) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizStarted(true);
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < selectedQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === selectedQuiz.questions[index].correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / selectedQuiz.questions.length) * 100);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  if (selectedQuiz && quizStarted) {
    const currentQ = selectedQuiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;

    if (showResults) {
      const score = calculateScore();
      return (
        <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center animate-scale-in">
              <div className="mb-6">
                <Trophy className="w-16 h-16 text-warning mx-auto mb-4" />
                <h2 className="text-3xl font-playfair font-bold text-foreground mb-2">
                  Quiz Complete!
                </h2>
                <p className="text-muted-foreground">
                  You scored {score}% on "{selectedQuiz.title}"
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {selectedQuiz.questions.map((question: any, index: number) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <Card key={question.id} className="p-4 text-left">
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-success mt-1 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">{question.question}</p>
                          <p className="text-sm text-muted-foreground mb-2">
                            Your answer: {question.options[userAnswer]}
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-success mb-2">
                              Correct answer: {question.options[question.correctAnswer]}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="flex gap-4">
                <Button onClick={resetQuiz} variant="outline" className="flex-1">
                  Back to Quizzes
                </Button>
                <Button onClick={() => startQuiz(selectedQuiz)} variant="hero" className="flex-1">
                  Retake Quiz
                </Button>
              </div>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 animate-fade-in">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{selectedQuiz.title}</h2>
                <Button variant="ghost" onClick={resetQuiz}>✕</Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Question {currentQuestion + 1} of {selectedQuiz.questions.length}</span>
                  <span><Clock className="w-3 h-3 inline mr-1" />No time limit</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-medium text-foreground">
                {currentQ.question}
              </h3>

              <div className="space-y-3">
                {currentQ.options.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    className={`w-full p-4 text-left rounded-lg border transition-all ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50 hover:bg-accent/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-primary bg-primary text-white'
                          : 'border-muted-foreground'
                      }`}>
                        {selectedAnswers[currentQuestion] === index && '✓'}
                      </div>
                      {option}
                    </div>
                  </button>
                ))}
              </div>

              <Button
                onClick={nextQuestion}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="w-full"
                variant="hero"
              >
                {currentQuestion < selectedQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-playfair font-bold text-foreground mb-4">
            Knowledge Quizzes
          </h1>
          <p className="text-xl text-muted-foreground">
            Test what you've learned from your completed lessons
          </p>
        </div>

        {/* Quizzes To Do */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-primary" />
            Quizzes To Do
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {incompleteQuizzes.map((quiz, index) => (
              <Card
                key={quiz.id}
                className="card-interactive animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="default" className="bg-primary text-white">
                      To Do
                    </Badge>
                    <div className="text-right">
                      <div className="text-lg font-medium text-foreground">
                        {quiz.questions.length}
                      </div>
                      <div className="text-xs text-muted-foreground">Questions</div>
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {quiz.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on: {quiz.lessonTitle}
                  </p>
                  
                  <Button
                    onClick={() => startQuiz(quiz)}
                    variant="hero"
                    className="w-full"
                    disabled={quiz.questions.length === 0}
                  >
                    {quiz.questions.length === 0 ? 'Coming Soon' : 'Start Quiz'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Completed Quizzes */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-success" />
            Completed Quizzes
          </h2>
          
          {completedQuizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedQuizzes.map((quiz, index) => (
                <Card
                  key={quiz.id}
                  className="card-interactive animate-fade-in border-success/20 bg-success/5"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge variant="default" className="bg-success">
                        Completed
                      </Badge>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-success">{quiz.score}%</div>
                        <div className="text-xs text-muted-foreground">Score</div>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold text-lg text-foreground mb-2">
                      {quiz.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      Based on: {quiz.lessonTitle}
                    </p>
                    
                    <Button
                      onClick={() => startQuiz(quiz)}
                      variant="outline"
                      className="w-full"
                    >
                      Retake Quiz
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No completed quizzes yet. Complete some lessons first!</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;