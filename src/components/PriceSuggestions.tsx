'use client';

import { PriceSuggestion } from '@/lib/db';
import { DollarSign, TrendingDown, Target, CheckCircle } from 'lucide-react';

interface PriceSuggestionsProps {
  suggestions: PriceSuggestion[];
  currentPrice: number;
}

export default function PriceSuggestionsComponent({ suggestions, currentPrice }: PriceSuggestionsProps) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  const calculateSavings = (suggestedPrice: number) => {
    const savings = currentPrice - suggestedPrice;
    const percentage = ((savings / currentPrice) * 100).toFixed(1);
    return { amount: savings, percentage };
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg border-2 border-green-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
            <Target className="h-6 w-6 text-white" />
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-900">Recommended Pricing Strategy</h2>
            <p className="text-green-700 font-medium">Competitive positioning suggestions</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-600">Current Price</div>
          <div className="text-2xl font-bold text-gray-900">£{currentPrice.toFixed(2)}</div>
        </div>
      </div>

      <div className="grid gap-6">
        {suggestions.map((suggestion, index) => {
          const savings = calculateSavings(suggestion.price);
          const isSignificantChange = Math.abs(savings.amount) >= 1;

          return (
            <div
              key={index}
              className={`bg-white rounded-xl border-2 p-6 shadow-sm hover:shadow-md transition-all duration-300 ${
                suggestion.price < currentPrice
                  ? 'border-green-300 hover:border-green-400'
                  : 'border-blue-300 hover:border-blue-400'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                      suggestion.price < currentPrice
                        ? 'bg-green-100 text-green-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {suggestion.price < currentPrice ? <TrendingDown className="h-4 w-4" /> : <DollarSign className="h-4 w-4" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Suggested Price: £{suggestion.price.toFixed(2)}
                      </h3>
                      {isSignificantChange && (
                        <div className={`text-sm font-medium ${
                          savings.amount > 0 ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {savings.amount > 0 ? '↓' : '↑'} £{Math.abs(savings.amount).toFixed(2)} ({Math.abs(parseFloat(savings.percentage))}%)
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1 text-gray-600" />
                      Strategic Rationale
                    </h4>
                    <p className="text-gray-800 leading-relaxed">{suggestion.motivation}</p>
                  </div>

                  {isSignificantChange && (
                    <div className="flex items-center justify-between text-sm">
                      <div className={`px-3 py-1 rounded-full font-medium ${
                        suggestion.price < currentPrice
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {suggestion.price < currentPrice ? 'Price Reduction' : 'Premium Positioning'}
                      </div>
                      {suggestion.price < currentPrice && (
                        <div className="text-green-600 font-semibold">
                          Potential monthly savings for customers: £{savings.amount.toFixed(2)}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="ml-6 text-right">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    £{suggestion.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">per month</div>
                  {isSignificantChange && (
                    <div className={`mt-2 px-2 py-1 rounded text-xs font-medium ${
                      suggestion.price < currentPrice
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {suggestion.price < currentPrice ? `${savings.percentage}% lower` : `${Math.abs(parseFloat(savings.percentage))}% higher`}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {suggestions.length > 1 && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-blue-600 mr-2" />
            <p className="text-sm text-blue-800 font-medium">
              Multiple pricing strategies available based on different competitive positioning goals.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
