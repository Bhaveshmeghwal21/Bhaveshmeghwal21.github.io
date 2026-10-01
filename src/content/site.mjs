export const site = {
  name: 'Bhavesh Meghwal',
  role: 'Robotics and software engineer',
  url: 'https://bhaveshmeghwal.me',
  profileImage: '/images/profile.jpeg',
  description:
    'Bhavesh Meghwal builds software for drones and AI agents: flight-log analysis, fleet operations, AI products and open-source developer tools.',
  location: 'Delhi, India',
  education: 'B.Tech, Mechanical Engineering',
  school: 'IIT (BHU) Varanasi, class of 2026',
  email: '21bhavesh04@gmail.com',
  github: 'https://github.com/Bhaveshmeghwal21',
  githubHandle: 'Bhaveshmeghwal21',
  linkedin: 'https://www.linkedin.com/in/bm-bhavesh-meghwal/',
  linkedinHandle: 'bm-bhavesh-meghwal',
  resumeGeneral:
    'https://drive.google.com/file/d/1T2rq8Seq8IW3hFImXbP0tVzEtr30pn0i/view?usp=sharing',
  resumeRobotics:
    'https://drive.google.com/file/d/1DEYtS6IBMPIo-GRl5vmc44XYJhlwiHR-/view?usp=sharing',

  headline: 'I build software for drones and AI agents.',
  heroIntro:
    'Mechanical engineer from IIT (BHU). I build flight-log analysis and fleet tools for drone operators, AI products like ReBloom, and open-source tools that AI agents can drive. My background is in PX4 and fault-tolerant flight control.',
  heroHighlights: [
    'Co-founder, PAWAAC Drones',
    'Shipped Pawaac Analyzer and ReBloom',
    'Top 10 of 23 IITs, Inter IIT Tech Meet 13.0',
  ],
  availability:
    'I am building PAWAAC Drones. Write to me about drone software, tools for AI agents, collaborations or product engineering work.',

  /**
   * GoatCounter site code for privacy-friendly visit counts (no cookies).
   * Empty turns analytics off. For https://CODE.goatcounter.com, put 'CODE'.
   */
  goatcounter: '',

  navItems: [
    { label: 'Projects', href: '/projects' },
    { label: 'Writing', href: '/blog' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ],

  aboutParagraphs: [
    'I studied Mechanical Engineering at IIT (BHU) Varanasi and spend most of my time where hardware meets software. That usually means PX4, simulation and operator workflows, and whatever bridge is missing between a technical system and the person using it.',
    'At Inter IIT Tech Meet 13.0 our team finished in the national top 10 with fault-tolerant control that recovered a quadrotor from motor failure. Since then I have worked on VTOL systems at PAWAAC Drones and gone on to co-found it, shipped AI products like ReBloom, and built open-source tools such as a Linux video editor that AI agents can drive.',
  ],

  skillGroups: [
    {
      title: 'Robotics',
      items: ['PX4-Autopilot', 'ArduPilot', 'ROS 1 and ROS 2', 'MAVROS', 'QGroundControl', 'Gazebo'],
    },
    {
      title: 'Languages',
      items: ['C++', 'Python'],
    },
    {
      title: 'Software',
      items: ['Qt 6 and QML', 'Next.js', 'FastAPI', 'Postgres'],
    },
    {
      title: 'AI coding',
      items: ['Claude Code', 'Kiro CLI', 'Codex CLI'],
    },
    {
      title: 'AI and vision',
      items: ['Azure OpenAI', 'MCP', 'Vision-language models', 'OpenCV', 'MediaPipe'],
    },
    {
      title: 'Simulation',
      items: ['ANSYS Fluent', 'CAD modelling', 'EKF2 tuning'],
    },
  ],

  timeline: [
    {
      title: 'Co-founder',
      org: 'PAWAAC Drones',
      period: '2025 – Present',
      summary:
        'Co-founded the company after my internship. I build its software, including Pawaac Analyzer for flight-log analysis and the fleet operations platform.',
    },
    {
      title: 'UAV Engineering Intern',
      org: 'PAWAAC Drones',
      period: 'May – Jul 2025',
      summary:
        'Delta-wing VTOL surveillance system: vision model integration in QGroundControl and PX4 tuning for transitions and field use.',
    },
    {
      title: 'Secretary',
      org: 'Aero Modelling Club, IIT (BHU)',
      period: 'May 2024 – Jul 2025',
      summary:
        'Led a 20 to 30 member club through drone builds, workshops, simulation sessions and technical events.',
    },
    {
      title: 'Aerial Robotics Team Member',
      org: 'Inter IIT Tech Meet 13.0',
      period: 'Oct – Dec 2024',
      summary:
        'Built fault-tolerant PX4 control for single-motor failure recovery. The team finished in the national top 10 among 23 IITs.',
    },
    {
      title: 'Core Member',
      org: 'Aero Modelling Club, IIT (BHU)',
      period: 'Jun 2024 – May 2025',
      summary:
        'Taught drone basics, OpenCV and simulation tools to first-year students and helped them through their first builds.',
    },
  ],
}
