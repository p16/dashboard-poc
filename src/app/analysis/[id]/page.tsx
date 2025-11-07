import { getAnalysisById } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle,
  BarChart3,
  Clock,
  Smartphone,
  Database,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  Info,
  Download,
  Zap,
  Phone,
  Globe,
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Shield,
  Award,
  Wifi,
  MapPin,
  Star,
  Building,
  Briefcase,
  PieChart
} from 'lucide-react';

interface AnalysisPageProps {
  params: Promise<{
    id: string;
  }>;
}

const getSentimentIcon = (sentiment: string, score: number) => {
  const lowerSentiment = sentiment.toLowerCase();

  // Content-based icon selection
  if (lowerSentiment.includes('price') || lowerSentiment.includes('cost') || lowerSentiment.includes('pricing') || lowerSentiment.includes('£')) {
    return DollarSign;
  }
  if (lowerSentiment.includes('customer') || lowerSentiment.includes('user') || lowerSentiment.includes('satisfaction') || lowerSentiment.includes('experience')) {
    return Users;
  }
  if (lowerSentiment.includes('market') || lowerSentiment.includes('position') || lowerSentiment.includes('competitive') || lowerSentiment.includes('competition')) {
    return Target;
  }
  if (lowerSentiment.includes('network') || lowerSentiment.includes('coverage') || lowerSentiment.includes('5g') || lowerSentiment.includes('4g')) {
    return Wifi;
  }
  if (lowerSentiment.includes('data') || lowerSentiment.includes('gb') || lowerSentiment.includes('allowance') || lowerSentiment.includes('usage')) {
    return Database;
  }
  if (lowerSentiment.includes('roaming') || lowerSentiment.includes('international') || lowerSentiment.includes('travel')) {
    return MapPin;
  }
  if (lowerSentiment.includes('brand') || lowerSentiment.includes('reputation') || lowerSentiment.includes('trust') || lowerSentiment.includes('quality')) {
    return Award;
  }
  if (lowerSentiment.includes('security') || lowerSentiment.includes('privacy') || lowerSentiment.includes('protection')) {
    return Shield;
  }
  if (lowerSentiment.includes('business') || lowerSentiment.includes('enterprise') || lowerSentiment.includes('corporate')) {
    return Briefcase;
  }
  if (lowerSentiment.includes('performance') || lowerSentiment.includes('speed') || lowerSentiment.includes('efficiency')) {
    return Zap;
  }
  if (lowerSentiment.includes('analytics') || lowerSentiment.includes('metrics') || lowerSentiment.includes('analysis')) {
    return PieChart;
  }
  if (lowerSentiment.includes('rating') || lowerSentiment.includes('review') || lowerSentiment.includes('feedback')) {
    return Star;
  }
  if (lowerSentiment.includes('infrastructure') || lowerSentiment.includes('facility') || lowerSentiment.includes('office')) {
    return Building;
  }

  // Fallback to score-based icons if no content match
  if (score > 70) {
    return AlertTriangle;
  } else if (score > 50) {
    return Info;
  } else {
    return CheckCircle;
  }
};

