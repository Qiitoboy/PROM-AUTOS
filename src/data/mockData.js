// Mock data for PROM AUTOS Dealership

export const initialVehicles = [
  {
    id: "v1",
    name: "BMW M5 Competition",
    make: "BMW",
    model: "M5",
    type: "Sedan",
    price: 110900,
    year: 2024,
    condition: "NEW",
    transmission: "Automatic",
    fuel: "Petrol",
    speed: "3.1s 0-100 km/h",
    image: "/img/car1.jpg",
    featured: true,
    description: "The BMW M5 Competition combines everyday business sedan usability with track-ready performance. Driven by a 4.4L twin-turbo V8 producing 617 horsepower."
  },
  {
    id: "v2",
    name: "Porsche 911 GT3 RS",
    make: "Porsche",
    model: "911 GT3",
    type: "Coupe",
    price: 223800,
    year: 2023,
    condition: "NEW",
    transmission: "Automatic",
    fuel: "Petrol",
    speed: "3.0s 0-100 km/h",
    image: "/img/car2.jpg",
    featured: true,
    description: "The Porsche 911 GT3 RS is a street-legal track weapon, featuring state-of-the-art active aerodynamics, a high-revving 4.0L naturally aspirated flat-six, and premium carbon fiber components."
  },
  {
    id: "v3",
    name: "Mercedes-AMG GT R",
    make: "Mercedes",
    model: "AMG GT",
    type: "Coupe",
    price: 157000,
    year: 2022,
    condition: "USED",
    transmission: "Automatic",
    fuel: "Petrol",
    speed: "3.5s 0-100 km/h",
    image: "/img/car3.jpg",
    featured: true,
    description: "From the Green Hell: The AMG GT R features advanced active aerodynamics, a twin-turbocharged V8 engine, and race-tuned adjustable suspension, delivering pure racing pedigree."
  },
  {
    id: "v4",
    name: "Audi R8 V10 Performance",
    make: "Audi",
    model: "R8",
    type: "Coupe",
    price: 196800,
    year: 2023,
    condition: "USED",
    transmission: "Automatic",
    fuel: "Petrol",
    speed: "3.2s 0-100 km/h",
    image: "/img/car4.jpg",
    featured: true,
    description: "A mechanical masterpiece featuring a naturally aspirated 5.2L V10 engine, Quattro all-wheel drive, and a breathtaking digital cockpit. The ultimate everyday supercar."
  },
  {
    id: "v5",
    name: "Chevrolet Corvette Z06",
    make: "Chevrolet",
    model: "Corvette",
    type: "Coupe",
    price: 106000,
    year: 2024,
    condition: "NEW",
    transmission: "Automatic",
    fuel: "Petrol",
    speed: "2.6s 0-100 km/h",
    image: "/img/car5.jpg",
    featured: false,
    description: "Featuring a flat-plane crank 5.5L V8 engine that screams up to 8,600 RPM, the Corvette Z06 puts hypercar performance and handling within reach."
  },
  {
    id: "v6",
    name: "Tesla Model S Plaid",
    make: "Tesla",
    model: "Model S",
    type: "Sedan",
    price: 89990,
    year: 2023,
    condition: "USED",
    transmission: "Automatic",
    fuel: "Electric",
    speed: "1.99s 0-100 km/h",
    image: "/img/car6.jpg",
    featured: false,
    description: "With 1,020 peak horsepower, tri-motor all-wheel drive, and vectoring torque control, the Plaid offers unbelievable acceleration and ultra-modern tech integration."
  }
];

export const initialParts = [
  {
    id: "p1",
    name: "Brembo Carbon Ceramic Brake Kit",
    category: "Brakes",
    price: 8450,
    compatibility: "BMW M5 / Mercedes-AMG GT",
    inStock: true,
    stockCount: 3,
    image: "/img/part1.png",
    featured: true,
    description: "Ultimate track braking performance. Extreme fade resistance, reduced unsprung mass, and exceptional durability under heat."
  },
  {
    id: "p2",
    name: "Akrapovič Evolution Line Exhaust System",
    category: "Exhaust",
    price: 6200,
    compatibility: "Porsche 911 GT3 (992)",
    inStock: true,
    stockCount: 2,
    image: "/img/part2.png",
    featured: true,
    description: "Titanium exhaust system providing significant weight savings, power gains, and a rich, resonant high-revving exhaust note."
  },
  {
    id: "p3",
    name: "Bilstein Clubsport Suspension Kit",
    category: "Suspension",
    price: 3890,
    compatibility: "Audi R8 / Huracan",
    inStock: true,
    stockCount: 5,
    image: "/img/part3.png",
    featured: true,
    description: "2-way adjustable coilover system with independent rebound and compression damping, designed for track day and motorsport use."
  },
  {
    id: "p4",
    name: "HRE P101 Custom Forged Wheels",
    category: "Wheels",
    price: 9200,
    compatibility: "Universal Supercars",
    inStock: true,
    stockCount: 4,
    image: "/img/part4.png",
    featured: true,
    description: "Monoblok aerospace-grade forged aluminum wheels offering maximum strength-to-weight ratio and stunning modern aesthetics."
  },
  {
    id: "p5",
    name: "Eventuri Carbon Fiber Intake System",
    category: "Engine",
    price: 1850,
    compatibility: "BMW M5 / M8 F90",
    inStock: false,
    stockCount: 0,
    image: "/img/part5.png",
    featured: false,
    description: "Patented intake housing design creating aerodynamic Venturi flow to maximize turbo responsiveness and cold air volume."
  },
  {
    id: "p6",
    name: "Recaro Podium CF Racing Seats",
    category: "Interior",
    price: 3400,
    compatibility: "Universal Track Cars",
    inStock: true,
    stockCount: 2,
    image: "/img/part6.png",
    featured: false,
    description: "Ultra-lightweight carbon fiber shell seat, street-legal and FIA approved, offering perfect body contour and lateral support."
  }
];

export const dealerStats = [
  { label: "VEHICLES DELIVERED", value: "850+" },
  { label: "HAPPY CLIENTS", value: "12K+" },
  { label: "GENUINE PARTS SOLD", value: "35K+" },
  { label: "YEARS OF SERVICE", value: "15+" }
];

export const initialLeads = [
  {
    id: "l1",
    name: "Marcus Aurelius",
    email: "marcus.aurelius@empire.org",
    phone: "+1 (555) 019-2834",
    message: "Interested in setting up a private test drive for the Porsche 911 GT3 RS. Is the price final, or do you have dealership financing available?",
    vehicleInterest: "Porsche 911 GT3 RS",
    date: "2026-06-18",
    status: "New"
  },
  {
    id: "l2",
    name: "Sarah Jenkins",
    email: "s.jenkins@fastmail.com",
    phone: "+44 7911 123456",
    message: "Does the Brembo Brake Kit fit a 2019 BMW M5 Competition? Also, do you offer installation services in-house?",
    vehicleInterest: "Brembo Carbon Ceramic Brake Kit",
    date: "2026-06-17",
    status: "In Progress"
  }
];
