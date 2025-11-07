import {
  DollarSign,
  Download,
  Zap,
  Globe,
  Plus,
  BarChart3,
  Lightbulb
} from 'lucide-react';

export default function ChangeIcon({ changeText }: { changeText: string }) {
  const lowerChange = changeText.toLowerCase();

  if (lowerChange.includes('price') || lowerChange.includes('cost') || lowerChange.includes('£')) {
    return <DollarSign className="w-6 h-6 text-green-600" />;
  }

  if (lowerChange.includes('data') || lowerChange.includes('gb') || lowerChange.includes('allowance')) {
    return <Download className="w-6 h-6 text-indigo-600" />;
  }

  if (lowerChange.includes('speed') || lowerChange.includes('5g') || lowerChange.includes('4g') || lowerChange.includes('network')) {
    return <Zap className="w-6 h-6 text-purple-600" />;
  }

  if (lowerChange.includes('roaming') || lowerChange.includes('international') || lowerChange.includes('travel')) {
    return <Globe className="w-6 h-6 text-orange-600" />;
  }

  if (lowerChange.includes('feature') || lowerChange.includes('add') || lowerChange.includes('include') || lowerChange.includes('extra')) {
    return <Plus className="w-6 h-6 text-green-600" />;
  }

  if (lowerChange.includes('market') || lowerChange.includes('position') || lowerChange.includes('competitive')) {
    return <BarChart3 className="w-6 h-6 text-red-600" />;
  }

  // Default icon for general improvements
  return <Lightbulb className="w-6 h-6 text-blue-600" />;
};

