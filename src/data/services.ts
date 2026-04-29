export interface Service {
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  image: string;
}

export const services: Service[] = [
  {
    slug: 'general-maintenance',
    title: 'General Maintenance',
    shortDesc: 'Reactive and planned maintenance for residential and commercial properties.',
    fullDesc: 'We provide comprehensive property maintenance solutions, covering everything from minor repairs to large-scale planned maintenance projects.',
    features: ['Reactive Repairs', 'Planned Maintenance', 'Property Inspections', 'Safety Audits', 'Building Repairs', 'Facilities Management'],
    image: '/images/services/general-maintenance.png'
  },
  {
    slug: 'electrical-testing',
    title: 'Electrical Testing',
    shortDesc: 'NICEIC approved periodic inspection and testing (EICR certificates).',
    fullDesc: 'Ensure your property is safe and compliant with our expert electrical testing services. We provide full EICR certification for landlords and homeowners.',
    features: ['EICR Certification', 'Fixed Wire Testing', 'PAT Testing', 'Safety Inspections', 'Emergency Lighting Tests', 'Remedial Works'],
    image: '/images/services/electrical-testing.png'
  },
  {
    slug: 'electrical-maintenance',
    title: 'Electrical Maintenance',
    shortDesc: 'Full electrical maintenance, fault finding, and installation works.',
    fullDesc: 'Our NICEIC approved electricians handle all aspects of electrical maintenance and installation, ensuring your systems are reliable and safe.',
    features: ['Fault Finding', 'Rewiring Works', 'Lighting Upgrades', 'Fuse Board Changes', 'Socket Installations', 'Emergency Repairs'],
    image: '/images/services/electrical-maintenance.png'
  },
  {
    slug: 'carpentry',
    title: 'Carpentry & Joinery',
    shortDesc: 'Doors, frames, skirting, fitted furniture, and bespoke joinery.',
    fullDesc: 'Expert carpentry services for all your internal and external woodwork needs, from door hanging to bespoke cabinetry.',
    features: ['Door Fitting', 'Skirting & Architrave', 'Kitchen Fitting', 'Bespoke Joinery', 'Flooring Installation', 'Structural Carpentry'],
    image: '/images/services/carpentry.png'
  },
  {
    slug: 'roofing',
    title: 'Roofing Works',
    shortDesc: 'Flat and pitched roofing, repairs, felt work, and emergency call-outs.',
    fullDesc: 'Professional roofing solutions for all types of properties. We handle leak repairs, new installations, and routine maintenance.',
    features: ['Flat Roofing (EPDM/GRP)', 'Tiled & Slated Roofs', 'Guttering & Fascias', 'Leadwork Repairs', 'Chimney Repointing', 'Roof Inspections'],
    image: '/images/services/roofing.png'
  },
  {
    slug: 'site-inspections',
    title: 'Site Inspections',
    shortDesc: 'Professional property condition reports and site audits.',
    fullDesc: 'Get a clear picture of your property\'s condition with our detailed site inspections and professional reporting services.',
    features: ['Condition Reports', 'Compliance Audits', 'Dilapidation Surveys', 'Health & Safety Checks', 'Preventative Advice', 'Detailed Documentation'],
    image: '/images/services/site-inspections.png'
  },
  {
    slug: 'refurbishment',
    title: 'Refurbishment',
    shortDesc: 'Full property refurbishment — kitchens, bathrooms, full fit-outs.',
    fullDesc: 'Transform your space with our full-service refurbishment solutions. We manage everything from design to final completion.',
    features: ['Kitchen Refurbishment', 'Bathroom Installation', 'Room Conversions', 'Full Property Fit-outs', 'Structural Changes', 'Interior Design'],
    image: '/images/services/refurbishment.png'
  },
  {
    slug: 'decorating',
    title: 'Painting & Decorating',
    shortDesc: 'Interior and exterior painting and decorating.',
    fullDesc: 'High-quality decorating services to refresh and protect your property, using premium materials for a lasting finish.',
    features: ['Interior Painting', 'Exterior Decorating', 'Wallpaper Hanging', 'Woodwork Restoration', 'Specialist Finishes', 'Commercial Decorating'],
    image: '/images/services/decorating.png'
  },
  {
    slug: 'plastering',
    title: 'Plastering',
    shortDesc: 'Skimming, dry-lining, artexing, and full plastering works.',
    fullDesc: 'Professional plastering services for a perfectly smooth finish on walls and ceilings, ready for decoration.',
    features: ['Internal Skimming', 'Dry Lining', 'Rendering Works', 'Ceiling Repairs', 'Artex Removal', 'Coving Installation'],
    image: '/images/services/plastering.png'
  },
  {
    slug: 'power-washing',
    title: 'Power Washing',
    shortDesc: 'Driveway, patio, building facade, and fleet power washing.',
    fullDesc: 'Restore the appearance of your external surfaces with our high-pressure cleaning services for all property types.',
    features: ['Driveway Cleaning', 'Patio Restoration', 'Brickwork Cleaning', 'Graffiti Removal', 'Fleet Washing', 'Commercial Facades'],
    image: '/images/services/power-washing.png'
  },
  {
    slug: 'brick-work',
    title: 'Brick Work',
    shortDesc: 'Repointing, new build brickwork, and repairs.',
    fullDesc: 'Expert masonry services covering structural repairs, cosmetic repointing, and new brickwork installations.',
    features: ['Repointing', 'Brick Repairs', 'Structural Walls', 'Garden Walls', 'Chimney Repairs', 'Lintel Fitting'],
    image: '/images/services/brickwork.png'
  },
  {
    slug: 'plumbing',
    title: 'Plumbing',
    shortDesc: 'General plumbing maintenance, leak repairs, and installations.',
    fullDesc: 'Reliable plumbing services for all your domestic and commercial needs, from simple leaks to full system installs.',
    features: ['Leak Detection', 'Pipe Repairs', 'Toilet Repairs', 'Radiator Fitting', 'Tap Replacement', 'Bathroom Plumbing'],
    image: '/images/services/plumbing.png'
  },
  {
    slug: 'fencing',
    title: 'Fencing',
    shortDesc: 'Timber, metal, and composite fencing supply and installation.',
    fullDesc: 'Secure and enhance your boundary with our professional fencing installation and repair services.',
    features: ['Panel Fencing', 'Closeboard Fencing', 'Gate Installations', 'Security Fencing', 'Fence Repairs', 'Trellis Work'],
    image: '/images/services/fencing.png'
  }
];
