import { getAnalysisById } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ChangeIcon from '@/components/ChangeIcon';
import InsightIcon from '@/components/InsightIcon';
import PriceSuggestionsComponent from '@/components/PriceSuggestions';
import { ArrowLeft, Zap, Lightbulb } from 'lucide-react';

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
    productIndex: string;
  }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { id, productIndex } = await params;
  const analysis = await getAnalysisById(id);

  if (!analysis) {
    notFound();
  }

  const productIdx = parseInt(productIndex);
  const product = analysis.o2_products_analysis?.[productIdx];

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#00205B] text-white py-8 px-6 shadow-md">
        <div className="max-w-7xl mx-auto">
          <Link href={`/analysis/${id}`} className="inline-flex items-center text-blue-100 hover:text-white text-sm font-medium mb-4 group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Analysis
          </Link>
          <h1 className="text-3xl font-bold mb-2">{product.product_name}</h1>
          <p className="text-blue-100">
            Product Analysis & Competitive Intelligence
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">

          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {product.product_name}
                </h1>
                <div className="flex gap-4 text-sm text-gray-600 mt-2">
                  <span>Data Tier: {product.data_tier}</span>
                  <span>Roaming: {product.roaming_tier}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  £{product.product_breakdown.price_per_month_GBP}/month
                </div>
                <div className="text-sm text-gray-500">
                  Score: {product.product_breakdown.competitiveness_score}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Suggestions - Most Prominent Section */}
        {product.price_suggestions && product.price_suggestions.length > 0 && (
          <div className="mb-8">
            <PriceSuggestionsComponent
              suggestions={product.price_suggestions}
              currentPrice={product.product_breakdown.price_per_month_GBP}
            />
          </div>
        )}

        <div className="grid gap-8">
          {/* Side by Side: Recommended Changes and Key Insights */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Recommended Changes */}
            {product.o2_product_changes && product.o2_product_changes.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Zap className="mr-3 h-6 w-6 text-green-600" />
                  Recommended Changes
                  <span className="ml-3 text-sm font-normal text-gray-500">({product.o2_product_changes.length})</span>
                </h2>
                <div className="grid gap-6">
                  {product.o2_product_changes.map((change, changeIndex) => {
                    return (
                      <div key={changeIndex} className="rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-200">
                              <ChangeIcon changeText={change} />
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-900 font-medium leading-relaxed">
                              {change}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Key Insights */}
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Lightbulb className="mr-3 h-6 w-6 text-blue-600" />
                Key Insights & Analysis
                <span className="ml-3 text-sm font-normal text-gray-500">({product.o2_product_sentiments.length})</span>
              </h2>
              <div className="grid gap-6">
                {product.o2_product_sentiments.map((sentiment, sentIndex) => {
                  return (
                    <div key={sentIndex} className="rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-gray-200">
                            <InsightIcon insightText={sentiment} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 font-medium leading-relaxed">
                            {sentiment}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 mb-1">{product.product_breakdown.data}GB</div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Data Allowance</div>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-gray-900 mb-1">£{product.product_breakdown.price_per_month_GBP}</div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Monthly Cost</div>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="text-lg font-bold text-gray-900 mb-1">{product.product_breakdown.roaming}</div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Roaming</div>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <div className="text-lg font-bold text-gray-900 mb-1">{product.product_breakdown.speed}</div>
                <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Network Speed</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 uppercase tracking-wide text-sm">Additional Features</h3>
                <p className="text-gray-700 leading-relaxed">{product.product_breakdown.extras}</p>
              </div>
              <div className="p-6 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3 uppercase tracking-wide text-sm">Product Notes</h3>
                <p className="text-gray-700 leading-relaxed">{product.product_breakdown.notes}</p>
              </div>
            </div>
          </div>

          {/* Top Competitors */}
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Competitors</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Brand</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Contract</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Data</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Roaming</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Speed</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Price/Month</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {product.comparable_products.sort((a, b) => b.competitiveness_score - a.competitiveness_score).slice(0, 5).map((comp, compIndex) => (
                    <tr key={compIndex} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4 font-semibold text-gray-900">{comp.brand}</td>
                      <td className="py-4 px-4">
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{comp.contract}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{comp.data}GB</td>
                      <td className="py-4 px-4 text-gray-700">{comp.roaming}</td>
                      <td className="py-4 px-4 text-gray-700">{comp.speed}</td>
                      <td className="py-4 px-4 font-bold text-gray-900">£{comp.price_per_month_GBP}</td>
                      <td className="py-4 px-4 text-gray-700">{comp.competitiveness_score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
