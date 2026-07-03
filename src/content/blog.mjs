export const posts = [
  {
    title: 'What Flight Logs Hide',
    slug: 'what-flight-logs-hide',
    date: '2026-07-03',
    readTime: '4 min read',
    featured: true,
    excerpt:
      'A pilot can stare at clean graphs and still miss the failure pattern that matters. I wrote this after building a tool that had to explain logs instead of only plotting them.',
    intro:
      'Flight logs tell the truth, but they do not tell it in a way a tired operator can use. I learned that while working on log analysis products. The graph exists. The explanation does not.',
    sections: [
      {
        heading: 'Graphs do not finish the job',
        paragraphs: [
          'A graph can show oscillation, battery sag, or a motor mismatch. It does not tell you which problem deserves attention first.',
          'That gap matters when someone has one battery left, a field test in an hour, and no time to read six charts in parallel.',
        ],
      },
      {
        heading: 'I care about the next action',
        paragraphs: [
          'I want a system to tell the operator what changed, why it changed, and what to test next.',
          'That is the difference between a debug surface and a usable product.',
        ],
      },
    ],
  },
  {
    title: 'Building Products from Robotics Habits',
    slug: 'building-products-from-robotics-habits',
    date: '2026-07-03',
    readTime: '3 min read',
    featured: true,
    excerpt:
      'Robotics taught me to respect constraints. That habit changed how I build software products too.',
    intro:
      'Robotics gives you no room for fake confidence. A control loop breaks, a sensor drifts, a mission fails. That pressure changed how I think about product work.',
    sections: [
      {
        heading: 'You learn to respect the full loop',
        paragraphs: [
          'A drone does not care that one subsystem looks elegant. The whole loop has to hold.',
          'I build software products the same way now. A feature is not done when the screen looks clean. It is done when the user can move through the whole job without friction.',
        ],
      },
      {
        heading: 'Interfaces matter more than clever parts',
        paragraphs: [
          'Good robotics work depends on clear interfaces between estimation, control, sensors, and mission logic.',
          'Good product systems depend on the same discipline. Clean boundaries save you when the product grows.',
        ],
      },
    ],
  },
  {
    title: 'Why I Care About Operator Workflows',
    slug: 'why-i-care-about-operator-workflows',
    date: '2026-07-03',
    readTime: '3 min read',
    featured: false,
    excerpt:
      'I like hard engineering, but I pay close attention to the person using the system. If the workflow breaks, the system breaks.',
    intro:
      'A product can be technically correct and still be painful to use. I care about the operator view because I have seen smart systems fail at the handoff point.',
    sections: [
      {
        heading: 'The handoff is part of the build',
        paragraphs: [
          'When an operator has to translate a tool in their head before they can use it, the product is unfinished.',
          'That is why I think about dashboards, forms, playback tools, and alerts with the same seriousness as the backend.',
        ],
      },
      {
        heading: 'A clear path beats a crowded interface',
        paragraphs: [
          'A user usually needs one next move, not ten options.',
          'I build interfaces that expose the right detail at the right time instead of throwing the whole system on the screen at once.',
        ],
      },
    ],
  },
]
