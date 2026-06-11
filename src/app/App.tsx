import { useState, useMemo } from 'react';
import { differenceInDays, format } from 'date-fns';
import { MapComponent } from './components/MapComponent';

type PriceRange = 'economico' | 'medio' | 'luxo';

interface Hotel {
  id: number;
  name: string;
  city: string;
  country: string;
  price: number;
  range: PriceRange;
  image: string;
  lat: number;
  lng: number;
}

type RoomType = 'single' | 'deluxe' | 'suite';

const hotels: Hotel[] = [
  {
    id: 1,
    name: 'Hotel Mar Azul',
    city: 'Rio de Janeiro',
    country: 'Brasil',
    price: 250,
    range: 'economico',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80',
    lat: -22.9068,
    lng: -43.1729,
  },
  {
    id: 2,
    name: 'Pousada Tropical',
    city: 'Salvador',
    country: 'Brasil',
    price: 180,
    range: 'economico',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&q=80',
    lat: -12.9714,
    lng: -38.5014,
  },
  {
    id: 3,
    name: 'Grand Hotel Premium',
    country: 'Brasil',
    city: 'São Paulo',
    price: 450,
    range: 'medio',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&q=80',
    lat: -23.5505,
    lng: -46.6333,
  },
  {
    id: 4,
    name: 'Copacabana Palace',
    city: 'Rio de Janeiro',
    country: 'Brasil',
    price: 850,
    range: 'luxo',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80',
    lat: -22.9711,
    lng: -43.1823,
  },
  {
    id: 5,
    name: 'Resort Paradiso',
    country: 'Brasil',
    city: 'Florianópolis',
    price: 620,
    range: 'luxo',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80',
    lat: -27.5954,
    lng: -48.5480,
  },
  {
    id: 6,
    name: 'Hotel Vista Verde',
    city: 'Curitiba',
    country: 'Brasil',
    price: 320,
    range: 'medio',
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&q=80',
    lat: -25.4284,
    lng: -49.2733,
  },
  {
    id: 7,
    name: 'Boutique Hotel Charme',
    city: 'Porto Alegre',
    country: 'Brasil',
    price: 380,
    range: 'medio',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&q=80',
    lat: -30.0346,
    lng: -51.2177,
  },
  {
    id: 8,
    name: 'Eco Lodge Natureza',
    city: 'Bonito',
    country: 'Brasil',
    price: 290,
    range: 'economico',
    image: 'https://images.unsplash.com/photo-1587985064135-0366536eab42?w=500&q=80',
    lat: -21.1297,
    lng: -56.4965,
  },
  {
    id: 9,
    name: 'Lisboa Riverside Hotel',
    city: 'Lisboa',
    country: 'Portugal',
    price: 520,
    range: 'medio',
    image: 'https://images.unsplash.com/photo-1549973890-38d08b229439?w=500&q=80',
    lat: 38.7223,
    lng: -9.1393,
  },
  {
    id: 10,
    name: 'Porto Wine Boutique',
    city: 'Porto',
    country: 'Portugal',
    price: 410,
    range: 'medio',
    image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=500&q=80',
    lat: 41.1579,
    lng: -8.6291,
  },
  {
    id: 11,
    name: 'Paris Lumiere Palace',
    city: 'Paris',
    country: 'Franca',
    price: 980,
    range: 'luxo',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80',
    lat: 48.8566,
    lng: 2.3522,
  },
  {
    id: 12,
    name: 'Riviera Bleu Inn',
    city: 'Nice',
    country: 'Franca',
    price: 560,
    range: 'medio',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&q=80',
    lat: 43.7102,
    lng: 7.2620,
  },
  {
    id: 13,
    name: 'Roma Antica Suites',
    city: 'Roma',
    country: 'Italia',
    price: 610,
    range: 'medio',
    image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=500&q=80',
    lat: 41.9028,
    lng: 12.4964,
  },
  {
    id: 14,
    name: 'Venezia Canal Resort',
    city: 'Veneza',
    country: 'Italia',
    price: 920,
    range: 'luxo',
    image: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=500&q=80',
    lat: 45.4408,
    lng: 12.3155,
  },
  {
    id: 15,
    name: 'Manhattan Urban Stay',
    city: 'Nova York',
    country: 'Estados Unidos',
    price: 750,
    range: 'luxo',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=500&q=80',
    lat: 40.7128,
    lng: -74.0060,
  },
  {
    id: 16,
    name: 'Orlando Family Hotel',
    city: 'Orlando',
    country: 'Estados Unidos',
    price: 360,
    range: 'economico',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&q=80',
    lat: 28.5383,
    lng: -81.3792,
  },
  {
    id: 17,
    name: 'Tokyo Sakura Hotel',
    city: 'Toquio',
    country: 'Japao',
    price: 690,
    range: 'luxo',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80',
    lat: 35.6762,
    lng: 139.6503,
  },
  {
    id: 18,
    name: 'Kyoto Garden Ryokan',
    city: 'Quioto',
    country: 'Japao',
    price: 470,
    range: 'medio',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=500&q=80',
    lat: 35.0116,
    lng: 135.7681,
  },
  {
    id: 19,
    name: 'Buenos Aires Tango Hotel',
    city: 'Buenos Aires',
    country: 'Argentina',
    price: 240,
    range: 'economico',
    image: 'https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?w=500&q=80',
    lat: -34.6037,
    lng: -58.3816,
  },
  {
    id: 20,
    name: 'Cancun Caribe Resort',
    city: 'Cancun',
    country: 'Mexico',
    price: 640,
    range: 'luxo',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80',
    lat: 21.1619,
    lng: -86.8515,
  },
  {
    id: 21,
    name: 'Dubai Marina Luxury',
    city: 'Dubai',
    country: 'Emirados Arabes Unidos',
    price: 1150,
    range: 'luxo',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80',
    lat: 25.2048,
    lng: 55.2708,
  },
  {
    id: 22,
    name: 'Bangkok City Lodge',
    city: 'Bangkok',
    country: 'Tailandia',
    price: 210,
    range: 'economico',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=500&q=80',
    lat: 13.7563,
    lng: 100.5018,
  },
  {
    id: 23,
    name: 'Cape Town Ocean View',
    city: 'Cidade do Cabo',
    country: 'Africa do Sul',
    price: 430,
    range: 'medio',
    image: 'https://images.unsplash.com/photo-1586781034180-1dd0ccca3b65?w=500&q=80',
    lat: -33.9249,
    lng: 18.4241,
  },
  {
    id: 24,
    name: 'Toronto Skyline Hotel',
    city: 'Toronto',
    country: 'Canada',
    price: 390,
    range: 'medio',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=500&q=80',
    lat: 43.6532,
    lng: -79.3832,
  },
  {
    id: 25,
    name: 'Gramado Mountain Lodge',
    city: 'Gramado',
    country: 'Brasil',
    price: 340,
    range: 'medio',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80',
    lat: -29.3737,
    lng: -50.8764,
  },
  {
    id: 26,
    name: 'Jericoacoara Dune Resort',
    city: 'Jericoacoara',
    country: 'Brasil',
    price: 580,
    range: 'luxo',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80',
    lat: -2.7956,
    lng: -40.5142,
  },
  {
    id: 27,
    name: 'Recife Boa Viagem Inn',
    city: 'Recife',
    country: 'Brasil',
    price: 230,
    range: 'economico',
    image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=500&q=80',
    lat: -8.0476,
    lng: -34.8770,
  },
  {
    id: 28,
    name: 'Madrid Plaza Hotel',
    city: 'Madrid',
    country: 'Espanha',
    price: 540,
    range: 'medio',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=500&q=80',
    lat: 40.4168,
    lng: -3.7038,
  },
  {
    id: 29,
    name: 'Barcelona Gaudi Suites',
    city: 'Barcelona',
    country: 'Espanha',
    price: 760,
    range: 'luxo',
    image: 'https://images.unsplash.com/photo-1585525869531-07e4e93d18e7?w=500&q=80',
    lat: 41.3874,
    lng: 2.1686,
  },
  {
    id: 30,
    name: 'Amsterdam Canal House',
    city: 'Amsterdam',
    country: 'Holanda',
    price: 630,
    range: 'medio',
    image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=500&q=80',
    lat: 52.3676,
    lng: 4.9041,
  },
  {
    id: 31,
    name: 'London Regent Hotel',
    city: 'Londres',
    country: 'Reino Unido',
    price: 890,
    range: 'luxo',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&q=80',
    lat: 51.5072,
    lng: -0.1276,
  },
  {
    id: 32,
    name: 'Edinburgh Castle Stay',
    city: 'Edimburgo',
    country: 'Reino Unido',
    price: 420,
    range: 'medio',
    image: 'https://images.unsplash.com/photo-1506377585622-bedcbb027afc?w=500&q=80',
    lat: 55.9533,
    lng: -3.1883,
  },
  {
    id: 33,
    name: 'Berlin Mitte Hotel',
    city: 'Berlim',
    country: 'Alemanha',
    price: 390,
    range: 'medio',
    image: 'https://images.unsplash.com/photo-1568209865332-a15790aed756?w=500&q=80',
    lat: 52.5200,
    lng: 13.4050,
  },
  {
    id: 34,
    name: 'Munich Alpine Comfort',
    city: 'Munique',
    country: 'Alemanha',
    price: 310,
    range: 'economico',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&q=80',
    lat: 48.1351,
    lng: 11.5820,
  },
  {
    id: 35,
    name: 'Sydney Harbour View',
    city: 'Sydney',
    country: 'Australia',
    price: 720,
    range: 'luxo',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=500&q=80',
    lat: -33.8688,
    lng: 151.2093,
  },
  {
    id: 36,
    name: 'Melbourne Laneway Hotel',
    city: 'Melbourne',
    country: 'Australia',
    price: 460,
    range: 'medio',
    image: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=500&q=80',
    lat: -37.8136,
    lng: 144.9631,
  },
  {
    id: 37,
    name: 'Santiago Andes Hotel',
    city: 'Santiago',
    country: 'Chile',
    price: 280,
    range: 'economico',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&q=80',
    lat: -33.4489,
    lng: -70.6693,
  },
  {
    id: 38,
    name: 'Lima Pacific Hotel',
    city: 'Lima',
    country: 'Peru',
    price: 260,
    range: 'economico',
    image: 'https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=500&q=80',
    lat: -12.0464,
    lng: -77.0428,
  },
  {
    id: 39,
    name: 'Cusco Sacred Valley Lodge',
    city: 'Cusco',
    country: 'Peru',
    price: 440,
    range: 'medio',
    image: 'https://images.unsplash.com/photo-1581609836630-9007630f7a7e?w=500&q=80',
    lat: -13.5319,
    lng: -71.9675,
  },
  {
    id: 40,
    name: 'Seoul Han River Hotel',
    city: 'Seul',
    country: 'Coreia do Sul',
    price: 510,
    range: 'medio',
    image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=500&q=80',
    lat: 37.5665,
    lng: 126.9780,
  },
];

