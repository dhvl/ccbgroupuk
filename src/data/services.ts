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
    image: 'https://images.unsplash.com/photo-1581578731522-aa7c0414f6b1?auto=format&fit=crop&q=80&w=1200'
  },
  {
    slug: 'electrical-testing',
    title: 'Electrical Testing',
    shortDesc: 'NICEIC approved periodic inspection and testing (EICR certificates).',
    fullDesc: 'Ensure your property is safe and compliant with our expert electrical testing services. We provide full EICR certification for landlords and homeowners.',
    features: ['EICR Certification', 'Fixed Wire Testing', 'PAT Testing', 'Safety Inspections', 'Emergency Lighting Tests', 'Remedial Works'],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    slug: 'electrical-maintenance',
    title: 'Electrical Maintenance',
    shortDesc: 'Full electrical maintenance, fault finding, and installation works.',
    fullDesc: 'Our NICEIC approved electricians handle all aspects of electrical maintenance and installation, ensuring your systems are reliable and safe.',
    features: ['Fault Finding', 'Rewiring Works', 'Lighting Upgrades', 'Fuse Board Changes', 'Socket Installations', 'Emergency Repairs'],
    image: 'https://images.unsplash.com/photo-1558210857-39d4a984f25b?auto=format&fit=crop&q=80&w=1200'
  },
  {
    slug: 'carpentry',
    title: 'Carpentry & Joinery',
    shortDesc: 'Doors, frames, skirting, fitted furniture, and bespoke joinery.',
    fullDesc: 'Expert carpentry services for all your internal and external woodwork needs, from door hanging to bespoke cabinetry.',
    features: ['Door Fitting', 'Skirting & Architrave', 'Kitchen Fitting', 'Bespoke Joinery', 'Flooring Installation', 'Structural Carpentry'],
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200'
  },
  {
    slug: 'roofing',
    title: 'Roofing Works',
    shortDesc: 'Flat and pitched roofing, repairs, felt work, and emergency call-outs.',
    fullDesc: 'Professional roofing solutions for all types of properties. We handle leak repairs, new installations, and routine maintenance.',
    features: ['Flat Roofing (EPDM/GRP)', 'Tiled & Slated Roofs', 'Guttering & Fascias', 'Leadwork Repairs', 'Chimney Repointing', 'Roof Inspections'],
    image: 'https://images.unsplash.com/photo-1635424710928-0544e8512eae?auto=format&fit=crop&q=80&w=1200'
  },
  {
    slug: 'site-inspections',
    title: 'Site Inspections',
    shortDesc: 'Professional property condition reports and site audits.',
    fullDesc: 'Get a clear picture of your property\'s condition with our detailed site inspections and professional reporting services.',
    features: ['Condition Reports', 'Compliance Audits', 'Dilapidation Surveys', 'Health & Safety Checks', 'Preventative Advice', 'Detailed Documentation'],
    image: 'https://images.unsplash.com/photo-1454165833767-027eeef1593e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    slug: 'refurbishment',
    title: 'Refurbishment',
    shortDesc: 'Full property refurbishment — kitchens, bathrooms, full fit-outs.',
    fullDesc: 'Transform your space with our full-service refurbishment solutions. We manage everything from design to final completion.',
    features: ['Kitchen Refurbishment', 'Bathroom Installation', 'Room Conversions', 'Full Property Fit-outs', 'Structural Changes', 'Interior Design'],
    image: 'https://images.unsplash.com/photo-1556911220-e15224bbaf47?auto=format&fit=crop&q=80&w=1200'
  },
  {
    slug: 'decorating',
    title: 'Painting & Decorating',
    shortDesc: 'Interior and exterior painting and decorating.',
    fullDesc: 'High-quality decorating services to refresh and protect your property, using premium materials for a lasting finish.',
    features: ['Interior Painting', 'Exterior Decorating', 'Wallpaper Hanging', 'Woodwork Restoration', 'Specialist Finishes', 'Commercial Decorating'],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1200'
  },
  {
    slug: 'plastering',
    title: 'Plastering',
    shortDesc: 'Skimming, dry-lining, artexing, and full plastering works.',
    fullDesc: 'Professional plastering services for a perfectly smooth finish on walls and ceilings, ready for decoration.',
    features: ['Internal Skimming', 'Dry Lining', 'Rendering Works', 'Ceiling Repairs', 'Artex Removal', 'Coving Installation'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200'
  },
  {
    slug: 'power-washing',
    title: 'Power Washing',
    shortDesc: 'Driveway, patio, building facade, and fleet power washing.',
    fullDesc: 'Restore the appearance of your external surfaces with our high-pressure cleaning services for all property types.',
    features: ['Driveway Cleaning', 'Patio Restoration', 'Brickwork Cleaning', 'Graffiti Removal', 'Fleet Washing', 'Commercial Facades'],
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=1200'
  },
  {
    slug: 'brick-work',
    title: 'Brick Work',
    shortDesc: 'Repointing, new build brickwork, and repairs.',
    fullDesc: 'Expert masonry services covering structural repairs, cosmetic repointing, and new brickwork installations.',
    features: ['Repointing', 'Brick Repairs', 'Structural Walls', 'Garden Walls', 'Chimney Repairs', 'Lintel Fitting'],
    image: 'https://images.unsplash.com/photo-1582266255765-fa5cf1a1d501?auto=format&fit=crop&q=80&w=1200'
  },
  {
    slug: 'plumbing',
    title: 'Plumbing',
    shortDesc: 'General plumbing maintenance, leak repairs, and installations.',
    fullDesc: 'Reliable plumbing services for all your domestic and commercial needs, from simple leaks to full system installs.',
    features: ['Leak Detection', 'Pipe Repairs', 'Toilet Repairs', 'Radiator Fitting', 'Tap Replacement', 'Bathroom Plumbing'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200'
  },
  {
    slug: 'fencing',
    title: 'Fencing',
    shortDesc: 'Timber, metal, and composite fencing supply and installation.',
    fullDesc: 'Secure and enhance your boundary with our professional fencing installation and repair services.',
    features: ['Panel Fencing', 'Closeboard Fencing', 'Gate Installations', 'Security Fencing', 'Fence Repairs', 'Trellis Work'],
    image: 'https://images.unsplash.com/photo-1558905758-294371987621?auto=format&fit=crop&q=80&w=1200'
  }
];
