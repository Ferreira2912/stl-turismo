// Dados mockados para desenvolvimento

export const mockPackages = [
  {
    id: "1",
    title: "Gramado Encantado",
    subtitle: "A magia da Serra Gaúcha",
    destination: "Gramado, RS",
    departureDate: "2025-03-15",
    returnDate: "2025-03-18",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=400&fit=crop",
    price: 1250,
    originalPrice: 1599,
    duration: "4 dias / 3 noites",
    featured: true,
    active: true,
    highlights: [
      "Hotel 4 estrelas no centro de Gramado",
      "Passeio em Canela e Caracol",
      "Visita ao Lago Negro",
      "City Tour completo",
      "Café colonial incluso"
    ],
    description: "Descubra a magia de Gramado com nosso pacote completo incluindo hospedagem, passeios e refeições especiais.",
    includes: [
      "Transporte ida e volta",
      "Hospedagem com café da manhã",
      "Passeios com guia local",
      "Seguro viagem"
    ]
  },
  {
    id: "2",
    title: "Foz do Iguaçu Aventura",
    subtitle: "As Cataratas mais belas do mundo",
    destination: "Foz do Iguaçu, PR",
    departureDate: "2025-04-10",
    returnDate: "2025-04-12",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop",
    price: 890,
    originalPrice: 1190,
    duration: "3 dias / 2 noites",
    featured: true,
    active: true,
    highlights: [
      "Cataratas do Iguaçu (lado brasileiro e argentino)",
      "Parque das Aves",
      "Usina de Itaipu",
      "Marco das Três Fronteiras",
      "Hotel com vista panorâmica"
    ],
    description: "Explore uma das maravilhas naturais do mundo com passeios completos pelas Cataratas do Iguaçu.",
    includes: [
      "Transporte executivo",
      "Hospedagem com café da manhã",
      "Ingressos para todas as atrações",
      "Guia especializado"
    ]
  },
  {
    id: "3",
    title: "Florianópolis Verão",
    subtitle: "Praias paradisíacas de Santa Catarina",
    destination: "Florianópolis, SC",
    departureDate: "2025-01-20",
    returnDate: "2025-01-24",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop",
    price: 1450,
    originalPrice: null,
    duration: "5 dias / 4 noites",
    featured: true,
    active: true,
    highlights: [
      "Hotel na Beira Mar Norte",
      "Passeio pelas principais praias",
      "Fortaleza de São José da Ponta Grossa",
      "Lagoa da Conceição",
      "Centro Histórico"
    ],
    description: "Aproveite as melhores praias de Santa Catarina com conforto e segurança.",
    includes: [
      "Transporte de luxo",
      "Hospedagem frente ao mar",
      "City tour completo",
      "Seguro viagem completo"
    ]
  },
  {
    id: "4",
    title: "Buenos Aires Express",
    subtitle: "A Paris da América do Sul",
    destination: "Buenos Aires, Argentina",
    departureDate: "2025-05-05",
    returnDate: "2025-05-08",
    image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600&h=400&fit=crop",
    price: 2250,
    originalPrice: 2850,
    duration: "4 dias / 3 noites",
    featured: true,
    active: true,
    highlights: [
      "Hotel no centro de Buenos Aires",
      "City Tour pelos principais pontos",
      "Show de Tango",
      "Passeio em San Telmo",
      "Compras na Florida Street"
    ],
    description: "Conheça a elegante Buenos Aires, com sua arquitetura europeia e cultura vibrante.",
    includes: [
      "Transporte internacional",
      "Hospedagem 4 estrelas",
      "Documentação de viagem",
      "Guia bilíngue"
    ]
  },
  {
    id: "5",
    title: "Bariloche Neve",
    subtitle: "Esqui e chocolate na Patagônia",
    destination: "Bariloche, Argentina",
    departureDate: "2025-07-12",
    returnDate: "2025-07-17",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    price: 3200,
    originalPrice: 3890,
    duration: "6 dias / 5 noites",
    featured: true,
    active: true,
    highlights: [
      "Hotel com vista para o lago Nahuel Huapi",
      "Cerro Catedral - estação de esqui",
      "Degustação de chocolates artesanais",
      "Passeio de barco pelos lagos",
      "Circuito Chico completo"
    ],
    description: "Desfrute da temporada de inverno em Bariloche com neve, esqui e paisagens deslumbrantes.",
    includes: [
      "Transporte internacional",
      "Hospedagem 5 estrelas",
      "Equipamentos de esqui",
      "Guia especializado em montanha"
    ]
  },
  {
    id: "6",
    title: "Chapada Diamantina",
    subtitle: "Cachoeiras e grutas da Bahia",
    destination: "Lençóis, BA",
    departureDate: "2025-06-01",
    returnDate: "2025-06-05",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    price: 1680,
    originalPrice: null,
    duration: "5 dias / 4 noites",
    featured: true,
    active: true,
    highlights: [
      "Cachoeira da Fumaça",
      "Gruta da Lapa Doce",
      "Poço Encantado",
      "Vale do Pati (treking)",
      "Mucugê e Lençóis"
    ],
    description: "Aventure-se pela Chapada Diamantina e descubra cenários únicos do cerrado baiano.",
    includes: [
      "Transporte 4x4",
      "Hospedagem em pousadas locais",
      "Guias especializados em ecoturismo",
      "Equipamentos de segurança"
    ]
  }
];

