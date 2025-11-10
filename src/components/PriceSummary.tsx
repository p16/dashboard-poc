'use client';

import { O2ProductAnalysis } from '@/lib/db';
import { DollarSign, TrendingDown, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PriceSummaryProps {
  products: O2ProductAnalysis[];
  analysisId: string;
}

export default function PriceSummaryComponent({ products, analysisId }: PriceSummaryProps) {
  const productsWithSuggestions = products.filter(product =>
    product.price_suggestions && product.price_suggestions.length > 0
  );

  if (productsWithSuggestions.length === 0) {
    return null;
  }

  const totalCurrentRevenue = productsWithSuggestions.reduce((sum, product) =>
    sum + product.product_breakdown.price_per_month_GBP, 0
  );

  const averageSuggestedPrice = productsWithSuggestions.reduce((sum, product) => {
    const avgSuggested = product.price_suggestions!.reduce((suggSum, sugg) =>
      suggSum + sugg.price, 0
    ) / product.price_suggestions!.length;
    return sum + avgSuggested;
  }, 0);

  const potentialSavings = totalCurrentRevenue - averageSuggestedPrice;
  const savingsPercentage = ((potentialSavings / totalCurrentRevenue) * 100).toFixed(1);

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl shadow-lg border-2 border-green-200 p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
            <Target className="h-8 w-8 text-white" />
          </div>
          <div className="ml-4">
            <h2 className="text-3xl font-bold text-gray-900">Pricing Optimization Overview</h2>
            <p className="text-green-700 font-medium text-lg">Strategic pricing recommendations across your portfolio</p>
          </div>
        </div>

        {potentialSavings > 0 && (
          <div className="text-right bg-white rounded-lg p-4 shadow-sm border border-green-200">
            <div className="text-sm text-gray-600">Portfolio Impact</div>
            <div className="text-2xl font-bold text-green-600 flex items-center">
              <TrendingDown className="h-6 w-6 mr-1" />
              {savingsPercentage}% reduction
            </div>
            <div className="text-sm text-gray-700">Average suggested vs. current</div>
          </div>
        )}
      </div>

      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productsWithSuggestions.map((product, index) => {
            const bestSuggestion = product.price_suggestions!.reduce((best, current) =>
              current.price < best.price ? current : best
            );
            const currentPrice = product.product_breakdown.price_per_month_GBP;
            const savings = currentPrice - bestSuggestion.price;
            const productIndex = products.findIndex(p => p.product_name === product.product_name);

            return (
              <Link
                key={index}
                href={`/analysis/${analysisId}/product/${productIndex}`}
                className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md hover:border-green-300 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors mb-1 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {product.product_name}
                    </h3>
                    <div className="text-xs text-gray-500 mb-2">
                      {product.data_tier} • {product.roaming_tier}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current:</span>
                    <span className="font-semibold text-gray-900">£{currentPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Suggested:</span>
                    <span className="font-semibold text-green-600">£{bestSuggestion.price.toFixed(2)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-green-700">Potential reduction:</span>
                        <span className="font-semibold text-green-700">
                          -£{savings.toFixed(2)} ({((savings/currentPrice)*100).toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="text-xs text-gray-600 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {bestSuggestion.motivation}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <DollarSign className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800 font-medium mb-1">
                Portfolio Analysis Summary
              </p>
              <p className="text-sm text-blue-700">
                {productsWithSuggestions.length} products have pricing optimization opportunities.
                Click on any product above to view detailed pricing strategies and competitive rationale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