const countries = Array.from(new Set(hotels.map((hotel) => hotel.country))).sort();

const rangeLabels: Record<PriceRange, string> = {
  economico: 'Economico',
  medio: 'Medio',
  luxo: 'Luxo',
};

const galleryImages = [
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&q=80',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=80',
  'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80',
];

const getHotelRating = (hotel: Hotel) => (4.2 + (hotel.id % 8) / 10).toFixed(1);

const getHotelReviews = (hotel: Hotel) => 120 + hotel.id * 17;

const getHotelAmenities = (hotel: Hotel) => {
  const common = ['Wi-Fi rapido', 'Cafe da manha', 'Recepcao 24h', 'Cancelamento flexivel'];

  if (hotel.range === 'luxo') {
    return [...common, 'Spa completo', 'Piscina panoramica', 'Transfer privativo', 'Restaurante premiado'];
  }

  if (hotel.range === 'medio') {
    return [...common, 'Academia', 'Espaco coworking', 'Estacionamento', 'Vista privilegiada'];
  }

  return [...common, 'Quartos familiares', 'Check-in simplificado', 'Boa localizacao', 'Tarifas promocionais'];
};

const getHotelDescription = (hotel: Hotel) =>
  `${hotel.name} combina hospedagem ${rangeLabels[hotel.range].toLowerCase()} com uma localizacao estrategica em ${hotel.city}, ${hotel.country}. Ideal para viajantes que querem conforto, praticidade e uma reserva clara antes de fechar a viagem.`;

