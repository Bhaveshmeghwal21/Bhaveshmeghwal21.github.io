// Constants for portfolio data

export const personalInfo = {
  name: "Bhavesh Meghwal",
  tagline: "Aerial Roboticist | Machine Learning Engineer | IIT BHU",
  bio: "Mechanical Engineering student at IIT (BHU) specializing in aerial robotics, autonomous systems, and drone technology. Secretary of Aero Modelling Club with expertise in PX4-Autopilot, ROS, and control systems. Achieved Top 10 National Rank at Inter IIT Tech Meet 13.0 in Aerial Robotics.",
  location: "IIT (BHU) Varanasi, Uttar Pradesh, India",
  graduation: "2026",
  email: "21bhavesh04@gmail.com",
  phone: "+91-7851861850",
  github: "https://github.com/Bhaveshmeghwal21",
  linkedin: "https://www.linkedin.com/in/bm-bhavesh-meghwal/",
  resume: "https://drive.google.com/file/d/1T2rq8Seq8IW3hFImXbP0tVzEtr30pn0i/view?usp=sharing",
  resumeRobotics: "https://drive.google.com/file/d/1DEYtS6IBMPIo-GRl5vmc44XYJhlwiHR-/view?usp=sharing",
};

// Rotating roles shown in the hero headline
export const roles = [
  "Aerial Robotics Engineer",
  "PX4 / ArduPilot Developer",
  "Autonomous Systems Builder",
  "Machine Learning Engineer",
  "Computer Vision Tinkerer",
];

// Compact "mission status" chips for the hero
export const heroHighlights = [
  { label: "Inter IIT 13.0", value: "Top 10 / 23 IITs" },
  { label: "Club", value: "Aero Modelling Secretary" },
  { label: "Focus", value: "Fault-Tolerant Control" },
];

export const stats = [
  { label: "Projects Completed", value: "15+" },
  { label: "Technical Skills", value: "20+" },
  { label: "Club Leadership", value: "30+ Members" },
  { label: "National Ranking", value: "Top 10" },
];

