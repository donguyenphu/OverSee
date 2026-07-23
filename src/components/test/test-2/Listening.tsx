import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Pause, SkipBack, SkipForward, Volume2, Highlighter, X } from 'lucide-react';
import { isAnswerCorrect, normalizeAnswer, SkillAnswers } from '@/data/tests/test-1/answerKeys';


type ListeningQuestionType = 'text' | 'mcq' | 'dropdown' | 'multiselect';

export interface ListeningQuestion {
  number: number;
  question: string;
  type: ListeningQuestionType;
  options?: string[];
  placeholder?: string;
}

export interface ListeningSection {
  section: number;
  questions: ListeningQuestion[];
  startQuestion: number;
}

interface ListeningProps {
  userEmail: string;
  onComplete: (results: ListeningResults) => void;
  audioUrl: string;
  audioUrls?: string[];
  answerKey: SkillAnswers;
  questions?: ListeningSection[];
}

export interface ListeningResults {
  scores: number[];
  answers: { [key: number]: string };
  sectionScores: { [key: number]: number };
}

export const listeningQuestions: ListeningSection[] = [
  {
    section: 1,
    startQuestion: 1,
    questions: [
      { number: 1, question: 'First name', type: 'text' },
      { number: 2, question: 'Passport number', type: 'text' },
      { number: 3, question: 'Course enrolled', type: 'text' },
      { number: 4, question: 'Length of the course', type: 'text' },
      { number: 5, question: 'Homestay time', type: 'text' },
      { number: 6, question: 'Which kind of family does the girl prefer?', type: 'multiselect', options: ['A. A big family with many young children', 'B. A family without smoker or drinkers', 'C. A family without any pets', 'D. A family with many animals or pets'] },
      { number: 7, question: "Although the girl is not a vegetarian, she doesn't eat a lot of meat. Her favourite food is", type: 'text' },
      { number: 8, question: 'The girls has given up playing handball. Now, she just play ____ with her friends at weekends.', type: 'text' },
      { number: 9, question: 'The girl does not like the bus because they are always late. She would rather', type: 'text' },
      { number: 10, question: 'The girl can get the information about the homestay family that she wants', type: 'text' }
    ]
  },
  {
    section: 2,
    startQuestion: 11,
    questions: [
      { number: 11, question: 'Normal visas last', type: 'text' },
      { number: 12, question: 'You need to pay', type: 'text' },
      { number: 13, question: 'Some Enzian consulates require you to provide a letter to', type: 'text' },
      { number: 14, question: 'You can get information of major embassies on', type: 'text' },
      { number: 15, question: 'If you carry a lot of money, you need to complete a', type: 'text' },
      { number: 16, question: 'Remember to declare all your items, especially expensive items, on a', type: 'text' },
      { number: 17, question: 'The health certificate you need is the', type: 'text' },
      { number: 18, question: 'To get a youth fare card, you should show your', type: 'text' },
      { number: 19, question: 'Take at least', type: 'text' },
      { number: 20, question: 'Take Yen or', type: 'text' }
    ]
  },
  {
    section: 3,
    startQuestion: 21,
    questions: [
      { number: 21, question: 'The woman being interviewed is now working in the bank. Her occupation is', type: 'text' },
      { number: 22, question: 'The woman usually spends about', type: 'text' },
      { number: 23, question: 'The woman often goes to', type: 'text' },
      { number: 24, question: 'According to the woman,', type: 'text' },
      { number: 25, question: '50% of the people being interviewed spend', type: 'text' },
      { number: 26, question: '15% of the people being interviewed spend', type: 'text' },
      { number: 27, question: '35% of the people being interviewed spend', type: 'text' },
      { number: 28, question: 'Most of the people being interviewed think that ____ is/are most difficult to buy.', type: 'mcq', options: ['A. Books', 'B. Study materials', 'C. Foods', 'D. Trousers', 'E. Shoes', 'F. Sportswear'] },
      { number: 29, question: 'Most of the people being interviewed think that ____ is/are most difficult to buy.', type: 'mcq', options: ['A. Books', 'B. Study materials', 'C. Foods', 'D. Trousers', 'E. Shoes', 'F. Sportswear'] },
      { number: 30, question: 'Most of the people being interviewed think that ____ is/are most difficult to buy.', type: 'mcq', options: ['A. Books', 'B. Study materials', 'C. Foods', 'D. Trousers', 'E. Shoes', 'F. Sportswear'] }
    ]
  },
  {
    section: 4,
    startQuestion: 31,
    questions: [
      { number: 31, question: 'What does the lecturer provide for those interested in extra reading?', type: 'mcq', options: ['A. Personal consultation sessions.', 'B. Extra materials, such as a booklist.', 'C. Mid-term examination.', 'D. Free glasses.'] },
      { number: 32, question: 'In the past, time management meant you needed to', type: 'mcq', options: ['A. reduce your stress.', 'B. plan for every hour of the week.', 'C. own a good watch.', 'D. set goals and try to achieve these goals.'] },
      { number: 33, question: 'Today, wise time management means you need to', type: 'mcq', options: ['A. set goals and work in a systematic way.', 'B. work faster.', 'C. set an overview of your assignment.', 'D. make a list, plan for everything and try to stick to this plan.'] },
      { number: 34, question: 'In this college, students are assigned', type: 'mcq', options: ['A. team projects.', 'B. final term examinations.', 'C. essays.', 'D. time management courses.'] },
      { number: 35, question: 'One sign students feel under pressure is', type: 'mcq', options: ['A. library books go missing.', 'B. students get angry for no reason.', 'C. lower class attendance rates.', 'D. trouble at the library.'] },
      { number: 36, question: 'What suggestion does the lecturer give?', type: 'mcq', options: ['A. Making a very detailed plan of their daily activities.', 'B. Not being so stressed just because there is an assignment.', 'C. A regular one-hour session in their personal timetables.', 'D. Wearing comfortable shoes.'] },
      { number: 37, question: 'There are three kinds of planners. They are', type: 'mcq', options: ['A. one weekly planner, one daily planner and one hour planner.', 'B. one yearly planner, one weekly planner and one daily planner.', 'C. one term planner, one monthly planner and one weekly planner.', 'D. one term planner, one weekly and one daily planner.'] },
      { number: 38, question: 'To set an overview of your time, you should need at least', type: 'mcq', options: ['A. one week.', 'B. half a week.', 'C. one month.', 'D. one term.'] },
      { number: 39, question: 'The daily planner of time is mainly concerned with', type: 'mcq', options: ['A. the detailed planning.', 'B. how to plan all available time.', 'C. TV schedules.', 'D. an overview of everything you need to do for several days.'] },
      { number: 40, question: 'According to the lecturer, wise time management may have the following benefit:', type: 'mcq', options: ['A. having more time to spend on relaxation and other activities.', 'B. improving your performance in the final term assignment.', 'C. helping you write better essays.', 'D. improving your memory.'] }
    ]
  }
];