const roomMultipliers: Record<RoomType, { label: string; multiplier: number }> = {
  single: { label: 'Single', multiplier: 1 },
  deluxe: { label: 'Deluxe', multiplier: 1.5 },
  suite: { label: 'Suíte', multiplier: 2 },
};

export default function App() {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(hotels[0]);
  const [detailHotel, setDetailHotel] = useState<Hotel | null>(null);
  const [filter, setFilter] = useState<PriceRange | 'todos'>('todos');
  const [countryFilter, setCountryFilter] = useState<string>('todos');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [roomType, setRoomType] = useState<RoomType>('single');
  const [showMenu, setShowMenu] = useState(false);

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {
      const matchesPrice = filter === 'todos' || hotel.range === filter;
      const matchesCountry = countryFilter === 'todos' || hotel.country === countryFilter;

      return matchesPrice && matchesCountry;
    });
  }, [filter, countryFilter]);

  const totalPrice = useMemo(() => {
    if (!selectedHotel || !checkIn || !checkOut) return 0;

    const days = differenceInDays(new Date(checkOut), new Date(checkIn));
    if (days <= 0) return 0;

    const multiplier = roomMultipliers[roomType].multiplier;
    return selectedHotel.price * days * multiplier;
  }, [selectedHotel, checkIn, checkOut, roomType]);

  const numberOfDays = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const days = differenceInDays(new Date(checkOut), new Date(checkIn));
    return days > 0 ? days : 0;
  }, [checkIn, checkOut]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setShowMenu(false);
  };

  const openHotelDetails = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setDetailHotel(hotel);
  };

  const showHotelOnMap = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setDetailHotel(null);
    setTimeout(() => scrollToSection('mapa'), 100);
  };

  const startHotelReservation = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setDetailHotel(null);
    setTimeout(() => scrollToSection('reserva'), 100);
  };

  const handleReserva = () => {
    if (!selectedHotel || !checkIn || !checkOut || numberOfDays <= 0) {
      alert('Por favor, selecione um hotel e datas válidas para a reserva.');
      return;
    }

    const msg = `✅ Reserva confirmada!\n\nHotel: ${selectedHotel.name}\nCidade: ${selectedHotel.city}\nPais: ${selectedHotel.country}\nCheck-in: ${format(new Date(checkIn), 'dd/MM/yyyy')}\nCheck-out: ${format(new Date(checkOut), 'dd/MM/yyyy')}\nQuarto: ${roomMultipliers[roomType].label}\nDiárias: ${numberOfDays}\nTotal: R$ ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

    alert(msg);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">Nuvia Travel Pro</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Plataforma estilo Airbnb + Booking com reservas inteligentes
          </p>
          <button
            onClick={() => scrollToSection('destinos')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105"
          >
            Explorar Destinos
          </button>
        </div>
      </section>

      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-blue-600">Nuvia Travel</div>

            {/* Mobile menu button */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Desktop menu */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('destinos')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Destinos
              </button>
              <button onClick={() => scrollToSection('mapa')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Mapa
              </button>
              <button onClick={() => scrollToSection('reserva')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Hotéis / Reserva
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {showMenu && (
            <div className="md:hidden pb-4 space-y-2">
              <button onClick={() => scrollToSection('destinos')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Destinos
              </button>
              <button onClick={() => scrollToSection('mapa')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Mapa
              </button>
              <button onClick={() => scrollToSection('reserva')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                Hotéis / Reserva
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Destinos Section */}
      <section id="destinos" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossos Destinos</h2>
            <p className="text-xl text-gray-600">Escolha o hotel perfeito para sua viagem</p>
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="px-6 py-3 bg-white border-2 border-gray-300 rounded-full text-gray-700 font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="todos">Todos os Paises</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as PriceRange | 'todos')}
              className="px-6 py-3 bg-white border-2 border-gray-300 rounded-full text-gray-700 font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="todos">Todos os Hotéis</option>
              <option value="economico">Econômico</option>
              <option value="medio">Médio</option>
              <option value="luxo">Luxo</option>
            </select>
          </div>

          {/* Grid de Hotéis */}
          {filteredHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                onClick={() => openHotelDetails(hotel)}
                className={`bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all transform hover:scale-105 hover:shadow-2xl ${
                  selectedHotel?.id === hotel.id ? 'ring-4 ring-blue-500' : ''
                }`}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{hotel.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                      {hotel.city}, {hotel.country}
                    </span>
                    <span className="text-xl font-bold text-blue-600">
                      R$ {hotel.price}
                      <span className="text-sm text-gray-500">/noite</span>
                    </span>
                  </div>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      openHotelDetails(hotel);
                    }}
                    className="mt-4 w-full bg-gray-900 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Ver detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-8 text-center text-gray-600">
              Nenhum hotel encontrado para os filtros selecionados.
            </div>
          )}
        </div>
      </section>

      {/* Mapa Section */}
      <section id="mapa" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Localização</h2>

          {selectedHotel && (
            <div className="mb-6 text-center">
              <p className="text-xl text-gray-700">
                <span className="font-bold">{selectedHotel.name}</span> - {selectedHotel.city}, {selectedHotel.country}
              </p>
            </div>
          )}

          <div className="h-[500px] rounded-xl overflow-hidden shadow-xl">
            {selectedHotel && (
              <MapComponent
                lat={selectedHotel.lat}
                lng={selectedHotel.lng}
                hotelName={selectedHotel.name}
                city={`${selectedHotel.city}, ${selectedHotel.country}`}
                price={selectedHotel.price}
              />
            )}
          </div>
        </div>
      </section>

      {/* Reserva Section */}
      <section id="reserva" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Sistema de Reserva</h2>

          <div className="bg-white rounded-xl shadow-xl p-8">
            {selectedHotel ? (
              <>
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedHotel.name}</h3>
                  <p className="text-gray-600">{selectedHotel.city}, {selectedHotel.country}</p>
                  <p className="text-lg text-blue-600 font-semibold mt-2">
                    R$ {selectedHotel.price}/noite
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Quarto
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value as RoomType)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="single">Single (Padrão)</option>
                    <option value="deluxe">Deluxe (+50%)</option>
                    <option value="suite">Suíte (+100%)</option>
                  </select>
                </div>

                {numberOfDays > 0 && (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Diárias:</span>
                      <span className="font-semibold">{numberOfDays} {numberOfDays === 1 ? 'dia' : 'dias'}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Preço por noite:</span>
                      <span className="font-semibold">R$ {selectedHotel.price}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Tipo de quarto:</span>
                      <span className="font-semibold">{roomMultipliers[roomType].label}</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t-2 border-blue-300 mt-4">
                      <span className="text-xl font-bold text-gray-900">Total:</span>
                      <span className="text-3xl font-bold text-blue-600">
                        R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleReserva}
                  disabled={!checkIn || !checkOut || numberOfDays <= 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg text-lg font-bold transition-all transform hover:scale-105 disabled:transform-none"
                >
                  Reservar Agora
                </button>
              </>
            ) : (
              <p className="text-center text-gray-500 py-8">
                Selecione um hotel para fazer sua reserva
              </p>
            )}
          </div>
        </div>
      </section>

      {detailHotel && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 px-4 py-6 overflow-y-auto"
          onClick={() => setDetailHotel(null)}
        >
          <div
            className="bg-white max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative">
              <img
                src={detailHotel.image}
                alt={detailHotel.name}
                className="w-full h-72 md:h-96 object-cover"
              />
              <button
                onClick={() => setDetailHotel(null)}
                className="absolute top-4 right-4 bg-white/95 hover:bg-white text-gray-900 h-10 w-10 rounded-full text-2xl leading-none shadow-lg"
                aria-label="Fechar detalhes"
              >
                x
              </button>
              <div className="absolute left-6 bottom-6 text-white drop-shadow-lg">
                <p className="text-sm font-semibold uppercase tracking-wide">{detailHotel.city}, {detailHotel.country}</p>
                <h2 className="text-3xl md:text-5xl font-bold">{detailHotel.name}</h2>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
                <div>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                      {rangeLabels[detailHotel.range]}
                    </span>
                    <span className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full font-semibold">
                      {getHotelRating(detailHotel)} estrelas
                    </span>
                    <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                      {getHotelReviews(detailHotel)} avaliacoes
                    </span>
                  </div>

                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {getHotelDescription(detailHotel)}
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Galeria</h3>
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {[detailHotel.image, ...galleryImages].slice(0, 3).map((image) => (
                      <img
                        key={image}
                        src={image}
                        alt={detailHotel.name}
                        className="h-28 md:h-36 w-full object-cover rounded-lg"
                      />
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Comodidades</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {getHotelAmenities(detailHotel).map((amenity) => (
                      <div key={amenity} className="flex items-center gap-3 text-gray-700">
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Politicas</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-gray-700">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="font-bold text-gray-900">Check-in</p>
                      <p>A partir das 14h</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="font-bold text-gray-900">Check-out</p>
                      <p>Ate 11h</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <p className="font-bold text-gray-900">Cancelamento</p>
                      <p>Flexivel ate 48h antes</p>
                    </div>
                  </div>
                </div>

                <aside className="border border-gray-200 rounded-xl p-6 h-fit">
                  <p className="text-gray-500 mb-1">A partir de</p>
                  <p className="text-4xl font-bold text-blue-600 mb-1">R$ {detailHotel.price}</p>
                  <p className="text-gray-500 mb-6">por noite</p>

                  <div className="space-y-3 text-gray-700 mb-6">
                    <div className="flex justify-between gap-4">
                      <span>Local</span>
                      <span className="font-semibold text-right">{detailHotel.city}, {detailHotel.country}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Categoria</span>
                      <span className="font-semibold">{rangeLabels[detailHotel.range]}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Nota</span>
                      <span className="font-semibold">{getHotelRating(detailHotel)} / 5</span>
                    </div>
                  </div>

                  <button
                    onClick={() => startHotelReservation(detailHotel)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-colors mb-3"
                  >
                    Reservar este hotel
                  </button>
                  <button
                    onClick={() => showHotelOnMap(detailHotel)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-bold transition-colors"
                  >
                    Ver no mapa
                  </button>
                </aside>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2026 Nuvia Travel Pro. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
