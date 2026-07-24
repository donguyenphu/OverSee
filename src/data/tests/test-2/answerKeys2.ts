// IELTS Mock Test Answer Keys

export interface AnswerKey {
  question: number;
  answers: string[]; // Multiple acceptable answers
}

export interface Section {
  sectionNumber: number;
  questions: AnswerKey[];
}

export interface SkillAnswers {
  sections: Section[];
}

// Helper function to normalize answers for comparison
export const normalizeAnswer = (answer: string): string => {
  return answer.toLowerCase().trim();
};

// Check if answer is correct
export const isAnswerCorrect = (userAnswer: string, acceptedAnswers: string[]): boolean => {
  const normalized = normalizeAnswer(userAnswer);
  return acceptedAnswers.some(accepted => normalizeAnswer(accepted) === normalized);
};

// LISTENING ANSWERS
export const listeningAnswers: SkillAnswers = {
  sections: [
    {
      sectionNumber: 1,
      questions: [
        { question: 1, answers: ['Keiko'] },
        { question: 2, answers: ['JO6337'] },
        { question: 3, answers: ['advanced English studies'] },
        { question: 4, answers: ['5 weeks'] },
        { question: 5, answers: ['about 4 months'] },
        { question: 6, answers: ['F'] },
        { question: 7, answers: ['seafood'] },
        { question: 8, answers: ['tennis'] },
        { question: 9, answers: ['trains'] },
        { question: 10, answers: ['this afternoon'] },
      ]
    },
    {
      sectionNumber: 2,
      questions: [
        { question: 11, answers: ['90 days'] },
        { question: 12, answers: ['30 pounds'] },
        { question: 13, answers: ['confirm your nationality'] },
        { question: 14, answers: ['Page 13'] },
        { question: 15, answers: ['Currency form'] },
        { question: 16, answers: ['Tourist export form'] },
        { question: 17, answers: ['BM276'] },
        { question: 18, answers: ['International student card'] },
        { question: 19, answers: ['12'] },
        { question: 20, answers: ['Australian dollar'] },
      ]
    },
    {
      sectionNumber: 3,
      questions: [
        { question: 21, answers: ['cashier'] },
        { question: 22, answers: ['50 pounds'] },
        { question: 23, answers: ['big department stores'] },
        { question: 24, answers: ['jeans'] },
        { question: 25, answers: ['45 pounds'] },
        { question: 26, answers: ['75 pounds'] },
        { question: 27, answers: ['20 pounds'] },
        { question: 28, answers: ['D', 'E', 'F'] },
        { question: 29, answers: ['E', 'F', 'D'] },
        { question: 30, answers: ['F', 'D', 'E'] },
      ]
    },
    {
      sectionNumber: 4,
      questions: [
        { question: 31, answers: ['B'] },
        { question: 32, answers: ['B'] },
        { question: 33, answers: ['A'] },
        { question: 34, answers: ['C'] },
        { question: 35, answers: ['D'] },
        { question: 36, answers: ['C'] },
        { question: 37, answers: ['D'] },
        { question: 38, answers: ['A'] },
        { question: 39, answers: ['A'] },
        { question: 40, answers: ['A'] },
      ]
    }
  ]
};

// READING ANSWERS
export const readingAnswers: SkillAnswers = {
  sections: [
    {
      sectionNumber: 1,
      questions: [
        { question: 1, answers: ['F'] },
        { question: 2, answers: ['E'] },
        { question: 3, answers: ['C'] },
        { question: 4, answers: ['B'] },
        { question: 5, answers: ['G'] },
        { question: 6, answers: ['D'] },
        { question: 7, answers: ['A'] },
        { question: 8, answers: ['C'] },
        { question: 9, answers: ['A'] },
        { question: 10, answers: ['D'] },
        { question: 11, answers: ['B'] },
        { question: 12, answers: ['B'] },
        { question: 13, answers: ['D'] },
      ]
    },
    {
      sectionNumber: 2,
      questions: [
        { question: 14, answers: ['not given', 'ng'] },
        { question: 15, answers: ['false', 'f'] },
        { question: 16, answers: ['true', 't'] },
        { question: 17, answers: ['not given', 'ng'] },
        { question: 18, answers: ['gauze'] },
        { question: 19, answers: ['nozzle'] },
        { question: 20, answers: ['powder', 'pungent powder'] },
        { question: 21, answers: ['rubber ball'] },
        { question: 22, answers: ['C'] },
        { question: 23, answers: ['A'] },
        { question: 24, answers: ['D'] },
        { question: 25, answers: ['F'] },
        { question: 26, answers: ['B'] },
      ]
    },
    {
      sectionNumber: 3,
      questions: [
        { question: 27, answers: ['iii'] },
        { question: 28, answers: ['vii'] },
        { question: 29, answers: ['i'] },
        { question: 30, answers: ['iv'] },
        { question: 31, answers: ['ix'] },
        { question: 32, answers: ['viii'] },
        { question: 33, answers: ['v'] },
        { question: 34, answers: ['ii'] },
        { question: 35, answers: ['false', 'f'] },
        { question: 36, answers: ['true', 't'] },
        { question: 37, answers: ['not given', 'ng'] },
        { question: 38, answers: ['true', 't'] },
        { question: 39, answers: ['true', 't'] },
        { question: 40, answers: ['B'] },
      ]
    }
  ]
};

// Get answer key for a question
export const getAnswerKey = (skill: 'listening' | 'reading', globalQuestionNumber: number): string[] | null => {
  const answers = skill === 'listening' ? listeningAnswers : readingAnswers;
  
  for (const section of answers.sections) {
    for (const question of section.questions) {
      if (question.question === globalQuestionNumber) {
        return question.answers;
      }
    }
  }
  
  return null;
};

// Get section details
export const getSectionByGlobalQuestion = (skill: 'listening' | 'reading', globalQuestionNumber: number) => {
  const answers = skill === 'listening' ? listeningAnswers : readingAnswers;
  
  for (const section of answers.sections) {
    if (section.questions.some(q => q.question === globalQuestionNumber)) {
      return section.sectionNumber;
    }
  }
  
  return null;
};