export const mockDestinations = [
  {
    id: "1",
    name: "Serra Gaúcha",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8b?w=600&h=400&fit=crop",
    packageCount: 8,
    featured: true,
    popularCities: ["Gramado", "Canela", "Nova Petrópolis", "Bento Gonçalves"],
    description: "Região montanhosa conhecida por sua arquitetura alemã, vinícolas e clima europeu."
  },
  {
    id: "2",
    name: "Litoral Sul",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
    packageCount: 12,
    featured: true,
    popularCities: ["Florianópolis", "Balneário Camboriú", "Porto Belo", "Bombinhas"],
    description: "Praias paradisíacas com águas cristalinas e infraestrutura completa."
  },
  {
    id: "3",
    name: "Cataratas",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop",
    packageCount: 6,
    featured: true,
    popularCities: ["Foz do Iguaçu", "Puerto Iguazu", "Ciudad del Este"],
    description: "Uma das sete maravilhas naturais do mundo, com cachoeiras impressionantes."
  },
  {
    id: "4",
    name: "Internacional",
    image: "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600&h=400&fit=crop",
    packageCount: 15,
    featured: true,
    popularCities: ["Buenos Aires", "Montevidéu", "Santiago", "Bariloche"],
    description: "Destinos internacionais próximos com cultura rica e paisagens únicas."
  }
];

export const mockTestimonials = [
  {
    id: "1",
    name: "Maria Silva",
    age: "65 anos",
    text: "Viagem incrível para Gramado! Atendimento familiar e cuidadoso em todos os detalhes. Os veículos são muito confortáveis e o motorista foi super atencioso.",
    rating: 5,
    trip: "Gramado - Família",
    date: "2024-07-15"
  },
  {
    id: "2",
    name: "João Santos",
    age: "45 anos", 
    text: "Excelente experiência em Foz do Iguaçu. Veículos novos e confortáveis, recomendo! Conseguimos conhecer tudo que queríamos com tranquilidade.",
    rating: 5,
    trip: "Foz do Iguaçu - Casal",
    date: "2024-06-20"
  },
  {
    id: "3",
    name: "Ana Costa",
    age: "38 anos",
    text: "Primeira viagem com a STL Turismo e não será a última! Organização perfeita, preços justos e atendimento excepcional.",
    rating: 5,
    trip: "Florianópolis - Família",
    date: "2024-08-10"
  }
];
