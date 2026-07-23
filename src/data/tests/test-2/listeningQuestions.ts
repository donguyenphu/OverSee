import type { ListeningSection } from '@/components/test/Listening';

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
      { number: 6, question: 'Which kind of family does the girl prefer? Select TWO answers.', type: 'mcq', options: ['A. A big family with many young children', 'B. A family without smoker or drinkers', 'C. A family without any pets', 'D. A family with many animals or pets'] },
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
