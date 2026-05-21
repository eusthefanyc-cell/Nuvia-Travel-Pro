import { useState, useMemo } from 'react';
import { differenceInDays, format } from 'date-fns';
import { MapComponent } from './components/MapComponent';

type PriceRange = 'economico' | 'medio' | 'luxo';

interface Hotel {
  id: number;
  name: string;
  city: string;
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
    price: 180,
    range: 'economico',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=500&q=80',
    lat: -12.9714,
    lng: -38.5014,
  },
  {
    id: 3,
    name: 'Grand Hotel Premium',
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
    price: 850,
    range: 'luxo',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&q=80',
    lat: -22.9711,
    lng: -43.1823,
  },
  {
    id: 5,
    name: 'Resort Paradiso',
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
    price: 290,
    range: 'economico',
    image: 'https://images.unsplash.com/photo-1587985064135-0366536eab42?w=500&q=80',
    lat: -21.1297,
    lng: -56.4965,
  },
];

const roomMultipliers: Record<RoomType, { label: string; multiplier: number }> = {
  single: { label: 'Single', multiplier: 1 },
  deluxe: { label: 'Deluxe', multiplier: 1.5 },
  suite: { label: 'Suíte', multiplier: 2 },
};

export default function App() {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(hotels[0]);
  const [filter, setFilter] = useState<PriceRange | 'todos'>('todos');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [roomType, setRoomType] = useState<RoomType>('single');
  const [showMenu, setShowMenu] = useState(false);

  const filteredHotels = useMemo(() => {
    if (filter === 'todos') return hotels;
    return hotels.filter(h => h.range === filter);
  }, [filter]);

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

  const handleReserva = () => {
    if (!selectedHotel || !checkIn || !checkOut || numberOfDays <= 0) {
      alert('Por favor, selecione um hotel e datas válidas para a reserva.');
      return;
    }

    const msg = `✅ Reserva confirmada!\n\nHotel: ${selectedHotel.name}\nCidade: ${selectedHotel.city}\nCheck-in: ${format(new Date(checkIn), 'dd/MM/yyyy')}\nCheck-out: ${format(new Date(checkOut), 'dd/MM/yyyy')}\nQuarto: ${roomMultipliers[roomType].label}\nDiárias: ${numberOfDays}\nTotal: R$ ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;

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
          <div className="flex justify-center mb-8">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                onClick={() => {
                  setSelectedHotel(hotel);
                  setTimeout(() => scrollToSection('mapa'), 300);
                }}
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
                      {hotel.city}
                    </span>
                    <span className="text-xl font-bold text-blue-600">
                      R$ {hotel.price}
                      <span className="text-sm text-gray-500">/noite</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mapa Section */}
      <section id="mapa" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Localização</h2>

          {selectedHotel && (
            <div className="mb-6 text-center">
              <p className="text-xl text-gray-700">
                <span className="font-bold">{selectedHotel.name}</span> - {selectedHotel.city}
              </p>
            </div>
          )}

          <div className="h-[500px] rounded-xl overflow-hidden shadow-xl">
            {selectedHotel && (
              <MapComponent
                lat={selectedHotel.lat}
                lng={selectedHotel.lng}
                hotelName={selectedHotel.name}
                city={selectedHotel.city}
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
                  <p className="text-gray-600">{selectedHotel.city}</p>
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