const Listening: React.FC<ListeningProps> = ({ userEmail, onComplete, audioUrl, audioUrls, answerKey, questions }) => {
  const testQuestions = questions ?? listeningQuestions;
  const [currentSection, setCurrentSection] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showReview, setShowReview] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Highlight states: each question/option element has its own highlight array
  const [questionHighlights, setQuestionHighlights] = useState<{ [elementId: string]: boolean[] }>({});
  const [selectedRange, setSelectedRange] = useState<{ start: number; end: number; text: string; elementId: string } | null>(null);
  const [selectionPos, setSelectionPos] = useState<{ x: number; y: number } | null>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const getListeningAnswers = (questionNumber: number) => {
    const section = answerKey.sections.find(s =>
      s.questions.some(q => q.question === questionNumber)
    );
    if (!section) return [];

    const question = section.questions.find(q => q.question === questionNumber);
    return question?.answers || [];
  };

  const renderReview = (questionNumber: number) => {
    if (!showReview) return null;

    const userAnswer = answers[questionNumber];
    const correctAnswers = getListeningAnswers(questionNumber);
    const isCorrect = userAnswer && isAnswerCorrect(userAnswer, correctAnswers);

    if (!userAnswer) {
      return (
        <div className="mt-2 p-2 bg-red-50 border-l-4 border-red-500 rounded">
          <p className="text-sm font-semibold text-red-700">❌ No answer</p>
          <p className="text-sm text-red-600">✓ Correct: <span className="font-bold text-green-600">{correctAnswers.join(' or ')}</span></p>
        </div>
      );
    }

    if (isCorrect) {
      return (
        <div className="mt-2 p-2 bg-green-50 border-l-4 border-green-500 rounded">
          <p className="text-sm font-semibold text-green-700">✓ Correct!</p>
        </div>
      );
    }

    return (
      <div className="mt-2 p-2 bg-red-50 border-l-4 border-red-500 rounded">
        <p className="text-sm font-semibold text-red-700">❌ Wrong</p>
        <p className="text-sm text-red-600">Your answer: <span className="font-semibold">{userAnswer}</span></p>
        <p className="text-sm text-red-600">✓ Correct: <span className="font-bold text-green-600">{correctAnswers.join(' or ')}</span></p>
      </div>
    );
  };

  // Find parent element with data-element-id attribute
  const findParentElementId = (node: Node | null): string | null => {
    let current: any = node;
    while (current) {
      if (current.nodeType === Node.ELEMENT_NODE) {
        const elementId = current.getAttribute?.('data-element-id');
        if (elementId) return elementId;
      }
      current = current.parentElement || current.parentNode;
    }
    return null;
  };

  // Handle text selection
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.toString().length === 0 || !textRef.current) {
      setSelectedRange(null);
      return;
    }

    // Find which element is being selected
    const elementId = findParentElementId(selection.anchorNode);
    if (!elementId) {
      setSelectedRange(null);
      return;
    }

    // Find container with data-element-id to calculate offset
    let container: any = selection.anchorNode;
    while (container && !container.getAttribute?.('data-element-id')) {
      container = container.parentNode || container.parentElement;
    }
    if (!container) {
      setSelectedRange(null);
      return;
    }

    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(container);
    preCaretRange.setEnd(range.endContainer, range.endOffset);

    const start = preCaretRange.toString().length - selection.toString().length;
    const end = start + selection.toString().length;

    setSelectedRange({
      start,
      end,
      text: selection.toString(),
      elementId
    });
  };

  // Add highlight for selected range
  const addHighlight = () => {
    if (!selectedRange) return;
    const { start, end, elementId } = selectedRange;

    setQuestionHighlights(prev => {
      const highlights = prev[elementId] || new Array(end).fill(false);
      const newHighlights = [...highlights];
      for (let i = Math.min(start, end); i < Math.max(start, end) && i < newHighlights.length; i++) {
        newHighlights[i] = true;
      }
      return { ...prev, [elementId]: newHighlights };
    });

    setSelectedRange(null);
    window.getSelection()?.removeAllRanges();
  };

  // Remove highlight for selected range
  const removeHighlight = () => {
    if (!selectedRange) return;
    const { start, end, elementId } = selectedRange;

    setQuestionHighlights(prev => {
      const highlights = prev[elementId] || new Array(end).fill(false);
      const newHighlights = [...highlights];
      for (let i = Math.min(start, end); i < Math.max(start, end) && i < newHighlights.length; i++) {
        newHighlights[i] = false;
      }
      return { ...prev, [elementId]: newHighlights };
    });

    setSelectedRange(null);
    window.getSelection()?.removeAllRanges();
  };

  // Clear all highlights in current section
  const clearSectionHighlights = () => {
    const newHighlights = { ...questionHighlights };
    const section = testQuestions[currentSection];
    section.questions.forEach(q => {
      delete newHighlights[`q${q.number}`];
      if (q.type === 'mcq' && q.options) {
        delete newHighlights[`q${q.number}_optionA`];
        delete newHighlights[`q${q.number}_optionB`];
        delete newHighlights[`q${q.number}_optionC`];
      }
    });
    setQuestionHighlights(newHighlights);
    setSelectedRange(null);
  };

  // Render text with highlights for a specific element
  const renderTextWithHighlight = (text: string, elementId: string) => {
    const highlights = questionHighlights[elementId] || new Array(text.length).fill(false);

    let content: React.ReactNode[] = [];
    for (let i = 0; i < text.length; i++) {
      if (i === 0 || highlights[i] !== highlights[i - 1]) {
        let j = i;
        while (j < text.length && highlights[j] === highlights[i]) {
          j++;
        }
        const segment = text.substring(i, j);
        if (highlights[i]) {
          content.push(
            <span key={i} className="bg-yellow-300">
              {segment}
            </span>
          );
        } else {
          content.push(segment);
        }
        i = j - 1;
      }
    }
    return content;
  };
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

  const handlePartThreeMultiSelect = (value: string) => {
    const selected = [answers[28], answers[29], answers[30]].filter(Boolean) as string[];
    const nextSelected = selected.includes(value)
      ? selected.filter(item => item !== value)
      : selected.length < 3 ? [...selected, value] : selected;

    setAnswers(prev => ({
      ...prev,
      28: nextSelected[0] || '',
      29: nextSelected[1] || '',
      30: nextSelected[2] || ''
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
    if (currentSection < testQuestions.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleComplete = () => {
    const sectionData = testQuestions[currentSection];
    const results: ListeningResults = {
      scores: [],
      answers,
      sectionScores: {}
    };
    onComplete(results);
  };

  const section = testQuestions[currentSection];

  return (
    <div className="space-y-6 w-full max-w-screen-2xl mx-auto px-4 py-4">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Listening</h1>
          <p className="text-sm md:text-base text-muted-foreground">Section {section.section} of 4 • {section.startQuestion + 9 - section.startQuestion + 1} Questions</p>
        </div>
        <div className="text-right">
          <p className={`text-xl md:text-xl font-bold ${timeLeft < 5 * 60 ? 'text-red-600' : 'text-foreground'}`}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </p>
          <p className="text-xl text-muted-foreground">Time Remaining</p>
        </div>
      </div>

      {/* Audio Player Card */}
      <Card className="border-2">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg md:text-xl">Audio Player</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <audio
            ref={audioRef}
            src={audioUrls?.[currentSection] || audioUrl}
            onEnded={() => setIsPlaying(false)}
          />

          <div className="space-y-4">
            {/* Playback Controls */}
            <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-center">
              <Button
                size="sm"
                onClick={handlePlayPause}
                className={`gap-2 bg-blue-600 hover:bg-blue-700 text-xs md:text-sm px-4 md:px-6 ${isPlaying ? 'hidden' : ''}`}
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

              <span className="text-xs md:text-sm text-muted-foreground">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2 justify-center">
              <Volume2 className="w-4 h-4" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-32 accent-blue-600"
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
          <p className="text-lg text-muted-foreground mt-2">Listen and answer the questions below</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            ref={textRef}
            onMouseUp={(e) => { handleTextSelection(); setSelectionPos({ x: e.clientX, y: e.clientY }); }}
            className="select-text"
          >
            {/* Floating highlight toolbar */}
            {selectedRange && selectionPos && (
              <div style={{ position: 'fixed', left: selectionPos.x + 8, top: selectionPos.y - 40, zIndex: 9999 }} className="flex gap-2 p-2 bg-white border rounded-lg shadow-lg">
                <Button 
                  size="sm"
                  onClick={() => { addHighlight(); setSelectionPos(null); }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-sm"
                >
                  <Highlighter className="w-4 h-4 mr-1" />Highlight
                </Button>
                <Button 
                  size="sm"
                  onClick={() => { removeHighlight(); setSelectionPos(null); }}
                  variant="outline"
                  className="text-sm"
                >
                  <X className="w-4 h-4 mr-1" />Remove
                </Button>
              </div>
            )}

            {/* Clear all button - show when highlights exist in section */}
            {Object.keys(questionHighlights).some(key => {
              const qNum = parseInt(key.replace(/[^\d]/g, ''));
              return section.questions.some(q => q.number === qNum) && questionHighlights[key]?.some(h => h);
            }) && (
              <div className="flex gap-2 p-2 bg-red-50 rounded">
                <Button 
                  size="lg"
                  variant="ghost"
                  onClick={clearSectionHighlights}
                  className="text-lg h-6 font-semibold"
                >
                  Clear all
                </Button>
              </div>
            )}
          {section.section === 1 && (
            <div>
              <div className="text-xl font-bold text-blue-700">QUESTION 1-5</div>
              <p>The housing officer takes some details from the girl.</p>
              <p className="font-semibold text-red-600 text-xl">Complete the following form with <strong>NO MORE THAN THREE WORDS AND/OR A NUMBER</strong> for each answer.</p>
              <p className="font-bold text-xl">PERSONAL DETAILS FOR HOMESTAY APPLICATION</p>
              <div className="overflow-x-auto border rounded-lg p-4 bg-slate-50 mt-2">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border px-2 py-2 text-left">Question: </th>
                      <th className="border px-2 py-2 text-left">Answer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-2 py-2">First name</td>
                      <td className="border px-2 py-2">
                        <div className="flex items-center gap-2">
                          <Input
                            id="q-1"
                            value={answers[1] || ''}
                            onChange={(e) => handleAnswerChange(1, e.target.value)}
                            placeholder="Type your answer here"
                            className="text-base h-9 w-40"
                          /> 
                        </div>
                        {renderReview(1)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-2">Family name</td>
                      <td className="border px-2 py-2">Yuichini</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-2">Gender</td>
                      <td className="border px-2 py-2">Female</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-2">Age</td>
                      <td className="border px-2 py-2">28</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-2">Passport number</td>
                      <td className="border px-2 py-2">
                        <div className="flex items-center gap-2">
                          <span>two</span>
                          <Input
                            id="q-2"
                            value={answers[2] || ''}
                            onChange={(e) => handleAnswerChange(2, e.target.value)}
                            placeholder="Type your answer here"
                            className="text-base h-9 w-40"
                          />
                          <span>bedrooms</span>
                        </div>
                        {renderReview(2)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-2">Nationality</td>
                      <td className="border px-2 py-2">Japanese</td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-2">Course enrolled</td>
                      <td className="border px-2 py-2">
                        <div className="flex items-center gap-2">
                          <span>an</span>
                          <Input
                            id="q-3"
                            value={answers[3] || ''}
                            onChange={(e) => handleAnswerChange(3, e.target.value)}
                            placeholder="Type your answer here"
                            className="text-base h-9 w-40"
                          />
                        </div>
                        {renderReview(3)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-2">Length of the course</td>
                      <td className="border px-2 py-2">
                        <div className="flex items-center gap-2">
                          <Input
                            id="q-4"
                            value={answers[4] || ''}
                            onChange={(e) => handleAnswerChange(4, e.target.value)}
                            placeholder="Type your answer here"
                            className="text-base h-9 w-40"
                          />
                        </div>
                        {renderReview(4)}
                      </td>
                    </tr>
                    <tr>
                      <td className="border px-2 py-2">Homestay time</td>
                      <td className="border px-2 py-2">
                        <div className="flex items-center gap-2">
                          <Input
                            id="q-4"
                            value={answers[4] || ''}
                            onChange={(e) => handleAnswerChange(5, e.target.value)}
                            placeholder="Type your answer here"
                            className="text-base h-9 w-40"
                          />
                        </div>
                        {renderReview(4)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* 6 */}
              <div className="pt-4">
                <div className="text-xl font-bold text-blue-700">QUESTION 6</div>
                <p>Mark <strong>TWO</strong> letters that represent the correct answers</p>
              </div>
              <div className="pt-4">
                <div className="text-xl font-bold text-blue-700">QUESTION 7-10</div>
                <p>Complete the sentences below.</p>
                <p className="font-semibold text-red-600">Write NO MORE THAN THREE WORDS for each answer.</p>
              </div>
              {section.questions.filter((q) => q.number >= 7 && q.number <= 10).map((q) => (
                <div key={q.number} className="space-y-2 border-l-4 border-blue-200 pl-4 mt-3">
                  <Label className="font-semibold text-xl">
                    <div data-element-id={`q${q.number}`}>
                      {renderTextWithHighlight(`QUESTION ${q.number}. ${q.question}`, `q${q.number}`)}
                    </div>
                  </Label>
                  <Input
                    id={`q-${q.number}`}
                    value={answers[q.number] || ''}
                    onChange={(e) => handleAnswerChange(q.number, e.target.value)}
                    placeholder="Type your answer here"
                    className="text-base h-10"
                  />
                  {renderReview(q.number)}
                </div>
              ))}

            </div>
          )}

          {section.section === 2 && (
            <div>
              <div className="text-xl font-bold text-blue-700">QUESTION 11-17</div>
              <p>Choose the correct letter, A, B, or C.</p>
              {section.questions.filter((q) => q.number >= 11 && q.number <= 17).map((q) => (
                <div key={q.number} className="space-y-0 border-l-4 border-blue-200 pl-4">
                  <Label className="font-semibold text-xl">
                    <div data-element-id={`q${q.number}`}>
                      {renderTextWithHighlight(`QUESTION ${q.number}. ${q.question}`, `q${q.number}`)}
                    </div>
                  </Label>
                  <div className="grid gap-2 py-2">
                    {(q.options || []).map((option, idx) => {
                      const value = option.split('.')[0].trim();
                      const optionKey = `q${q.number}_option${String.fromCharCode(65 + idx)}`;
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
                          <span className="text-lg" data-element-id={optionKey}>
                            {renderTextWithHighlight(option, optionKey)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {renderReview(q.number)}
                </div>
              ))}

              <div className="pt-4">
                <div className="text-xl font-bold text-blue-700">QUESTION 18-20</div>
                <p className="text-lg">Complete the sentences below.</p>
                <p className="font-semibold text-red-600 text-xl">Write NO MORE THAN THREE WORDS for each answer.</p>
              </div>
              {section.questions.filter((q) => q.number >= 18 && q.number <= 20).map((q) => (
                <div key={q.number} className="space-y-2 border-l-4 border-blue-200 pl-4">
                  <Label className="font-semibold text-xl">
                    <div data-element-id={`q${q.number}`}>
                      {renderTextWithHighlight(`QUESTION ${q.number}. ${q.question}`, `q${q.number}`)}
                    </div>
                  </Label>
                  <Input
                    id={`q-${q.number}`}
                    value={answers[q.number] || ''}
                    onChange={(e) => handleAnswerChange(q.number, e.target.value)}
                    placeholder="Type your answer here"
                    className="text-base h-10"
                  />
                  {renderReview(q.number)}
                </div>
              ))}
            </div>
          )}

          {section.section === 3 && (
            <div>
              {section.questions[0]?.type === 'text' ? (
                <>
                  <div className="text-xl font-bold text-blue-700">QUESTION 21-24</div>
                  <p className="text-xl">Complete the sentences below.</p>
                  <p className="font-semibold text-red-600 text-xl">Write NO MORE THAN THREE WORDS for each answer.</p>
                  {section.questions.filter((q) => q.number >= 21 && q.number <= 24).map((q) => (
                    <div key={q.number} className="space-y-2 border-l-4 border-blue-200 pl-4 py-2">
                      <Label className="font-semibold text-xl">
                        <div data-element-id={`q${q.number}`}>
                          {renderTextWithHighlight(`QUESTION ${q.number}. ${q.question}`, `q${q.number}`)}
                        </div>
                      </Label>
                      <Input id={`q-${q.number}`} value={answers[q.number] || ''} onChange={(e) => handleAnswerChange(q.number, e.target.value)} placeholder="Type your answer here" className="h-10 py-2" />
                      {renderReview(q.number)}
                    </div>
                  ))}

                  <div className="pt-4">
                    <div className="text-xl font-bold text-blue-700">QUESTION 25-27</div>
                    <p className="text-xl">Fill in the blanks with ONE WORD AND/OR A NUMBER for each answer.</p>
                  </div>
                  <div className="border rounded-lg p-4 bg-slate-50">
                    {section.questions.filter((q) => q.number >= 25 && q.number <= 27).map((q) => (
                      <div key={q.number} className="flex items-center gap-2 border-b last:border-b-0 py-3">
                        <Label className="font-semibold text-lg flex-1">{q.question}</Label>
                        <Input id={`q-${q.number}`} value={answers[q.number] || ''} onChange={(e) => handleAnswerChange(q.number, e.target.value)} className="h-10 w-48" />
                        {renderReview(q.number)}
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <div className="text-xl font-bold text-blue-700">QUESTION 28-30</div>
                    <p className="text-xl">Mark THREE letters that represent the correct answer.</p>
                    <p className="text-lg">Most of the people being interviewed think that these are most difficult to buy.</p>
                  </div>
                  <div className="grid gap-2 border rounded-lg p-4 bg-slate-50">
                    {(section.questions[7]?.options || []).map((option, idx) => {
                      const value = option.split('.')[0].trim();
                      const selected = [answers[28], answers[29], answers[30]].includes(value);
                      return (
                        <label key={idx} className="flex items-center gap-2 cursor-pointer text-lg">
                          <input type="checkbox" checked={selected} onChange={() => handlePartThreeMultiSelect(value)} className="w-4 h-4" />
                          <span data-element-id={`q28_option${String.fromCharCode(65 + idx)}`}>{renderTextWithHighlight(option, `q28_option${String.fromCharCode(65 + idx)}`)}</span>
                        </label>
                      );
                    })}
                  </div>
                  {[28, 29, 30].map(number => renderReview(number))}
                </>
              ) : (
                <>
                  <div className="text-xl font-bold text-blue-700">QUESTION 21-26</div>
                  <p className="text-xl">Write the correct letter, A-F, next to questions 21-26.</p>
                  <div className="flex items-center gap-2">
                    <div className="w-1/2">
                      <img src="/images/listeningup1.jpg" alt="Listening 21-30 reference" className="w-full rounded-lg border my-3" />
                      <div className="border rounded-lg p-3 bg-slate-50 text-sm">
                        <div className="font-semibold text-lg">A: Video Resource Centre</div>
                        <div className="font-semibold text-lg">B: Reading Room</div>
                        <div className="font-semibold text-lg">C: Food Service Centre</div>
                        <div className="font-semibold text-lg">D: Periodicals Section</div>
                        <div className="font-semibold text-lg">E: Enquiry Desk</div>
                        <div className="font-semibold text-lg">F: Satellite TV Station</div>
                      </div>
                    </div>
                    <div className="w-1/2">
                      {section.questions.filter((q) => q.number >= 21 && q.number <= 26).map((q) => (
                        <div key={q.number} className="space-y-0 border-l-4 border-blue-200 pl-4 py-2">
                          <Label className="font-semibold text-lg"><div data-element-id={`q${q.number}`}>{renderTextWithHighlight(`QUESTION ${q.number}.`, `q${q.number}`)}</div></Label>
                          <select id={`q-${q.number}`} value={answers[q.number] || ''} onChange={(e) => handleAnswerChange(q.number, e.target.value)} className="w-full rounded-md border bg-background p-2 m-2 text-lg focus:outline-none focus:ring-2 focus:ring-primary">
                            <option value="">Select</option>
                            {(q.options || []).map((option, idx) => <option key={idx} value={option}>{option}</option>)}
                          </select>
                          {renderReview(q.number)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4"><div className="text-xl font-bold text-blue-700">QUESTION 27-30</div><p className="text-xl">Complete the sentences below.</p><p className="font-semibold text-red-600 text-xl">Write NO MORE THAN THREE WORDS for each answer.</p></div>
                  {section.questions.filter((q) => q.number >= 27 && q.number <= 30).map((q) => (
                    <div key={q.number} className="space-y-0 border-l-4 border-blue-200 pl-4 py-2"><Label className="font-semibold text-xl"><div data-element-id={`q${q.number}`}>{renderTextWithHighlight(`QUESTION ${q.number}. ${q.question}`, `q${q.number}`)}</div></Label><Input id={`q-${q.number}`} value={answers[q.number] || ''} onChange={(e) => handleAnswerChange(q.number, e.target.value)} placeholder="Type your answer here" className="h-10 py-2" />{renderReview(q.number)}</div>
                  ))}
                </>
              )}
            </div>
          )}

          {section.section === 4 && (
            <div>
              <div className="text-xl font-bold text-blue-700">QUESTION 31-35</div>
              <p className="text-xl">Choose the correct letter, A, B, or C.</p>
              {section.questions.filter((q) => q.number >= 31 && q.number <= 35).map((q) => (
                <div key={q.number} className="space-y-2 border-l-4 border-blue-200 pl-4 py-2">
                  <Label className="font-semibold text-xl">
                    <div data-element-id={`q${q.number}`}>
                      {renderTextWithHighlight(`QUESTION ${q.number}. ${q.question}`, `q${q.number}`)}
                    </div>
                  </Label>
                  <div className="grid gap-2">
                    {(q.options || []).map((option, idx) => {
                      const value = option.split('.')[0].trim();
                      const optionKey = `q${q.number}_option${String.fromCharCode(65 + idx)}`;
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
                          <span className='text-lg' data-element-id={optionKey}>
                            {renderTextWithHighlight(option, optionKey)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                  {renderReview(q.number)}
                </div>
              ))}

              <div className="pt-4">
                <div className="text-xl font-bold text-blue-700">QUESTION 36-40</div>
                <p className='text-xl'>Complete the sentences below.</p>
                <p className="font-semibold text-red-600 text-xl">Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.</p>
              </div>
              {section.questions.filter((q) => q.number >= 36 && q.number <= 40).map((q) => (
                <div key={q.number} className="space-y-2 border-l-4 border-blue-200 pl-4 py-2">
                  <Label className="font-semibold text-xl">
                    <div data-element-id={`q${q.number}`}>
                      {renderTextWithHighlight(`QUESTION ${q.number}. ${q.question}`, `q${q.number}`)}
                    </div>
                  </Label>
                  <Input
                    id={`q-${q.number}`}
                    value={answers[q.number] || ''}
                    onChange={(e) => handleAnswerChange(q.number, e.target.value)}
                    placeholder="Type your answer here"
                    className="text-base h-10"
                  />
                  {renderReview(q.number)}
                </div>
              ))}
            </div>
          )}
            </div>
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
          <span className='text-lg'>← Back</span>
        </Button>

        {currentSection < testQuestions.length - 1 ? (
          <Button onClick={handleNextSection} className="flex-1">
            <span className='text-lg'>Next Section →</span>
          </Button>
        ) : (
          <Button onClick={handleComplete} className="flex-1 bg-green-600 hover:bg-green-700">
            <span className='text-lg'>Finish Listening</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Listening;
