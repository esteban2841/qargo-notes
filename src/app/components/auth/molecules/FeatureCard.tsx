

export const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300">
    <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-amber-400" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);