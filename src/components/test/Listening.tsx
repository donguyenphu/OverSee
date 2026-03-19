import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { isAnswerCorrect, normalizeAnswer } from '@/data/answerKeys';

type ListeningQuestionType = 'text' | 'mcq' | 'dropdown';

interface ListeningQuestion {
  number: number;
  question: string;
  type: ListeningQuestionType;
  options?: string[];
  placeholder?: string;
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
    questions: [
      { number: 1, question: 'Location', type: 'text', placeholder: 'Southwest' },
      { number: 2, question: 'Rooms', type: 'text', placeholder: 'double' },
      { number: 3, question: 'The other room used as', type: 'text', placeholder: 'office' },
      { number: 4, question: 'Downstairs', type: 'text', placeholder: 'lounge' },
      { number: 5, question: 'Which extra service does the customer agree to do?', type: 'mcq', options: ['A. Change the bed linen', 'B. Do some gardening work', 'C. Clean the glass'] },
      { number: 6, question: 'What does the customer want cleaned every three months?', type: 'mcq', options: ['A. Curtains', 'B. Carpets', 'C. Mats'] },
      { number: 7, question: 'What does the customer want done with clothes?', type: 'mcq', options: ['A. Wash and iron the clothes', 'B. Iron the clothes', 'C. Clean and dry the clothes'] },
      { number: 8, question: "The agent's address is 12 ____ Amyes Road.", type: 'text', placeholder: 'Amyes' },
      { number: 9, question: 'Her house will get cleaned next ____.', type: 'text', placeholder: 'Thursday' },
      { number: 10, question: 'The maximum time of cleaning service is ____ hours.', type: 'text', placeholder: '3' }
    ]
  },
  {
    section: 2,
    startQuestion: 11,
    questions: [
      { number: 11, question: 'The main purpose of the service is to', type: 'mcq', options: ['A. educate people', 'B. persuade people to fly', 'C. provide people with comfort'] },
      { number: 12, question: 'The number of people working at Sydney Airport is', type: 'mcq', options: ['A. 200', 'B. 360', 'C. 440'] },
      { number: 13, question: 'Dogs are chosen according to', type: 'mcq', options: ['A. their ability to stay calm', 'B. their friendliness', 'C. their skill at locating narcotics'] },
      { number: 14, question: 'The number of postal items processed last year amounted to', type: 'mcq', options: ['A. 4,400', 'B. 52,000', 'C. 72,000'] },
      { number: 15, question: 'People carrying items that are not allowed', type: 'mcq', options: ['A. will get arrested', 'B. will be refused on board', 'C. will be given a warning'] },
      { number: 16, question: 'Which of the following is NOT allowed to be taken on the flight?', type: 'mcq', options: ['A. Carry-on items', 'B. Plant seeds', 'C. Parcels'] },
      { number: 17, question: 'What is the proper security protocol for a pocket knife found in a carry-on suitcase?', type: 'mcq', options: ['A. It is returned to the passenger after examination', 'B. It is thrown away in a safe receptacle', 'C. It is passed on to higher-level authorities'] },
      { number: 18, question: 'The acceptable material for packing goods in Australia is ____.', type: 'text', placeholder: 'paper' },
      { number: 19, question: 'The belongings most of the time are refused due to problems with the ____.', type: 'text', placeholder: 'labels' },
      { number: 20, question: 'The customs must be given notice of the goods from 2-10 ____ days before it arrives in Australia.', type: 'text', placeholder: 'days' }
    ]
  },
  {
    section: 3,
    startQuestion: 21,
    questions: [
      { number: 21, question: '21', type: 'dropdown', options: ['A', 'B', 'C', 'D', 'E', 'F'] },
      { number: 22, question: '22', type: 'dropdown', options: ['A', 'B', 'C', 'D', 'E', 'F'] },
      { number: 23, question: '23', type: 'dropdown', options: ['A', 'B', 'C', 'D', 'E', 'F'] },
      { number: 24, question: '24', type: 'dropdown', options: ['A', 'B', 'C', 'D', 'E', 'F'] },
      { number: 25, question: '25', type: 'dropdown', options: ['A', 'B', 'C', 'D', 'E', 'F'] },
      { number: 26, question: '26', type: 'dropdown', options: ['A', 'B', 'C', 'D', 'E', 'F'] },
      { number: 27, question: 'If you need to find information on a certain book, you can use ____ check-out cards.', type: 'text', placeholder: 'pink and yellow' },
      { number: 28, question: 'If you want to find information in a specific field, use the ____ subject guides.', type: 'text', placeholder: 'subject' },
      { number: 29, question: 'Computers in some ____ universities cannot be linked to the network.', type: 'text', placeholder: 'universities' },
      { number: 30, question: 'You can find more information in a ____ blue folder on my desk.', type: 'text', placeholder: 'blue folder' }
    ]
  },
  {
    section: 4,
    startQuestion: 31,
    questions: [
      { number: 31, question: 'The student thought there were no crocodiles in Northern Africa because', type: 'mcq', options: ['A. North Africa contains very little wildlife for the crocodile to prey on', 'B. she found no mention in the literature of their existence there', 'C. there is very little water in North Africa'] },
      { number: 32, question: 'Generally, crocodiles live in groups of about', type: 'mcq', options: ['A. 20', 'B. 38', 'C. 46'] },
      { number: 33, question: 'African crocodiles usually live in areas with', type: 'mcq', options: ['A. hot, dry climates', 'B. hot, wet rainforests', 'C. warm, wet climates'] },
      { number: 34, question: 'Crocodiles in dry areas live in caves located', type: 'mcq', options: ['A. underground', 'B. in mountainsides', 'C. underwater'] },
      { number: 35, question: 'What change caused changes in crocodile populations in North Africa?', type: 'mcq', options: ['A. They were driven away by a fierce predator', 'B. Crocodiles evolved from desert creatures to wetland creatures', 'C. North Africa used to be wetland but slowly turned to desert over time'] },
      { number: 36, question: 'Desert crocodiles sometimes live in places with dry periods that last up to ____ months.', type: 'text', placeholder: '8' },
      { number: 37, question: 'A hole dug by a female crocodile in which to lay eggs can have a ____ of up to 60cm.', type: 'text', placeholder: 'depth' },
      { number: 38, question: 'Local people are not ____ of crocodiles.', type: 'text', placeholder: 'afraid of' },
      { number: 39, question: 'Crocodiles ____ out of fear when humans populate their habitat.', type: 'text', placeholder: 'attack' },
      { number: 40, question: 'Researchers want to study more about population size, ____ , and relations to other populations of crocodiles.', type: 'text', placeholder: 'migration patterns' }
    ]
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
          {section.section === 1 && (
            <div className="overflow-x-auto border rounded-lg p-4 bg-slate-50">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-2 py-2 text-left">Example</th>
                    <th className="border px-2 py-2 text-left">Answer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-2 py-2">Name:</td>
                    <td className="border px-2 py-2 font-semibold">Barbara Hill</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-2">Location:</td>
                    <td className="border px-2 py-2">{answers[1] || 'Southwest'}</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-2">Rooms:</td>
                    <td className="border px-2 py-2">{answers[2] || 'double'}</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-2">The other room used as:</td>
                    <td className="border px-2 py-2">{answers[3] || 'office'}</td>
                  </tr>
                  <tr>
                    <td className="border px-2 py-2">Downstairs:</td>
                    <td className="border px-2 py-2">{answers[4] || 'lounge'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {section.section === 3 && (
            <div className="border rounded-lg p-3 bg-slate-50">
              <div className="text-sm font-semibold mb-2">Match A-F</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div>A: Video Resource Centre</div>
                <div>B: Reading Room</div>
                <div>C: Food Service Centre</div>
                <div>D: Periodicals Section</div>
                <div>E: Enquiry Desk</div>
                <div>F: Satellite TV Station</div>
              </div>
            </div>
          )}

          {section.questions.map(q => (
            <div key={q.number} className="space-y-2 border-l-4 border-blue-200 pl-4">
              <Label htmlFor={`q-${q.number}`} className="font-semibold text-base">
                Q. {q.number}. {q.type === 'dropdown' ? '' : q.question}
              </Label>

              {q.type === 'text' && (
                <Input
                  id={`q-${q.number}`}
                  value={answers[q.number] || ''}
                  onChange={(e) => handleAnswerChange(q.number, e.target.value)}
                  placeholder={q.placeholder || 'Type your answer here'}
                  className="text-base h-10"
                />
              )}

              {q.type === 'mcq' && q.options && (
                <div className="grid gap-2">
                  {q.options.map((option, idx) => {
                    const value = option.split('.')[0].trim();
                    return (
                      <label key={idx} className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="radio"
                          name={`q-${q.number}`}
                          value={value}
                          checked={answers[q.number] === value}
                          onChange={(e) => handleAnswerChange(q.number, e.target.value)}
                          className="w-4 h-4"
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>
              )}

              {q.type === 'dropdown' && q.options && (
                <select
                  id={`q-${q.number}`}
                  value={answers[q.number] || ''}
                  onChange={(e) => handleAnswerChange(q.number, e.target.value)}
                  className="w-full rounded-md border bg-background p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Chọn đáp án</option>
                  {q.options.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
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
