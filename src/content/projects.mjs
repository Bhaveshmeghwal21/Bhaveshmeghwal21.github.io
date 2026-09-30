export const projectFilters = ['All', 'Software', 'AI Products', 'Robotics']

/**
 * Project shape:
 *   featured   shown on the homepage (the first six, in array order)
 *   images     optional gallery for the case-study page ({ src, alt })
 *   video      optional short silent loop for the case-study page ({ src, poster, alt })
 *   links      live / repo / video / report URLs (null or absent when unavailable) plus a short note
 */
export const projects = [
  {
    title: 'Palmier Pro for Linux',
    slug: 'palmier-pro-linux',
    featured: true,
    category: 'Software',
    timeframe: '2026',
    status: 'Open source · v0.4.0',
    summary:
      'A multi-track video editor for Linux that AI agents can drive. Every edit is an MCP tool, so Claude Code, Codex, Cursor and the built-in agent chat work on the same timeline the user does.',
    overview:
      'An independent C++20, Qt 6 and Vulkan port of Palmier Pro, the macOS AI-native editor. I built it ground-up for Linux in layers: a core domain model with no dependency on Qt, FFmpeg or Vulkan; a GPU compositor with a CPU reference renderer held to the same output; hardware encode through FFmpeg; and an MCP server on localhost that exposes the editor to agents. The Qt UI, the agent chat and external MCP clients all edit through the same undoable commands, and a property test checks that both paths produce identical edits.',
    role:
      'Author and maintainer. I set the architecture and built it with AI coding agents, then held the result to the test suite, CI and release packaging.',
    outcomes: [
      'An agent cut a 39-second showreel over MCP: 150 tool calls across 19 tools, zero failures, exported to 1080p30 H.264 with NVENC on an NVIDIA L4',
      'Over 40 MCP tools covering import, trim, ripple, layout, keyframes, colour grading, captions, undo and export',
      'Vulkan compositing on NVIDIA, AMD and Intel, with a software renderer a parity test holds to the same output',
      'More than 1,900 GoogleTest and RapidCheck cases across 90 test executables, with line coverage gated in CI',
    ],
    stack: ['C++20', 'Qt 6', 'Vulkan', 'FFmpeg', 'MCP', 'CMake', 'GoogleTest'],
    images: [
      {
        src: '/images/projects/palmier-grade.jpg',
        alt: 'Split-screen comparison of aerial footage, ungraded on the left and graded with a primary grade, tone curve and 3D LUT on the right',
      },
      {
        src: '/images/projects/palmier-pip.jpg',
        alt: 'Street footage with a night-time picture-in-picture inset in the top-right corner',
      },
      {
        src: '/images/projects/palmier-grid.jpg',
        alt: 'Four aerial and street angles arranged in a two-by-two grid',
      },
    ],
    links: {
      live: null,
      repo: 'https://github.com/Bhaveshmeghwal21/palmier-pro-linux',
      note: 'Open source under GPLv3. Not affiliated with Palmier, Inc.',
    },
  },
  {
    title: 'Codex Azure',
    slug: 'codex-azure',
    featured: true,
    category: 'Software',
    timeframe: '2026',
    status: 'Public fork',
    summary:
      "A fork of OpenAI's Codex CLI with first-class Azure OpenAI support, in-chat provider management and bounded subagent workers, kept in sync with a fast-moving upstream.",
    overview:
      "Codex CLI is OpenAI's terminal coding agent, written in Rust. Out of the box it signs in with ChatGPT or an OpenAI API key. I forked it so it runs against Azure OpenAI deployments, which is what my own products use, then added the workflow pieces I kept missing. Much of the ongoing work is maintenance: regular merges from upstream into a large Rust workspace, with the conflict resolution and compile fixes that come with them.",
    role:
      'Fork maintainer. I scoped the Azure and workflow changes and built them with AI coding agents, and I keep the fork building on Windows, macOS and Linux as upstream moves.',
    outcomes: [
      'Azure OpenAI sign-in inside the TUI that writes an azure model provider to config.toml',
      '/azure command to add, switch, list and remove Azure deployments without a rebuild',
      '/agent worker commands for bounded subagent delegation: spawn, explore, review, test, implement and auto',
      'CI builds for Windows, Apple Silicon and Ubuntu 20.04, with upstream merges resolved across the workspace',
    ],
    stack: ['Rust', 'Ratatui', 'Tokio', 'Azure OpenAI', 'GitHub Actions'],
    links: {
      live: null,
      repo: 'https://github.com/Bhaveshmeghwal21/codex-azure',
      note: 'Public fork of openai/codex under Apache-2.0.',
    },
  },
  {
    title: 'Quadrotor Fault-Tolerant Control',
    slug: 'quadrotor-fault-tolerant-control',
    featured: true,
    category: 'Robotics',
    timeframe: '2024',
    status: 'Inter IIT Tech Meet 13.0',
    summary:
      'Fault-tolerant control in PX4 that recovers a quadrotor from a single motor failure and lands it with low drift. Helped IIT BHU finish in the top 10 of 23 IITs.',
    overview:
      'This started with a hard competition problem from ideaForge at Inter IIT Tech Meet 13.0: keep a quadrotor stable after a motor failure, then land it without losing the frame. In a team of eight, I worked on the control logic, the simulation flow and the recovery behaviour inside PX4 and Gazebo.',
    role: 'PX4 controls work, simulation, controller integration and recovery testing.',
    outcomes: [
      'Held X drift to 0.15 m during controlled landing tests',
      'Held Y drift to 0.30 m in the recovery window',
      'Helped the IIT BHU team finish in the top 10 among 23 IITs',
    ],
    stack: ['PX4', 'Gazebo', 'C++', 'EKF2', 'INDI'],
    video: {
      src: '/media/quadrotor-fault-tolerant-control.mp4',
      poster: '/media/quadrotor-fault-tolerant-control.jpg',
      alt: 'Gazebo simulation: a quadrotor hovers, a motor failure is injected, and the controller brings it down to a controlled landing',
    },
    links: {
      live: null,
      repo: null,
      video: 'https://drive.google.com/file/d/1C5sUq9e99ZBY5TbEaLuuKwq1JR7DZ8SF/view',
      report: 'https://drive.google.com/file/d/1JI1yw_wChZ5imsGdWuNp-IXY3MMRagCa/view',
      note: 'Competition work. The full video and team report are on Google Drive.',
    },
  },
  {
    title: 'Pawaac Analyzer',
    slug: 'pawaac-analyzer',
    featured: true,
    category: 'AI Products',
    timeframe: '2026',
    status: 'Live beta',
    summary:
      'A flight-log analysis product that explains what happened in a drone sortie, scores the tune, and gives operators a replay with an evidence-backed next step.',
    overview:
      'I built this for pilots who do not want raw graphs without explanation. The product parses logs, extracts deterministic features, runs AI analysis against the actual signal values, and presents the result in a replay-first interface.',
    role: 'Product direction, backend architecture, AI analysis pipeline and frontend.',
    outcomes: [
      'Supports PX4, Betaflight, ArduPilot and MAVLink log formats',
      'Built for PAWAAC Drones, in beta with Army and Police pilots',
      'Turns tune review into a guided workflow instead of a graph hunt',
    ],
    stack: ['FastAPI', 'React', 'Three.js', 'Tailwind', 'Azure OpenAI'],
    links: {
      live: 'https://analyse.bajrangdrone.tech/',
      repo: null,
      note: 'Private repository. Live product.',
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
      'Turns a blog post URL into platform-ready content for X, LinkedIn, newsletters, carousels and video hooks.',
    overview:
      'ReBloom addresses a simple pain point: writers publish once, then lose hours repackaging the same idea for distribution. The product handles scraping, prompt orchestration, usage limits and plan logic in one flow.',
    role: 'Full-stack build, pricing logic, AI orchestration and growth experiments.',
    outcomes: [
      'Shipped a live SaaS with pricing, credits, history and voice profiles',
      'Built regional plan logic and credit-based usage accounting',
      'Kept single-URL repurposing fast instead of batch-only',
    ],
    stack: ['Next.js', 'Supabase', 'Tailwind', 'Azure OpenAI', 'Lemon Squeezy'],
    links: {
      live: 'https://re-bloom.app',
      repo: null,
      note: 'Private repository. Live product.',
    },
  },
  {
    title: 'AeroVLA',
    slug: 'aerovla',
    featured: true,
    category: 'Robotics',
    timeframe: '2024 to present',
    status: 'Research',
    summary:
      'A vision-language mission planner that turns natural-language requests into drone flight paths, planning 6.5x faster than a manual workflow.',
    overview:
      'AeroVLA closes the gap between human intent and drone mission setup. It uses vision-language reasoning and task prompts to generate workable mission paths from plain-text commands.',
    role: 'System design, dataset work, the prompt and planning pipeline, and mission workflow design.',
    outcomes: [
      'Cut planning time by 6.5x against a manual workflow',
      'Improved trajectory efficiency by 22 percent in evaluation runs',
      'Built the UAV-VLPA-nano-30 dataset to support the planner',
    ],
    stack: ['Python', 'Vision-language models', 'ArduPilot Mission Planner', 'K-NN'],
    links: {
      live: null,
      repo: null,
      note: 'Research project. Writeup only.',
    },
  },
  {
    title: 'PAWAAC Drone Fleet Operations Platform',
    slug: 'pawaac-drone-fleet-operations-platform',
    featured: false,
    category: 'Software',
    timeframe: '2026',
    status: 'Public repo',
    summary:
      'A multi-service platform for mission planning, telemetry, alerting and a live operations dashboard for autonomous drone fleets.',
    overview:
      'This system treats drone operations as a product surface, not a pile of backend services. It is organised around a fleet registry, mission planning, telemetry ingestion, alerting and a live dashboard operators can use without switching tools.',
    role: 'Architecture, service boundaries, dashboard direction and operations workflow design.',
    outcomes: [
      'Split the platform into seven deployable services plus shared types',
      'Designed for real-time telemetry, alerts and mission workflows',
      'Made the dashboard a first-class operator surface',
    ],
    stack: ['Next.js', 'NestJS', 'TypeScript', 'Redis', 'PostGIS', 'TimescaleDB'],
    links: {
      live: null,
      repo: 'https://github.com/Pawaac-Drones/Fleet-Operations-Platform',
      note: 'Public repository.',
    },
  },
  {
    title: 'VTOL Surveillance Systems at PAWAAC Drones',
    slug: 'pawaac-internship',
    featured: false,
    category: 'Robotics',
    timeframe: '2025',
    status: 'Internship',
    summary:
      'Delta-wing VTOL surveillance work: vision models inside QGroundControl, PX4 transition tuning and real-time video streaming.',
    overview:
      'This work sat close to both the airframe and the operator console. I handled parts of the flight stack, transition tuning and interface work inside QGroundControl for a surveillance platform.',
    role: 'QGroundControl integration, PX4 tuning, GStreamer pipelines and VTOL transition support.',
    outcomes: [
      'Integrated vision models into QGroundControl',
      'Tuned PX4 parameters for VTOL transitions',
      'Configured DSHOT ESC protocols and real-time video streaming',
    ],
    stack: ['Qt/QML', 'C++', 'GStreamer', 'PX4', 'QGroundControl'],
    links: {
      live: null,
      repo: null,
      note: 'Internship work. Case study only.',
    },
  },
  {
    title: 'SentinelArc',
    slug: 'sentinelarc',
    featured: false,
    category: 'AI Products',
    timeframe: '2026',
    status: 'Public repo',
    summary: 'A SaaS platform for safety scoring and crisis routing in conversational AI systems.',
    overview:
      'SentinelArc covers a safety-critical slice of AI product design: scoring conversations, routing risk, and keeping an immutable audit trail. It is built around triage, review and accountability.',
    role: 'System design, product framing and safety workflow design.',
    outcomes: [
      'Designed turn-level and conversation-level scoring',
      'Added crisis routing and an audit chain to the architecture',
    ],
    stack: ['Next.js', 'TypeScript', 'Prisma', 'BullMQ', 'Redis'],
    links: {
      live: null,
      repo: 'https://github.com/Bhaveshmeghwal21/SentinelArc-',
      note: 'Public repository.',
    },
  },
  {
    title: 'OpenClaw',
    slug: 'openclaw',
    featured: false,
    category: 'Software',
    timeframe: '2026',
    status: 'Public repo',
    summary:
      'Local job-search automation that finds roles, scores them, drafts application documents and guides submission through Telegram.',
    overview:
      'OpenClaw is a workflow tool more than a scraper. It joins scraping, scoring, document generation, applications and follow-up tracking into one loop a single person can run each day.',
    role: 'System design, orchestration, automation flow and the user-control model.',
    outcomes: [
      'Covers major Indian job boards and company career pages',
      'Builds tailored documents and tracks applications in Google Sheets',
    ],
    stack: ['Python', 'Playwright', 'Telegram Bot API', 'Google Sheets'],
    links: {
      live: null,
      repo: 'https://github.com/Bhaveshmeghwal21/jobautomation',
      note: 'Public repository.',
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
      'ANSYS Fluent simulations of UAV propeller thrust and torque, validated against experimental data.',
    overview:
      'I used CFD to understand propeller performance and validated the simulation output against real measurements, focusing on thrust, torque and the operating range that made sense in practice.',
    role: 'Simulation setup, validation and performance analysis.',
    outcomes: [
      'Kept thrust and torque validation error under 7 percent',
      'Mapped an optimal range between 1,000 and 4,000 RPM',
      'Produced performance curves and a technical paper',
    ],
    stack: ['ANSYS Fluent', 'k-ε turbulence model', 'CFD meshing'],
    links: {
      live: null,
      repo: null,
      report: 'https://drive.google.com/file/d/1XX3BcvQf46gvzrLCoK1Mkm1f8OatkfEC/view',
      note: 'The full technical report is on Google Drive.',
    },
  },
  {
    title: 'Human Follower Drone',
    slug: 'human-follower-drone',
    featured: false,
    category: 'Robotics',
    timeframe: '2024',
    status: 'Simulation',
    summary: 'A ROS pipeline that detects a person and has a drone follow them, in simulation.',
    overview:
      'This project covered perception, control and autonomy in one loop. A camera streams frames to a companion computer, computer vision tracks the person, and that signal drives the flight stack so the drone holds a fixed distance from its target.',
    role: 'ROS pipeline, tracking logic and simulation flow.',
    outcomes: [
      'Ran in ArduPilot SITL and Gazebo with MAVROS in the loop',
      'Tracked the target with OpenCV, CvZone and MediaPipe pose landmarks',
      'Kept a fixed follow distance from the person being tracked',
    ],
    stack: ['ROS Noetic', 'ArduPilot SITL', 'Gazebo', 'OpenCV', 'MediaPipe'],
    video: {
      src: '/media/human-follower-drone.mp4',
      poster: '/media/human-follower-drone.jpg',
      alt: 'Webcam feed with pose tracking on the left, and the simulated drone in Gazebo following the tracked person on the right',
    },
    links: {
      live: null,
      repo: null,
      video: 'https://drive.google.com/file/d/1Oh1V27VyK4wmFPlU0hcOi-F_y4q_wBrU/view',
      note: 'The full simulation video is on Google Drive.',
    },
  },
  {
    title: 'Swarm Drone System',
    slug: 'swarm-drone-system',
    featured: false,
    category: 'Robotics',
    timeframe: '2024',
    status: 'Hardware build',
    summary: 'Synchronised flight across three Pixhawk drones with shared telemetry.',
    overview:
      'This project was about coordination rather than single-vehicle control: wiring, synchronisation and the monitoring needed to fly three airframes together.',
    role: 'System integration, telemetry and synchronised flight setup.',
    outcomes: [
      'Flew three drones in synchronised formation',
      'Set up monitoring and pre-flight checks for the swarm workflow',
    ],
    stack: ['Pixhawk', 'Skybrush', 'NodeMCU', 'Wi-Fi telemetry'],
    video: {
      src: '/media/swarm-drone-system.mp4',
      poster: '/media/swarm-drone-system.jpg',
      alt: 'Three drones with navigation lights lift off from a helipad at dusk and climb together into formation',
    },
    links: {
      live: null,
      repo: null,
      video: 'https://drive.google.com/file/d/1nY2mdR0yXj0tvKSEsHsQTvdvVSRl4zHz/view',
      note: 'The full flight video is on Google Drive.',
    },
  },
]
