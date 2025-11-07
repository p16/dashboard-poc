import {
  Sparkles,
  AlertTriangle,
  DollarSign,
  BarChart3,
  TrendingUp,
  Users,
  Info
} from 'lucide-react';

export default function InsightIcon({ insightText }: { insightText: string }) {
  const lowerInsight = insightText.toLowerCase();

  if (lowerInsight.includes('competitive') || lowerInsight.includes('advantage') || lowerInsight.includes('better') || lowerInsight.includes('superior')) {
    return <Sparkles className="w-6 h-6 text-red-600" />;
  }

  if (lowerInsight.includes('weak') || lowerInsight.includes('challenge') || lowerInsight.includes('behind') || lowerInsight.includes('disadvantage') || lowerInsight.includes('poor')) {
    return <AlertTriangle className="w-6 h-6 text-red-600" />;
  }

  if (lowerInsight.includes('price') || lowerInsight.includes('cost') || lowerInsight.includes('expensive') || lowerInsight.includes('affordable') || lowerInsight.includes('£')) {
    return <DollarSign className="w-6 h-6 text-green-600" />;
  }

  if (lowerInsight.includes('data') || lowerInsight.includes('gb') || lowerInsight.includes('allowance') || lowerInsight.includes('usage')) {
    return <BarChart3 className="w-6 h-6 text-blue-600" />;
  }

  if (lowerInsight.includes('market') || lowerInsight.includes('position') || lowerInsight.includes('share') || lowerInsight.includes('segment')) {
    return <TrendingUp className="w-6 h-6 text-indigo-600" />;
  }

  if (lowerInsight.includes('customer') || lowerInsight.includes('user') || lowerInsight.includes('experience') || lowerInsight.includes('satisfaction')) {
    return <Users className="w-6 h-6 text-orange-600" />;
  }

  // Default insight icon
  return <Info className="w-6 h-6 text-blue-600" />;
};
