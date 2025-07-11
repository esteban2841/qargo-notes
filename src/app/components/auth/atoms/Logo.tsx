import { Coffee } from 'lucide-react';

interface LogoProps {
    className?: string,
}

export const Logo = ({ className = '' }: LogoProps) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center">
      <Coffee className="w-5 h-5 text-white" />
    </div>
    <span className="text-xl font-bold text-white">QargoNotes</span>
  </div>
);