import type { Project } from "@/types/project";

export const projects: readonly Project[] = [
  {
    id: "taskflow",
    title: "TaskFlow",
    category: "Full Stack",
    description:
      "Real-time project management tool with drag-and-drop Kanban boards, team collaboration, and automated workflows.",
    fullDescription:
      "TaskFlow is a comprehensive project management platform designed for modern teams. It features real-time Kanban boards with drag-and-drop functionality, enabling seamless task organization. The platform supports team collaboration with live cursors, comments, and notifications. Automated workflows allow teams to define triggers and actions that streamline their processes.",
    features: [
      "Drag-and-drop Kanban boards with real-time sync",
      "Team collaboration with live presence indicators",
      "Automated workflow engine with custom triggers",
      "WebSocket-based live updates across all clients",
      "Role-based access control and team management",
      "Activity timeline and audit logging",
    ],
    techStack: ["Next.js", "Socket.io", "PostgreSQL", "Redis", "TypeScript", "Tailwind CSS"],
    challenges:
      "Implementing conflict-free real-time collaboration required designing a CRDT-based sync engine to handle concurrent edits from multiple users without data loss.",
    githubUrl: "https://github.com/example/taskflow",
    liveUrl: "https://taskflow.example.com",
    imageAlt: "TaskFlow Kanban board interface",
    stats: "WebSocket-based live updates",
  },
  {
    id: "cloudvault",
    title: "CloudVault",
    category: "Backend",
    description:
      "Secure file storage and sharing platform with end-to-end encryption, file versioning, and team workspaces.",
    fullDescription:
      "CloudVault provides enterprise-grade file storage with a focus on security and collaboration. Files are encrypted end-to-end using AES-256, ensuring only authorized users can access content. The versioning system maintains a complete history of changes, and team workspaces enable organized file sharing with granular permissions.",
    features: [
      "End-to-end AES-256 encryption for all files",
      "Complete file versioning with diff viewer",
      "Team workspaces with granular permissions",
      "Chunked upload system for large files",
      "Real-time sync across devices",
      "REST API for third-party integrations",
    ],
    techStack: ["Node.js", "AWS S3", "MongoDB", "Redis", "Express", "TypeScript"],
    challenges:
      "Building a chunked upload system that handles 10K+ concurrent uploads required implementing a custom queue with Redis-backed job management and S3 multipart uploads.",
    githubUrl: "https://github.com/example/cloudvault",
    imageAlt: "CloudVault file management dashboard",
    stats: "Handles 10K+ concurrent uploads",
  },
  {
    id: "pixelcraft",
    title: "PixelCraft",
    category: "Frontend",
    description:
      "Browser-based image editor with layers, filters, and export options. Uses Web Workers for heavy processing.",
    fullDescription:
      "PixelCraft is a powerful image editing application that runs entirely in the browser. It supports multiple layers, blend modes, and a comprehensive set of filters. Heavy image processing tasks are offloaded to Web Workers to keep the UI responsive. Local saves use IndexedDB, allowing users to resume editing sessions without server dependency.",
    features: [
      "Multi-layer canvas editing with blend modes",
      "30+ built-in filters with real-time preview",
      "Web Workers for non-blocking image processing",
      "IndexedDB-based local project saves",
      "Export to PNG, JPEG, WebP, and SVG",
      "Keyboard shortcuts and customizable toolbar",
    ],
    techStack: ["React", "Canvas API", "Web Workers", "IndexedDB", "TypeScript", "Tailwind CSS"],
    challenges:
      "Achieving smooth performance with large images required implementing a tile-based rendering system and offloading filter computations to a pool of Web Workers.",
    githubUrl: "https://github.com/example/pixelcraft",
    liveUrl: "https://pixelcraft.example.com",
    imageAlt: "PixelCraft image editing interface",
    stats: "50K+ users",
  },
  {
    id: "deploypilot",
    title: "DeployPilot",
    category: "DevOps",
    description:
      "One-click deployment platform for containerized apps. Go CLI + React dashboard with Kubernetes integration.",
    fullDescription:
      "DeployPilot simplifies container deployments with a unified CLI and web dashboard. Teams can deploy, rollback, and monitor containerized applications with a single command or click. The platform integrates with GitHub Actions for CI/CD pipelines and uses Terraform for infrastructure provisioning.",
    features: [
      "One-click deployments with automatic rollback",
      "Go CLI for terminal-based workflows",
      "Real-time deployment logs and health monitoring",
      "GitHub Actions integration for CI/CD",
      "Terraform-managed infrastructure provisioning",
      "Multi-environment support (staging, production)",
    ],
    techStack: ["Go", "React", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
    challenges:
      "Designing a reliable rollback mechanism required implementing health checks at each deployment stage and maintaining snapshot states for instant recovery.",
    githubUrl: "https://github.com/example/deploypilot",
    imageAlt: "DeployPilot deployment dashboard",
    stats: "Used by 20+ teams internally",
  },
  {
    id: "datapulse",
    title: "DataPulse",
    category: "Full Stack",
    description:
      "Real-time analytics dashboard with customizable widgets, data streaming, and alerting system.",
    fullDescription:
      "DataPulse is a high-performance analytics platform that processes and visualizes data streams in real time. Users can create custom dashboards with drag-and-drop widgets, set up alerts based on metric thresholds, and export reports. The streaming pipeline handles millions of events daily with minimal latency.",
    features: [
      "Customizable dashboard with drag-and-drop widgets",
      "Real-time data streaming via Apache Kafka",
      "Threshold-based alerting with notification channels",
      "Interactive D3.js visualizations and charts",
      "Historical data queries with TimescaleDB",
      "Scheduled report generation and export",
    ],
    techStack: ["Next.js", "D3.js", "Apache Kafka", "TimescaleDB", "TypeScript", "Tailwind CSS"],
    challenges:
      "Processing 1M+ events/day with sub-second dashboard updates required implementing a windowed aggregation pipeline with Kafka Streams and an efficient caching layer.",
    githubUrl: "https://github.com/example/datapulse",
    liveUrl: "https://datapulse.example.com",
    imageAlt: "DataPulse analytics dashboard",
    stats: "Processes 1M+ events/day",
  },
  {
    id: "opencontrib",
    title: "OpenContrib",
    category: "Frontend",
    description:
      "GitHub contribution visualizer and open-source portfolio generator. Featured on Hacker News.",
    fullDescription:
      "OpenContrib transforms GitHub activity into beautiful, shareable portfolio pages. It pulls contribution data via the GitHub API, generates interactive visualizations using Chart.js, and creates a polished portfolio page that developers can share. The tool highlights open-source impact with metrics like PRs merged, issues closed, and repositories contributed to.",
    features: [
      "GitHub API integration for contribution data",
      "Interactive contribution charts and graphs",
      "Auto-generated portfolio pages with custom themes",
      "Contribution streak tracking and statistics",
      "Shareable portfolio links with OG image generation",
      "Dark mode and multiple theme options",
    ],
    techStack: ["React", "GitHub API", "Chart.js", "Tailwind CSS", "TypeScript", "Vercel"],
    challenges:
      "Handling GitHub API rate limits required implementing a smart caching strategy with stale-while-revalidate patterns and incremental data fetching.",
    githubUrl: "https://github.com/example/opencontrib",
    liveUrl: "https://opencontrib.example.com",
    imageAlt: "OpenContrib portfolio visualization",
    stats: "Featured on Hacker News",
  },
] as const satisfies readonly Project[];
