import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { isAnswerCorrect, normalizeAnswer } from '@/data/answerKeys';

interface ListeningQuestion {
  number: number;
  question: string;
}

interface ListeningSection {
  section: number;
  questions: ListeningQuestion[];
  startQuestion: number;
}

interface ListeningProps {
  userEmail: string;
  onComplete: (results: ListeningResults) => void;
  audioUrl: string;
}

export interface ListeningResults {
  scores: number[];
  answers: { [key: number]: string };
  sectionScores: { [key: number]: number };
}

const listeningQuestions: ListeningSection[] = [
  {
    section: 1,
    startQuestion: 1,
    questions: Array.from({ length: 10 }, (_, i) => ({
      number: i + 1,
      question: `Question ${i + 1}`
    }))
  },
  {
    section: 2,
    startQuestion: 11,
    questions: Array.from({ length: 10 }, (_, i) => ({
      number: i + 11,
      question: `Question ${i + 11}`
    }))
  },
  {
    section: 3,
    startQuestion: 21,
    questions: Array.from({ length: 10 }, (_, i) => ({
      number: i + 21,
      question: `Question ${i + 21}`
    }))
  },
  {
    section: 4,
    startQuestion: 31,
    questions: Array.from({ length: 10 }, (_, i) => ({
      number: i + 31,
      question: `Question ${i + 31}`
    }))
  }
];

const Listening: React.FC<ListeningProps> = ({ userEmail, onComplete, audioUrl }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          handleComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Audio update effect
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, []);

  const handleAnswerChange = (questionNumber: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionNumber]: value
    }));
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime + seconds);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseInt(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol / 100;
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextSection = () => {
    if (currentSection < listeningQuestions.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleComplete = () => {
    const sectionData = listeningQuestions[currentSection];
    const results: ListeningResults = {
      scores: [],
      answers,
      sectionScores: {}
    };
    onComplete(results);
  };

  const section = listeningQuestions[currentSection];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Listening</h1>
          <p className="text-sm md:text-base text-muted-foreground">Section {section.section} of 4 • {section.startQuestion + 9 - section.startQuestion + 1} Questions</p>
        </div>
        <div className="text-right">
          <p className={`text-lg md:text-xl font-bold ${timeLeft < 5 * 60 ? 'text-red-600' : 'text-foreground'}`}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </p>
          <p className="text-xs text-muted-foreground">Time Remaining</p>
        </div>
      </div>

      {/* Audio Player Card */}
      <Card className="border-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-base md:text-lg">Audio Player</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
          />

          <div className="space-y-4">
            {/* Playback Controls */}
            <div className="flex items-center gap-2 md:gap-4 flex-wrap">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSeek(-5)}
                className="gap-1 text-xs md:text-sm"
              >
                <SkipBack className="w-4 h-4" />
                -5s
              </Button>

              <Button
                size="sm"
                onClick={handlePlayPause}
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-xs md:text-sm px-4 md:px-6"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span className="hidden md:inline">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span className="hidden md:inline">Play</span>
                  </>
                )}
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSeek(5)}
                className="gap-1 text-xs md:text-sm"
              >
                +5s
                <SkipForward className="w-4 h-4" />
              </Button>

              <div className="flex-1 min-w-[150px]">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={(e) => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = parseFloat(e.target.value);
                    }
                  }}
                  className="w-full accent-blue-600"
                />
              </div>

              <span className="text-xs md:text-sm text-muted-foreground w-20 text-right">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 accent-blue-600"
              />
              <span className="text-sm w-10 text-right">{volume}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions Card */}
      <Card>
        <CardHeader>
          <CardTitle>Questions {section.startQuestion}-{section.startQuestion + 9}</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">Listen and answer the questions below</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {section.questions.map(q => (
            <div key={q.number} className="space-y-2 border-l-4 border-blue-200 pl-4">
              <Label htmlFor={`q-${q.number}`} className="font-semibold text-base">
                Q. {section.startQuestion + q.number - 1}
              </Label>
              <Input
                id={`q-${q.number}`}
                value={answers[q.number] || ''}
                onChange={(e) => handleAnswerChange(q.number, e.target.value)}
                placeholder="Type your answer here"
                className="text-base h-10"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between gap-4 sticky bottom-0 bg-background p-4 border-t">
        <Button
          onClick={handlePreviousSection}
          disabled={currentSection === 0}
          variant="outline"
          className="flex-1"
        >
          ← Back
        </Button>

        {currentSection < listeningQuestions.length - 1 ? (
          <Button onClick={handleNextSection} className="flex-1">
            Next Section →
          </Button>
        ) : (
          <Button onClick={handleComplete} className="flex-1 bg-green-600 hover:bg-green-700">
            Finish Listening
          </Button>
        )}
      </div>
    </div>
  );
};

export default Listening;
