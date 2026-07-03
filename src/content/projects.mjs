export const projectFilters = ['All', 'Robotics', 'AI Products', 'Product Systems', 'Machine Learning']

export const projects = [
  {
    title: 'Quadrotor Fault-Tolerant Control',
    slug: 'quadrotor-fault-tolerant-control',
    featured: true,
    category: 'Robotics',
    timeframe: '2024',
    status: 'Competition build',
    summary:
      'Implemented a fault-tolerant control setup in PX4 for single motor failure recovery during Inter IIT Tech Meet 13.0, with controlled landing and low drift.',
    overview:
      'This project started with a hard competition problem: keep a quadrotor stable after a motor failure, then land it without losing the frame. I worked on the control logic, simulation flow, and recovery behavior inside PX4 and Gazebo.',
    role:
      'PX4 controls work, simulation, controller integration, and recovery testing',
    outcomes: [
      'Held X drift to 0.15 m during controlled landing tests',
      'Held Y drift to 0.30 m in the recovery window',
      'Helped the IIT BHU team finish in the top 10 among 23 IITs',
    ],
    stack: ['PX4', 'Gazebo', 'C++', 'EKF2', 'INDI controllers'],
    links: {
      live: null,
      repo: null,
      note: 'Case study only',
    },
  },
  {
    title: 'AeroVLA: AI-Powered UAV Mission Planner',
    slug: 'aerovla',
    featured: true,
    category: 'Robotics',
    timeframe: '2024 to present',
    status: 'Research build',
    summary:
      'A vision-language system that turns natural-language mission requests into drone flight paths, with faster planning than manual workflows.',
    overview:
      'I built AeroVLA to close the gap between human intent and drone mission setup. The system uses vision-language reasoning and task prompts to generate workable mission paths from plain text commands.',
    role:
      'System design, dataset work, prompt and planning pipeline, mission workflow design',
    outcomes: [
      'Cut planning time by 6.5x against manual workflow',
      'Improved trajectory efficiency by 22 percent in evaluation runs',
      'Built the UAV-VLPA-nano-30 dataset to support the planning flow',
    ],
    stack: ['Python', 'Vision-language models', 'ArduPilot Mission Planner', 'K-NN'],
    links: {
      live: null,
      repo: null,
      note: 'Project writeup only',
    },
  },
  {
    title: 'UAV Engineering Internship - PAWAAC Drones',
    slug: 'pawaac-internship',
    featured: true,
    category: 'Robotics',
    timeframe: '2025',
    status: 'Internship build',
    summary:
      'Worked on delta-wing VTOL surveillance systems, QGroundControl vision model integration, and PX4 control optimization during my PAWAAC Drones internship.',
    overview:
      'This work sat close to the airframe and the operator console at the same time. I handled parts of the flight stack, transition tuning, and interface-level work inside QGroundControl for a surveillance platform.',
    role:
      'QGroundControl integration, PX4 tuning, GStreamer pipeline work, VTOL transition support',
    outcomes: [
      'Integrated vision models into QGroundControl',
      'Optimized PX4 parameters for VTOL transitions',
      'Configured DSHOT ESC protocols and real-time video streaming',
    ],
    stack: ['Qt/QML', 'C++', 'GStreamer', 'PX4', 'QGroundControl', 'Computer Vision'],
    links: {
      live: null,
      repo: null,
      note: 'Internship work and case study',
    },
  },
  {
    title: 'Pawaac Analyzer',
    slug: 'pawaac-analyzer',
    featured: true,
    category: 'AI Products',
    timeframe: '2026',
    status: 'Private build, live link pending',
    summary:
      'A flight-log analysis product that explains what happened in a drone sortie, scores the tune, and gives operators a replay and evidence-backed next step.',
    overview:
      'I built this for pilots who do not want raw graphs without explanation. The product parses logs, extracts deterministic features, runs AI analysis against the actual signal values, and shows the result in a replay-first interface.',
    role:
      'Product direction, backend architecture, AI analysis pipeline, frontend experience',
    outcomes: [
      'Supports PX4, Betaflight, ArduPilot, and MAVLink log formats',
      'Built for PAWAAC Drones with beta use by Army and Police pilots',
      'Turns tune review into a guided workflow instead of a graph hunt',
    ],
    stack: ['FastAPI', 'React', 'Vite', 'Three.js', 'Tailwind', 'Azure OpenAI'],
    links: {
      live: null,
      repo: null,
      note: 'Private repository. Live deployment link coming soon.',
    },
  },
  {
    title: 'PAWAAC Drone Fleet Operations Platform',
    slug: 'pawaac-drone-fleet-operations-platform',
    featured: true,
    category: 'Product Systems',
    timeframe: '2026',
    status: 'Public repo',
    summary:
      'A multi-service platform for planning missions, tracking telemetry, handling alerts, and running a live ops dashboard for autonomous drone fleets.',
    overview:
      'This system treats drone operations as a product surface, not a pile of backend services. I designed it around fleet registry, mission planning, telemetry ingestion, alerting, and a live dashboard that operators can use without jumping between tools.',
    role:
      'Architecture, service boundaries, dashboard direction, operations workflow design',
    outcomes: [
      'Split the platform into seven deployable services plus shared types',
      'Designed for real-time telemetry, alerts, and mission workflows',
      'Kept the dashboard as a first-class operator surface instead of an afterthought',
    ],
    stack: ['Next.js', 'NestJS', 'TypeScript', 'Redis', 'Postgres', 'PostGIS', 'TimescaleDB'],
    links: {
      live: null,
      repo: 'https://github.com/Bhaveshmeghwal21/PAWAACDroneFleetOperationsPlatform',
      note: 'Public repository',
    },
  },
  {
    title: 'ReBloom',
    slug: 'rebloom',
    featured: true,
    category: 'AI Products',
    timeframe: '2026',
    status: 'Live product',
    summary:
      'ReBloom takes a blog post URL and turns it into platform-ready social content across Twitter, LinkedIn, newsletters, carousels, and video hooks.',
    overview:
      'I built ReBloom around a simple pain point: writers publish once and then lose hours repackaging the same idea for distribution. The product handles scrape, prompt orchestration, usage limits, and plan logic in one flow.',
    role:
      'Full-stack product build, pricing logic, AI orchestration, growth experiments',
    outcomes: [
      'Shipped a live SaaS with pricing, credits, history, and voice-profile features',
      'Built regional plan logic and bloom-based usage accounting',
      'Kept the product fast enough for single-URL repurposing instead of batch-only workflows',
    ],
    stack: ['Next.js', 'Supabase', 'Tailwind', 'Azure OpenAI', 'Lemon Squeezy'],
    links: {
      live: 'https://re-bloom.app',
      repo: null,
      note: 'Private repository, live product',
    },
  },
  {
    title: 'Palmier Pro for Linux',
    slug: 'palmier-pro-linux',
    featured: false,
    category: 'Product Systems',
    timeframe: '2026',
    status: 'Public repo',
    summary:
      'A Linux port of an AI-native multi-track video editor with GPU acceleration and a clean split between the editor and hosted generative services.',
    overview:
      'This project pushed me into a different systems problem: media, GPU pipelines, desktop UI, and product boundaries around open-source and hosted AI. I worked on the Linux product framing, architecture, and implementation direction.',
    role:
      'Product framing, desktop architecture, platform strategy, implementation planning',
    outcomes: [
      'Defined the split between the local editor and account-gated AI services',
      'Targeted Qt 6, FFmpeg, and Vulkan for the Linux stack',
      'Treated desktop UX and performance as part of the architecture from the start',
    ],
    stack: ['C++20', 'Qt 6', 'FFmpeg', 'Vulkan'],
    links: {
      live: null,
      repo: 'https://github.com/Bhaveshmeghwal21/palmier-pro-linux',
      note: 'Public repository',
    },
  },
  {
    title: 'SentinelArc',
    slug: 'sentinelarc',
    featured: false,
    category: 'AI Products',
    timeframe: '2026',
    status: 'Public repo',
    summary:
      'A SaaS platform for safety scoring and crisis routing in conversational AI systems.',
    overview:
      'SentinelArc looks at a safety-critical slice of AI product design: scoring conversations, routing risk, and keeping an immutable audit trail. The product is built around triage, review, and accountability.',
    role: 'System design, product framing, safety workflow design',
    outcomes: [
      'Designed turn-level and arc-level scoring flow',
      'Added crisis routing and audit-chain thinking to the architecture',
    ],
    stack: ['Next.js', 'TypeScript', 'Prisma', 'BullMQ', 'Redis'],
    links: {
      live: null,
      repo: 'https://github.com/Bhaveshmeghwal21/SentinelArc-',
      note: 'Public repository',
    },
  },
  {
    title: 'OpenClaw',
    slug: 'openclaw',
    featured: false,
    category: 'Product Systems',
    timeframe: '2026',
    status: 'Public repo',
    summary:
      'A local job-search automation system that scrapes roles, scores them, drafts application documents, and guides submission through Telegram.',
    overview:
      'OpenClaw is a workflow product more than a scraper. It joins scraping, scoring, document generation, application handling, and follow-up tracking into one loop that a single user can run each day.',
    role:
      'System design, orchestration, automation flow, user-control model',
    outcomes: [
      'Covers major Indian job boards and direct company career pages',
      'Builds tailored documents and tracks applications in Google Sheets',
    ],
    stack: ['Python', 'Playwright', 'Telegram Bot API', 'Google Sheets'],
    links: {
      live: null,
      repo: 'https://github.com/Bhaveshmeghwal21/jobautomation',
      note: 'Public repository',
    },
  },
  {
    title: 'CFD Analysis of UAV Propellers',
    slug: 'cfd-analysis-of-uav-propellers',
    featured: false,
    category: 'Robotics',
    timeframe: '2024',
    status: 'Simulation study',
    summary:
      'Ran ANSYS FLUENT simulations for UAV propeller thrust and torque analysis, then checked the numbers against experimental data.',
    overview:
      'I used CFD to understand propeller performance and validate simulation output against real measurements. The work focused on thrust, torque, and the operating range that made sense in practice.',
    role: 'Simulation setup, validation, and performance analysis',
    outcomes: [
      'Kept thrust and torque validation error under 7 percent',
      'Mapped an optimal RPM range between 1000 and 4000',
      'Produced performance curves and a technical paper',
    ],
    stack: ['ANSYS FLUENT 2022R2', 'K-e turbulence model', 'CFD Meshing'],
    links: {
      live: null,
      repo: null,
      note: 'Technical report and paper work',
    },
  },
  {
    title: 'Human Follower Drone',
    slug: 'human-follower-drone',
    featured: false,
    category: 'Robotics',
    timeframe: '2023',
    status: 'Simulation and CV build',
    summary:
      'A ROS-based drone pipeline for detecting and following a human target in simulation.',
    overview:
      'I built this project to work through perception, control, and autonomy in one loop. The system uses computer vision to detect a human target and route that signal into the flight stack.',
    role: 'ROS pipeline, tracking logic, simulation flow',
    outcomes: [
      'Ran the flow in SITL and Gazebo with MAVROS in the loop',
      'Connected CV output to autonomous follow behavior',
    ],
    stack: ['ROS Noetic', 'ArduPilot SITL', 'Gazebo', 'OpenCV', 'MediaPipe'],
    links: {
      live: null,
      repo: null,
      note: 'Case study only',
    },
  },
  {
    title: 'Swarm Drone System',
    slug: 'swarm-drone-system',
    featured: false,
    category: 'Robotics',
    timeframe: '2024',
    status: 'Hardware build',
    summary:
      'A three-drone synchronized flight setup built around Pixhawk hardware and shared telemetry.',
    overview:
      'This project focused on coordination rather than single-vehicle control. I worked on the system wiring, synchronization, and monitoring needed to get three airframes moving together.',
    role: 'System integration, telemetry flow, synchronized flight setup',
    outcomes: [
      'Ran synchronized flight across three drones',
      'Set up monitoring and pre-flight checks around the swarm workflow',
    ],
    stack: ['Pixhawk', 'Skybrush', 'NodeMCU', 'WiFi telemetry'],
    links: {
      live: null,
      repo: null,
      note: 'Case study only',
    },
  },
  {
    title: 'Speech Emotion Recognition',
    slug: 'speech-emotion-recognition',
    featured: false,
    category: 'Machine Learning',
    timeframe: '2023',
    status: 'ML project',
    summary:
      'Built a speech emotion recognition pipeline over the RAVDESS dataset with MFCC, Chroma, and Mel-Spectrogram features.',
    overview:
      'This project focused on feature extraction and classification rather than drones, but it sharpened my machine-learning workflow. I built the preprocessing pipeline, compared feature sets, and trained the classifier around emotion labels.',
    role: 'Feature extraction, model training, evaluation',
    outcomes: [
      'Reached 72 to 75 percent accuracy across 8 emotions',
      'Worked over 7,356 RAVDESS samples',
      'Built a repeatable extraction and inference pipeline',
    ],
    stack: ['Python', 'Librosa', 'MFCC', 'Chroma', 'Mel-Spectrogram', 'MLP Classifier'],
    links: {
      live: null,
      repo: 'https://github.com/Bhaveshmeghwal21/speech-emotion-recognition',
      note: 'Public repository',
    },
  },
]
