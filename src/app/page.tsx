import { getAllAnalyses } from '@/lib/db';
import { CompetitiveAnalysis } from '@/lib/db';
import { XCircle, BarChart3, Clock, CheckCircle, CreditCard, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {
  let analyses: CompetitiveAnalysis[] = [];
  let error: string | null = null;

  try {
    analyses = await getAllAnalyses();
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch data';
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#00205B] text-white py-8 px-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">O2 Competitive Analysis Dashboard</h1>
          <p className="text-blue-100">
            Comprehensive insights into market positioning, competitive landscapes, and strategic opportunities
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Database Connection Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        {analyses.length === 0 && !error && (
          <div className="text-center py-16">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <BarChart3 className="h-24 w-24" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Data</h3>
            <p className="text-gray-500">Run the backend scraper to generate competitive analysis data.</p>
          </div>
        )}

        <div className="grid gap-6">
          {analyses.map((analysis) => (
            <div key={analysis.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-[#00205B] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {analysis.id.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        Analysis #{analysis.id.slice(0, 8)}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {new Date(analysis.created_at).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  {/* <div className="text-right">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                      Active
                    </span>
                  </div> */}
                </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Clock className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Analysis Date</p>
                      <p className="text-lg font-bold text-gray-900">
                        {new Date(analysis.analysis_timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Sentiment Count</p>
                      <p className="text-lg font-bold text-gray-900">
                        {analysis.overall_competitive_sentiments?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <CreditCard className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">O2 Products</p>
                      <p className="text-lg font-bold text-gray-900">
                        {analysis.o2_products_analysis?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BarChart3 className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Plans</p>
                      <p className="text-lg font-bold text-gray-900">
                        {analysis.full_competitive_dataset_all_plans?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Avg Score:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium">
                      {analysis.overall_competitive_sentiments?.length > 0
                        ? Math.round(analysis.overall_competitive_sentiments.reduce((sum, s) => sum + s.score, 0) / analysis.overall_competitive_sentiments.length)
                        : 'N/A'
                      }
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Currency:</span>
                    <span className="font-medium">{analysis.currency}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">LLM used:</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium">
                      {analysis.llm_provider}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/analysis/${analysis.id}`}
                  className="inline-flex items-center px-6 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                >
                  View Analysis
                  <ArrowRight className="ml-2 -mr-1 w-4 h-4" />
                </Link>
              </div>
            </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
