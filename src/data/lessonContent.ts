
export interface LessonContent {
  week: number;
  day: number;
  title: string;
  description: string;
  duration: string;
  objectives: string[];
  content: {
    introduction: string;
    mainContent: string[];
    exercise?: {
      title: string;
      instructions: string[];
      questions: string[];
    };
    reflection?: {
      title: string;
      questions: string[];
    };
  };
  keyTakeaways: string[];
}

export const lessonContentData: LessonContent[] = [
  // Week 1
  {
    week: 1,
    day: 1,
    title: "Welcome & Intention Setting",
    description: "Set your intentions and create a sacred space for discovery",
    duration: "20-30 minutes",
    objectives: [
      "Understand the purpose discovery journey ahead",
      "Set clear intentions for your 30-day program",
      "Create a dedicated space for reflection"
    ],
    content: {
      introduction: "Welcome to your 30-day purpose discovery journey! Today marks the beginning of a transformative experience that will help you uncover what truly matters to you and align your life with your deepest values and aspirations.",
      mainContent: [
        "Purpose isn't something you find lying around waiting to be discovered—it's something you create through deep self-awareness, intentional choices, and authentic action. Over the next 30 days, you'll engage in powerful exercises designed to help you understand yourself at a deeper level.",
        "The journey of purpose discovery requires commitment, honesty, and openness to change. You may discover things about yourself that surprise you, challenge your current beliefs, or inspire you to make significant life changes.",
        "Creating a sacred space for this work is essential. This could be a physical space in your home, a special notebook, or simply a dedicated time each day when you can reflect without distractions."
      ],
      exercise: {
        title: "Intention Setting Ceremony",
        instructions: [
          "Find a quiet space where you won't be interrupted",
          "Light a candle or create another ritual to mark this beginning",
          "Write down your hopes and expectations for this journey",
          "Consider what you want to leave behind and what you want to cultivate"
        ],
        questions: [
          "What draws you to explore your purpose at this time in your life?",
          "What hopes do you have for what you might discover?",
          "What fears or concerns do you have about this process?",
          "How will you create space for this work in your daily life?"
        ]
      }
    },
    keyTakeaways: [
      "Purpose is created, not found",
      "The journey requires commitment and openness",
      "Creating sacred space supports deeper reflection",
      "Setting clear intentions guides the process"
    ]
  },
  {
    week: 1,
    day: 2,
    title: "Values Exploration",
    description: "Identify your core values and what truly matters to you",
    duration: "25-35 minutes",
    objectives: [
      "Identify your top 5-7 core values",
      "Understand how values guide decision-making",
      "Recognize when you're living in alignment with your values"
    ],
    content: {
      introduction: "Values are the fundamental beliefs and principles that guide your decisions and behaviors. They represent what you consider most important in life and serve as your internal compass for navigating choices both big and small.",
      mainContent: [
        "Your values are formed through your experiences, upbringing, culture, and personal reflection. They evolve throughout your life but tend to have core elements that remain consistent.",
        "When you live in alignment with your values, you experience a sense of authenticity, energy, and fulfillment. When you act against your values, you may feel stressed, conflicted, or drained.",
        "Understanding your values is crucial for purpose discovery because your purpose often emerges at the intersection of your values, strengths, and the impact you want to make in the world."
      ],
      exercise: {
        title: "Core Values Assessment",
        instructions: [
          "Review the list of common values below",
          "Choose 10-15 values that resonate strongly with you",
          "Narrow your list to your top 7 values",
          "Rank these 7 values in order of importance",
          "For each top value, write a brief description of what it means to you"
        ],
        questions: [
          "Which values feel most essential to who you are?",
          "How do these values show up in your daily life?",
          "When have you felt most aligned with your values?",
          "What happens when you act against your core values?"
        ]
      },
      reflection: {
        title: "Values in Action",
        questions: [
          "Looking at your top 5 values, how well is your current life reflecting these values?",
          "What areas of your life feel most aligned with your values?",
          "Where do you notice the biggest gaps between your values and your actions?",
          "What small step could you take today to better honor one of your core values?"
        ]
      }
    },
    keyTakeaways: [
      "Values are your internal compass for decision-making",
      "Alignment with values creates energy and authenticity",
      "Values evolve but maintain core consistency",
      "Purpose often emerges at the intersection of values and action"
    ]
  },
  {
    week: 1,
    day: 3,
    title: "Strengths Assessment",
    description: "Discover your natural talents and abilities",
    duration: "30-40 minutes",
    objectives: [
      "Identify your natural strengths and talents",
      "Understand how strengths can be developed into expertise",
      "Recognize patterns in what energizes you"
    ],
    content: {
      introduction: "Your strengths are the activities, skills, and ways of thinking that come naturally to you and energize you when you use them. Unlike skills that can be learned, strengths are innate patterns of thought, feeling, and behavior that can be developed into powerful capabilities.",
      mainContent: [
        "Strengths-based living involves focusing more energy on developing your natural talents rather than trying to fix your weaknesses. This doesn't mean ignoring areas for improvement, but rather leading with what you do best.",
        "When you use your strengths regularly, you experience flow states, increased energy, and better performance. You also tend to learn faster and achieve better results in these areas.",
        "Your purpose often involves using your unique combination of strengths to serve others and create positive impact in the world."
      ],
      exercise: {
        title: "Strengths Discovery Exercise",
        instructions: [
          "Think about activities that energize rather than drain you",
          "Consider feedback you've received about what you do well",
          "Reflect on tasks that feel easy to you but may be difficult for others",
          "Notice patterns in your successes and achievements"
        ],
        questions: [
          "What activities make you lose track of time because you enjoy them so much?",
          "What do people frequently ask for your help with?",
          "What aspects of your work or life feel effortless to you?",
          "When have you felt most confident and capable?"
        ]
      }
    },
    keyTakeaways: [
      "Strengths are natural patterns that can be developed",
      "Using strengths creates energy and flow",
      "Purpose often involves applying strengths in service of others",
      "Focus on developing strengths rather than fixing weaknesses"
    ]
  },
  // Additional lessons would continue here...
  {
    week: 1,
    day: 4,
    title: "Life Story Review",
    description: "Reflect on key moments that shaped who you are",
    duration: "35-45 minutes",
    objectives: [
      "Identify pivotal moments in your life journey",
      "Recognize patterns and themes in your story",
      "Understand how your experiences have shaped your values and strengths"
    ],
    content: {
      introduction: "Your life story contains valuable clues about your purpose. The experiences that have shaped you, the challenges you've overcome, and the moments of joy and fulfillment all contribute to understanding who you are and what you're called to do.",
      mainContent: [
        "Looking at your life as a story helps you see patterns and themes that might not be obvious when examining individual events. Often, our greatest struggles become our greatest strengths and sources of wisdom.",
        "The hero's journey is a common narrative pattern where the protagonist faces challenges, learns important lessons, and returns transformed with gifts to share with the world. Your life likely follows similar patterns of growth and transformation."
      ],
      exercise: {
        title: "Life Timeline and Story Analysis",
        instructions: [
          "Create a timeline of significant life events",
          "Mark both positive and challenging experiences",
          "Look for patterns, themes, and turning points",
          "Consider how each experience contributed to who you are today"
        ],
        questions: [
          "What are the most significant experiences that have shaped who you are?",
          "What patterns do you notice in your life story?",
          "How have your challenges contributed to your growth?",
          "What themes or threads run throughout your story?"
        ]
      }
    },
    keyTakeaways: [
      "Your life story contains clues about your purpose",
      "Challenges often become sources of strength and wisdom",
      "Patterns in your story reveal important themes",
      "Your experiences prepare you to help others"
    ]
  },
  // Continue with remaining days...
  {
    week: 2,
    day: 8,
    title: "Passion Inventory",
    description: "Map out activities and subjects that excite you",
    duration: "25-35 minutes",
    objectives: [
      "Identify activities that genuinely excite you",
      "Distinguish between authentic passions and external expectations",
      "Explore how passions might connect to purpose"
    ],
    content: {
      introduction: "Passion is the fuel that drives purposeful action. When you're passionate about something, you naturally invest more energy, time, and attention in it. Understanding your authentic passions is crucial for discovering work and activities that feel meaningful and energizing.",
      mainContent: [
        "True passion is characterized by intrinsic motivation—you engage in the activity because it brings you joy, not because you feel you should or because others expect it of you.",
        "Passions often evolve and can be developed over time. What matters is staying curious and open to what genuinely interests you right now."
      ],
      exercise: {
        title: "Passion Mapping",
        instructions: [
          "List activities, subjects, or causes that genuinely excite you",
          "Rate each item on a scale of 1-10 for authentic interest",
          "Consider both current passions and childhood interests",
          "Explore what specifically draws you to each passion"
        ],
        questions: [
          "What topics could you talk about for hours?",
          "What activities make you feel most alive and engaged?",
          "What did you love doing as a child that you've forgotten about?",
          "What causes or issues do you care deeply about?"
        ]
      }
    },
    keyTakeaways: [
      "Authentic passion comes from intrinsic motivation",
      "Passions provide energy for purposeful action",
      "Childhood interests often reveal authentic passions",
      "Passions can evolve and be developed over time"
    ]
  }
];

// Helper function to get lesson content
export const getLessonContent = (week: number, day: number): LessonContent | undefined => {
  return lessonContentData.find(lesson => lesson.week === week && lesson.day === day);
};

// Helper function to check if lesson content exists
export const hasLessonContent = (week: number, day: number): boolean => {
  return lessonContentData.some(lesson => lesson.week === week && lesson.day === day);
};