export const projects = [
  {
    id: 1,
    title: "Quadrotor Fault-Tolerant Control",
    slug: "quadrotor-ftc",
    category: "Control Systems",
    featured: true,
    description: "Implemented FTC algorithm in PX4 for single motor failure recovery during Inter IIT Tech Meet 13.0, achieving controlled landing with minimal drift.",
    fullDescription: "Developed a sophisticated fault-tolerant control system for quadrotors using PX4-Autopilot firmware. The system can detect and compensate for single motor failures, enabling safe controlled landing or return-to-launch functionality.",
    techStack: ["PX4-Autopilot", "Gazebo", "C++", "EKF2", "INDI Controllers"],
    achievements: [
      "0.15m X-drift controlled landing",
      "0.3m Y-drift compensation",
      "Stable RTL (Return to Launch) implementation",
      "Top 10 rank among 23 IITs at Inter IIT Tech Meet 13.0"
    ],
    links: {
      report: "/documents/FTC_Report.pdf",
      video: "https://youtube.com/watch?v=example",
      github: "https://github.com/Bhaveshmeghwal21/quadrotor-ftc"
    },
    image: "/images/projects/ftc-drone.jpg",
    duration: "Oct 2024 - Dec 2024",
  },
  {
    id: 2,
    title: "AeroVLA: AI-Powered UAV Mission Planner",
    slug: "aerovla",
    category: "Computer Vision",
    featured: true,
    description: "Vision-language system generating drone flight paths from natural language commands with 34.22m accuracy and 6.5x speed improvement over manual planning.",
    fullDescription: "Revolutionary AI system that uses GPT and Vision-Language Models to interpret natural language commands and generate optimal drone mission plans. Trained on custom UAV-VLPA-nano-30 dataset.",
    techStack: ["GPT", "VLM", "ArduPilot Mission Planner", "Python", "K-NN"],
    achievements: [
      "22% trajectory optimization improvement",
      "34.22m average accuracy",
      "6.5x faster than manual mission planning",
      "Custom dataset: 30 satellite images, 63.89km coverage"
    ],
    links: {
      demo: "https://aerovla-demo.example.com",
      github: "https://github.com/Bhaveshmeghwal21/AeroVLA",
      dataset: "https://github.com/Bhaveshmeghwal21/UAV-VLPA-nano-30"
    },
    image: "/images/projects/aerovla.jpg",
    duration: "Jun 2024 - Present",
  },
  {
    id: 3,
    title: "UAV Engineering Internship - PAWAAC Drones",
    slug: "pawaac-internship",
    category: "Hardware",
    featured: true,
    description: "Delta-wing VTOL surveillance system development with QGroundControl vision model integration and PX4 control optimization.",
    fullDescription: "Worked on developing a cutting-edge delta-wing VTOL drone for surveillance applications. Integrated computer vision models into QGroundControl using Qt/QML framework.",
    techStack: ["Qt/QML", "C++", "GStreamer", "PX4", "QGroundControl", "Computer Vision"],
    achievements: [
      "Integrated vision models into QGroundControl interface",
      "Optimized PX4 control parameters for VTOL transitions",
      "Configured DSHOT ESC protocols",
      "Implemented real-time video streaming pipeline"
    ],
    links: {
      report: "/documents/PAWAAC_Internship_Report.pdf",
      video: "https://youtube.com/watch?v=pawaac"
    },
    image: "/images/projects/vtol-drone.jpg",
    duration: "May 2025 - Jul 2025",
    company: "PAWAAC Drones",
  },
  {
    id: 4,
    title: "CFD Analysis of UAV Propellers",
    slug: "cfd-propeller",
    category: "Simulation",
    featured: true,
    description: "ANSYS FLUENT simulation for thrust/torque optimization with <7% error validation and optimal RPM range identification.",
    fullDescription: "Comprehensive computational fluid dynamics analysis of UAV propeller performance using ANSYS FLUENT. Validated simulation results against experimental data.",
    techStack: ["ANSYS FLUENT 2022R2", "K-ε turbulence model", "CFD Meshing"],
    achievements: [
      "<7% error in thrust/torque validation",
      "Optimal RPM range: 1000-4000",
      "Detailed performance curves generated",
      "Published technical paper"
    ],
    links: {
      report: "/documents/CFD_Propeller_Analysis.pdf",
      paper: "/documents/CFD_Technical_Paper.pdf"
    },
    image: "/images/projects/cfd-analysis.jpg",
    duration: "Mar 2024 - May 2024",
  },
  {
    id: 5,
    title: "Swarm Drone System",
    slug: "swarm-drones",
    category: "Hardware",
    featured: false,
    description: "3 autonomous Pixhawk drones with synchronized flight using Skybrush Live for formation control and real-time monitoring.",
    fullDescription: "Developed a swarm of 3 autonomous drones capable of synchronized flight patterns, formation control, and coordinated missions.",
    techStack: ["Pixhawk", "Skybrush Live/Server", "NodeMCU", "WiFi Telemetry"],
    achievements: [
      "Successful 3-drone synchronized flight",
      "Real-time telemetry and monitoring",
      "Automated pre-flight checks",
      "Formation control algorithms"
    ],
    links: {
      demo: "https://youtube.com/watch?v=swarm",
      github: "https://github.com/Bhaveshmeghwal21/swarm-drones"
    },
    image: "/images/projects/swarm-drones.jpg",
    duration: "Jan 2024 - Apr 2024",
  },
  {
    id: 6,
    title: "Human Follower Drone",
    slug: "human-follower",
    category: "Computer Vision",
    featured: false,
    description: "ROS-based autonomous tracking drone with computer vision using MediaPipe for human detection and following.",
    fullDescription: "Autonomous drone system that uses computer vision to detect and follow a human target in real-time. Implemented using ROS and ArduPilot SITL.",
    techStack: ["ROS Noetic", "ArduPilot SITL", "Gazebo", "MAVROS", "OpenCV", "MediaPipe"],
    achievements: [
      "Real-time human detection and tracking",
      "Successful SITL simulation",
      "Jetson Nano integration",
      "Autonomous navigation with obstacle awareness"
    ],
    links: {
      video: "https://youtube.com/watch?v=follower",
      github: "https://github.com/Bhaveshmeghwal21/human-follower-drone"
    },
    image: "/images/projects/human-follower.jpg",
    duration: "Aug 2023 - Nov 2023",
    hardware: ["Jetson Nano", "Pixhawk", "Camera Module"],
  },
  {
    id: 7,
    title: "Speech Emotion Recognition",
    slug: "speech-emotion",
    category: "Machine Learning",
    featured: false,
    description: "ML system classifying emotions from audio signals with 72-75% accuracy across 8 emotions using RAVDESS dataset.",
    fullDescription: "Machine learning system that analyzes audio signals to classify human emotions. Uses advanced feature extraction techniques including MFCC, Chroma, and Mel-Spectrogram.",
    techStack: ["Python", "Librosa", "MFCC", "Chroma", "Mel-Spectrogram", "MLP Classifier"],
    achievements: [
      "72-75% accuracy across 8 emotions",
      "RAVDESS dataset: 7,356 samples",
      "Real-time emotion prediction",
      "Comprehensive feature extraction pipeline"
    ],
    links: {
      github: "https://github.com/Bhaveshmeghwal21/speech-emotion-recognition",
      demo: "https://speech-emotion-demo.example.com"
    },
    image: "/images/projects/speech-emotion.jpg",
    duration: "Feb 2023 - May 2023",
    dataset: "RAVDESS",
  },
];

