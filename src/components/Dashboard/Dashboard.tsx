import React from 'react';
import { 
  Calendar, 
  Heart, 
  FileText, 
  Phone, 
  CheckSquare, 
  Film, 
  Lightbulb, 
  DollarSign, 
  Target, 
  Smartphone,
  Users,
  Home
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ModuleCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  route: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const modules: ModuleCard[] = [
    {
      id: 'events',
      title: 'Événements & Rappels',
      description: 'Gérez vos rendez-vous et rappels importants',
      icon: <Calendar className="h-6 w-6" />,
      color: 'bg-blue-500',
      route: '/events'
    },
    {
      id: 'health',
      title: 'Santé',
      description: 'Suivez vos symptômes et médicaments',
      icon: <Heart className="h-6 w-6" />,
      color: 'bg-red-500',
      route: '/health'
    },
    {
      id: 'documents',
      title: 'Documents importants',
      description: 'Stockez et organisez vos documents',
      icon: <FileText className="h-6 w-6" />,
      color: 'bg-green-500',
      route: '/documents'
    },
    {
      id: 'contacts',
      title: 'Répertoire',
      description: 'Gérez vos contacts importants',
      icon: <Phone className="h-6 w-6" />,
      color: 'bg-purple-500',
      route: '/contacts'
    },
    {
      id: 'tasks',
      title: 'Tâches & Projets',
      description: 'Organisez vos tâches et projets',
      icon: <CheckSquare className="h-6 w-6" />,
      color: 'bg-yellow-500',
      route: '/tasks'
    },
    {
      id: 'leisure',
      title: 'Loisirs à suivre',
      description: 'Films, livres, jeux à découvrir',
      icon: <Film className="h-6 w-6" />,
      color: 'bg-pink-500',
      route: '/leisure'
    },
    {
      id: 'ideas',
      title: 'Idées & Inspirations',
      description: 'Collectez vos idées créatives',
      icon: <Lightbulb className="h-6 w-6" />,
      color: 'bg-orange-500',
      route: '/ideas'
    },
    {
      id: 'finances',
      title: 'Finances perso',
      description: 'Suivez vos dépenses et revenus',
      icon: <DollarSign className="h-6 w-6" />,
      color: 'bg-emerald-500',
      route: '/finances'
    },
    {
      id: 'decisions',
      title: 'Journal de décisions',
      description: 'Documentez vos décisions importantes',
      icon: <Target className="h-6 w-6" />,
      color: 'bg-indigo-500',
      route: '/decisions'
    },
    {
      id: 'software',
      title: 'Logiciels & Apps',
      description: 'Répertoriez vos outils favoris',
      icon: <Smartphone className="h-6 w-6" />,
      color: 'bg-cyan-500',
      route: '/software'
    },
    {
      id: 'community',
      title: 'Espace Communautaire',
      description: 'Échangez avec la communauté',
      icon: <Users className="h-6 w-6" />,
      color: 'bg-violet-500',
      route: '/community'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Home className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
        </div>
        <p className="text-gray-600">
          Bienvenue sur votre assistant personnel. Choisissez un module pour commencer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div
            key={module.id}
            onClick={() => navigate(module.route)}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100 overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`${module.color} text-white p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                  {module.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {module.title}
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                {module.description}
              </p>
            </div>
            <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          💡 Conseil du jour
        </h2>
        <p className="text-gray-700">
          Commencez par ajouter vos événements importants dans le module "Événements & Rappels" 
          pour ne rien oublier. Vous pouvez ensuite explorer les autres modules selon vos besoins.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;