export type NarrativeBeat = {
  id: string;
  title: string;
  summary: string;
};

export type PersonProfile = {
  id: string;
  name: string;
  role: string;
  relationshipType: string;
  region: string;
  timelineRelevance: string;
  position: [number, number, number];
  links: string[];
};

export type IslandHotspot = {
  id: string;
  name: string;
  event: string;
  camera: [number, number, number];
  position: [number, number, number];
};

export const storyScope = {
  narrativeArc: ["Intro", "People Network", "Island Journey", "Legacy Close"],
  visualDirection: "Stylized satire with cinematic lighting and editorial-grade motion.",
  deviceSupport: "Desktop-first with reduced-motion and mobile fallback scenes.",
  performanceBudget: "Keep first load light: lazy-load heavy 3D and avoid blocking copy.",
};

export const timelineBeats: NarrativeBeat[] = [
  {
    id: "intro",
    title: "Act I — Premium Introduction",
    summary: "A polished launch sequence establishes the myth before details arrive.",
  },
  {
    id: "network",
    title: "Act II — Global Relationship Graph",
    summary: "Connections, intermediaries, and influence corridors become visible.",
  },
  {
    id: "island",
    title: "Act III — Island Route",
    summary: "Key locations and moments are traversed as a guided map narrative.",
  },
  {
    id: "legacy",
    title: "Act IV — Archive Fracture",
    summary: "Polish collapses and contradictions surface through visual degradation.",
  },
];

export const peopleProfiles: PersonProfile[] = [
  {
    id: "chairman",
    name: "The Chairman",
    role: "Financier",
    relationshipType: "Strategic Ally",
    region: "North America",
    timelineRelevance: "Early amplification",
    position: [-1.2, 0.3, 0.2],
    links: ["broker", "operator"],
  },
  {
    id: "broker",
    name: "The Broker",
    role: "Connector",
    relationshipType: "Intermediary",
    region: "Europe",
    timelineRelevance: "Mid-cycle routing",
    position: [0.1, 0.8, -0.1],
    links: ["chairman", "host"],
  },
  {
    id: "host",
    name: "The Host",
    role: "Destination Curator",
    relationshipType: "Facilitator",
    region: "Caribbean",
    timelineRelevance: "Island chapter",
    position: [1.1, 0.1, 0.1],
    links: ["broker", "operator"],
  },
  {
    id: "operator",
    name: "The Operator",
    role: "Logistics",
    relationshipType: "Infrastructure",
    region: "Global",
    timelineRelevance: "Continuous coordination",
    position: [0, -0.7, 0.3],
    links: ["chairman", "host"],
  },
];

export const islandHotspots: IslandHotspot[] = [
  {
    id: "arrival-dock",
    name: "Arrival Dock",
    event: "Private transfers and first-contact staging",
    position: [-1.4, 0.12, 0.7],
    camera: [1.6, 1.1, 2.8],
  },
  {
    id: "main-villa",
    name: "Main Villa",
    event: "Primary meetings and high-signal networking dinners",
    position: [0, 0.28, -0.5],
    camera: [0.3, 1.6, 2.5],
  },
  {
    id: "airstrip",
    name: "Airstrip",
    event: "Compressed arrival/departure windows and timeline anomalies",
    position: [1.25, 0.1, 0.8],
    camera: [-1.2, 1.2, 2.6],
  },
];

export const testimonials = [
  "Changed the way I think about islands.",
  "A masterclass in strategic introductions.",
  "He definitely knew everybody. Somehow all at once.",
];

export const legacySignals = [
  "VHS artifacts detected",
  "Signal loss in timeline layer",
  "Narrative rewrite failed",
];