export const skills = {
  "Flight Control & Autonomy": [
    { name: "PX4-Autopilot", level: 90, description: "Firmware modification, FTC algorithms" },
    { name: "ArduPilot", level: 80, description: "Mission planning, SITL simulation" },
    { name: "ROS1/ROS2", level: 90, description: "MAVROS, custom nodes, sensor integration" },
    { name: "QGroundControl", level: 80, description: "Qt customization, video pipeline" },
  ],
  "Programming & Algorithms": [
    { name: "C++", level: 90, description: "PX4 middleware, competitive programming" },
    { name: "Python", level: 90, description: "OpenCV, Librosa, ML pipelines" },
    { name: "Data Structures & Algorithms", level: 80, description: "Codeforces active" },
    { name: "Qt/QML", level: 70, description: "GCS application development" },
  ],
  "Simulation & Analysis": [
    { name: "Gazebo", level: 90, description: "Custom plugins, motor failure testing" },
    { name: "ANSYS Fluent/CFD", level: 80, description: "Propeller analysis, turbulence modeling" },
    { name: "CAD Modelling", level: 70, description: "Drone frame design" },
  ],
  "Control Systems": [
    { name: "EKF2 Tuning", level: 80, description: "State estimation optimization" },
    { name: "INDI Controllers", level: 70, description: "PX4 implementation" },
    { name: "PID/MPC", level: 70, description: "Flight control" },
  ],
  "Machine Learning & CV": [
    { name: "Computer Vision", level: 80, description: "OpenCV, MediaPipe, object tracking" },
    { name: "ML Models", level: 70, description: "MLP, feature extraction" },
    { name: "Vision-Language Models", level: 70, description: "GPT integration" },
  ],
  "Hardware & Embedded": [
    { name: "Pixhawk Flight Controllers", level: 80, description: "Configuration, firmware" },
    { name: "Jetson Nano", level: 70, description: "Companion computer setup" },
    { name: "ESC/Motor Configuration", level: 70, description: "DSHOT, calibration" },
    { name: "NodeMCU/WiFi Telemetry", level: 70, description: "Wireless communication" },
  ],
};