export default async function AnalysisPage({ params }: AnalysisPageProps) {
  const { id } = await params;
  const analysis = await getAnalysisById(id);

  if (!analysis) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#00205B] text-white py-8 px-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center text-blue-100 hover:text-white text-sm font-medium mb-4 group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-2">Analysis #{analysis.id.slice(0, 8)}</h1>
          <p className="text-blue-100">
            Competitive Analysis & Market Intelligence Dashboard
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Analysis Overview */}
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-700 font-bold text-lg">
                  {analysis.id.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-gray-600 mt-1">
                  Created {new Date(analysis.created_at).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })} using {analysis.llm_provider}, currency {analysis.currency}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Competitive Sentiments */}
          <div className="bg-gradient-to-br from-white to-gray-50 shadow-lg rounded-xl p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Lightbulb className="mr-3 h-6 w-6" />
              Market Insights & Competitive Sentiments
              <span className="ml-3 text-sm font-normal text-gray-500">({analysis.overall_competitive_sentiments?.length || 0} insights)</span>
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {analysis.overall_competitive_sentiments?.sort((a, b) => b.score - a.score).map((sentiment, index) => {
                const IconComponent = getSentimentIcon(sentiment.sentiment, sentiment.score);
                return (
                  <div key={index} className={`p-6 rounded-xl border-2 transition-all hover:shadow-md border-gray-300`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <IconComponent className={`w-5 h-5 mr-2 ${
                          sentiment.score > 70
                            ? 'text-red-600'
                            : sentiment.score > 50
                            ? 'text-yellow-600'
                            : 'text-green-600'
                        }`} />
                        <h3 className="font-semibold text-gray-900">{sentiment.sentiment}</h3>
                      </div>
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                        sentiment.score > 70
                          ? 'bg-red-200 text-red-800'
                          : sentiment.score > 50
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-green-200 text-green-800'
                      }`}>
                        {sentiment.score}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{sentiment.rationale}</p>
                  </div>
                );
              })}
            </div>
          </div>


          {/* O2 Products Analysis */}
          <div className="bg-white shadow-sm rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              O2 Products Analysis ({analysis.o2_products_analysis?.length || 0})
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {analysis.o2_products_analysis
                ?.map((product, originalIndex) => ({ product, originalIndex }))
                ?.sort((a, b) => a.product.product_breakdown.competitiveness_score - b.product.product_breakdown.competitiveness_score)
                ?.map(({ product, originalIndex }) => (
                <Link key={originalIndex} href={`/analysis/${id}/product/${originalIndex}`} className="group">
                  <div className="bg-white rounded-lg border border-gray-300 p-6 hover:border-gray-400 hover:shadow-md transition-all duration-200">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {product.product_name}
                      </h3>
                      {/* Competitiveness Score - Aligned with title */}
                      <span className={`text-sm font-bold px-3 py-1 rounded-md border ${
                        product.product_breakdown.competitiveness_score > 70
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : product.product_breakdown.competitiveness_score > 50
                          ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {product.product_breakdown.competitiveness_score}
                      </span>
                    </div>

                    {/* Key Features */}
                    <div className="space-y-3 mb-6">
                      {/* Price */}
                      <div className="flex items-center text-sm">
                        <DollarSign className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="font-medium text-gray-700 mr-2">Price:</span>
                        <span className="text-gray-900 font-semibold">£{product.product_breakdown.price_per_month_GBP}/month</span>
                      </div>

                      {/* Data */}
                      <div className="flex items-center text-sm">
                        <Download className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="font-medium text-gray-700 mr-2">Data:</span>
                        <span className="text-gray-900">{product.product_breakdown.data}GB</span>
                      </div>

                      {/* Speed */}
                      <div className="flex items-center text-sm">
                        <Zap className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="font-medium text-gray-700 mr-2">Speed:</span>
                        <span className="text-gray-900">{product.product_breakdown.speed}</span>
                      </div>

                      {/* Calls & Texts */}
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="font-medium text-gray-700 mr-2">Calls & Texts:</span>
                        <span className="text-gray-900">Unlimited</span>
                      </div>

                      {/* Roaming */}
                      <div className="flex items-center text-sm">
                        <Globe className="w-4 h-4 text-gray-500 mr-2" />
                        <span className="font-medium text-gray-700 mr-2">Roaming:</span>
                        <span className="text-gray-900">{product.roaming_tier}</span>
                      </div>

                      {/* Extras
                      <div className="flex items-center text-sm">
                        <svg className="w-4 h-4 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                        </svg>
                        <span className="font-medium mr-1">Extras:</span>
                        <span>{product.product_breakdown.notes || 'Standard features'}</span>
                      </div> */}
                    </div>

                    {/* Top Competitors */}
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                        <TrendingUp className="w-3 h-3 text-gray-500 mr-1" />
                        Top Competitors ({product.comparable_products.length})
                      </h4>
                      <div className="space-y-1">
                        {product.comparable_products.sort((a, b) => b.competitiveness_score - a.competitiveness_score).slice(0, 2).map((comp, compIndex) => (
                          <div key={compIndex} className="text-xs bg-gray-50 rounded p-2 border border-gray-200">
                            <div className="flex justify-between">
                              <span className="font-medium text-gray-900">{comp.brand}</span>
                              <span className="text-gray-700">£{comp.price_per_month_GBP}/mo</span>
                            </div>
                            <div className="text-gray-600">{comp.data}GB • Score: {comp.competitiveness_score}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                        <Lightbulb className="w-3 h-3 text-gray-500 mr-1" />
                        Key Insights
                      </h4>
                      <div className="text-xs text-gray-600 space-y-1">
                        {product.o2_product_sentiments.slice(0, 2).map((sentiment, sentIndex) => (
                          <div key={sentIndex} className="flex items-start">
                            <span className="text-gray-400 mr-1 mt-0.5">•</span>
                            <span>{sentiment}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* View Details Arrow */}
                    <div className="flex items-center justify-center mt-4 text-gray-600 group-hover:text-gray-900">
                      <span className="text-sm font-medium">View Details</span>
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

           {/* Overview Stats */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <BarChart3 className="mr-3 h-6 w-6 text-blue-600" />
                Analysis Overview
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Clock className="h-8 w-8 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Analysis Date</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {new Date(analysis.analysis_timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-8 w-8 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Sentiment Count</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analysis.overall_competitive_sentiments?.length || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Smartphone className="h-8 w-8 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">O2 Products</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analysis.o2_products_analysis?.length || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 p-6 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BarChart3 className="h-8 w-8 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Plans</p>
                    <p className="text-2xl font-bold text-orange-800">
                      {analysis.full_competitive_dataset_all_plans?.length || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View Full Dataset Link */}
          <div className="bg-white shadow-sm rounded-lg p-8 border border-gray-200 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Complete Competitive Analysis
            </h2>
            <p className="text-gray-600 mb-8">
              View the full competitive dataset with all {analysis.full_competitive_dataset_all_plans?.length || 0} analyzed plans from all competitors
            </p>
            <Link
              href={`/analysis/${id}/dataset`}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-colors"
            >
              <Database className="w-5 h-5 mr-2" />
              View Full Dataset
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
