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
        { question: 1, answers: ['southwest'] },
        { question: 2, answers: ['double', 'doubles'] },
        { question: 3, answers: ['office'] },
        { question: 4, answers: ['lounge'] },
        { question: 5, answers: ['A'] },
        { question: 6, answers: ['B'] },
        { question: 7, answers: ['B'] },
        { question: 8, answers: ['amyes'] },
        { question: 9, answers: ['thursday'] },
        { question: 10, answers: ['three', '3'] },
      ]
    },
    {
      sectionNumber: 2,
      questions: [
        { question: 11, answers: ['A'] },
        { question: 12, answers: ['C'] },
        { question: 13, answers: ['A'] },
        { question: 14, answers: ['B'] },
        { question: 15, answers: ['C'] },
        { question: 16, answers: ['B'] },
        { question: 17, answers: ['B'] },
        { question: 18, answers: ['paper'] },
        { question: 19, answers: ['package labels', 'labels'] },
        { question: 20, answers: ['2 to 10', '2-10', 'two to ten'] },
      ]
    },
    {
      sectionNumber: 3,
      questions: [
        { question: 21, answers: ['B'] },
        { question: 22, answers: ['D'] },
        { question: 23, answers: ['C'] },
        { question: 24, answers: ['A'] },
        { question: 25, answers: ['F'] },
        { question: 26, answers: ['E'] },
        { question: 27, answers: ['pink and yellow'] },
        { question: 28, answers: ['subject'] },
        { question: 29, answers: ['universities'] },
        { question: 30, answers: ['blue folder', 'labelled blue folder'] },
      ]
    },
    {
      sectionNumber: 4,
      questions: [
        { question: 31, answers: ['B'] },
        { question: 32, answers: ['A'] },
        { question: 33, answers: ['C'] },
        { question: 34, answers: ['A'] },
        { question: 35, answers: ['C'] },
        { question: 36, answers: ['8', 'eight'] },
        { question: 37, answers: ['depth'] },
        { question: 38, answers: ['afraid of'] },
        { question: 39, answers: ['attack'] },
        { question: 40, answers: ['migration patterns'] },
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