export const experience = [
  {
    id: 1,
    title: "UAV Engineering Intern",
    company: "PAWAAC Drones",
    location: "Remote",
    period: "May 2025 - Jul 2025",
    description: "VTOL surveillance system development with QGroundControl customization and vision model integration",
    responsibilities: [
      "Integrated computer vision models into QGroundControl using Qt/QML framework",
      "Optimized PX4 control parameters for delta-wing VTOL transitions",
      "Configured DSHOT ESC protocols for improved motor control",
      "Implemented GStreamer video pipeline for real-time surveillance"
    ],
    technologies: ["Qt/QML", "C++", "PX4", "GStreamer", "Computer Vision"],
  },
  {
    id: 2,
    title: "Secretary",
    company: "Aero Modelling Club, IIT BHU",
    location: "IIT (BHU) Varanasi",
    period: "May 2024 - Jul 2025",
    description: "Led 20-30 member team with 70% involvement increase and Khageshwara Aviation collaboration",
    responsibilities: [
      "Led team of 20-30 members in various drone and aeromodelling projects",
      "Increased club involvement by 70% through workshops and events",
      "Collaborated with Khageshwara Aviation for industry exposure",
      "Organized drone workshops and technical training sessions"
    ],
    technologies: ["Leadership", "Project Management", "Technical Training"],
  },
  {
    id: 3,
    title: "Aerial Robotics Team Member",
    company: "Inter IIT Tech Meet 13.0",
    location: "IIT (BHU) Varanasi",
    period: "Oct 2024 - Dec 2024",
    description: "Top 10 national rank among 23 IITs, Ideaforge problem statement",
    responsibilities: [
      "Implemented fault-tolerant control algorithm for single motor failure",
      "Achieved controlled landing with 0.15m X-drift and 0.3m Y-drift",
      "Developed stable RTL (Return to Launch) functionality",
      "Collaborated with team to secure Top 10 rank nationally"
    ],
    technologies: ["PX4", "Gazebo", "C++", "EKF2", "INDI Controllers"],
    achievement: "Top 10 National Rank",
  },
  {
    id: 4,
    title: "Core Member",
    company: "Aeromodelling Club, IIT BHU",
    location: "IIT (BHU) Varanasi",
    period: "Jun 2024 - May 2025",
    description: "Conducted workshops on Drone Basics, OpenCV, and Webots for freshers",
    responsibilities: [
      "Conducted workshops on drone basics for 50+ freshers",
      "Taught OpenCV and computer vision fundamentals",
      "Introduced simulation tools like Webots and Gazebo",
      "Mentored junior members on drone projects"
    ],
    technologies: ["Teaching", "OpenCV", "Webots", "Drone Technology"],
  },
  {
    id: 5,
    title: "Event Executive",
    company: "Technex'24",
    location: "IIT (BHU) Varanasi",
    period: "Mar 2024",
    description: "Organized La'Trajectorie - RC planes & fixed-wing aircraft event",
    responsibilities: [
      "Organized La'Trajectorie event for RC planes and fixed-wing aircraft",
      "Coordinated with participants and judges",
      "Managed event logistics and technical requirements",
      "Ensured smooth execution of competitions"
    ],
    technologies: ["Event Management", "Coordination"],
  },
];

export const achievements = [
  {
    title: "Inter IIT Tech Meet 13.0 - Top 10 National Rank",
    category: "Competition",
    year: "2024",
    description: "Aerial Robotics competition among 23 IITs",
  },
  {
    title: "Aero Modelling Club Secretary",
    category: "Leadership",
    year: "2024-2025",
    description: "Led 20-30 member team with 70% involvement increase",
  },
  {
    title: "DroneTech Event Participant",
    category: "Competition",
    year: "2024",
    description: "Technex'24 - Cleared Round 1",
  },
  {
    title: "Spardha'23 Badminton Coordinator",
    category: "Sports",
    year: "2023",
    description: "Organized badminton events at IIT BHU sports fest",
  },
];

export const categories = [
  "All",
  "Control Systems",
  "Computer Vision",
  "Simulation",
  "Hardware",
  "Machine Learning",
];
