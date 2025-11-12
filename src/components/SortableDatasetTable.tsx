'use client';

import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, X } from 'lucide-react';
import { FullDatasetPlan } from '@/lib/db';
import { extractSourceName } from '@/lib/utils';

type SortField = 'brand' | 'contract' | 'data' | 'roaming' | 'speed' | 'price' | 'score';
type SortDirection = 'asc' | 'desc' | null;

interface Filters {
  brand: string;
  contract: string;
  data: string;
  roaming: string;
  speed: string;
  priceMin: string;
  priceMax: string;
}

interface SortableDatasetTableProps {
  plans: FullDatasetPlan[];
}

export default function SortableDatasetTable({ plans }: SortableDatasetTableProps) {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [filters, setFilters] = useState<Filters>({
    brand: '',
    contract: '',
    data: '',
    roaming: '',
    speed: '',
    priceMin: '',
    priceMax: '',
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortDirection(null);
        setSortField(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleFilterChange = (field: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const clearFilters = () => {
    setFilters({
      brand: '',
      contract: '',
      data: '',
      roaming: '',
      speed: '',
      priceMin: '',
      priceMax: '',
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  const filteredPlans = useMemo(() => {
    return plans.filter(plan => {
      if (filters.brand && !plan.brand.toLowerCase().includes(filters.brand.toLowerCase())) {
        return false;
      }
      if (filters.contract && !plan.contract.toLowerCase().includes(filters.contract.toLowerCase())) {
        return false;
      }
      if (filters.data && !plan.data.toLowerCase().includes(filters.data.toLowerCase())) {
        return false;
      }
      if (filters.roaming && !plan.roaming.toLowerCase().includes(filters.roaming.toLowerCase())) {
        return false;
      }
      if (filters.speed && !plan.speed.toLowerCase().includes(filters.speed.toLowerCase())) {
        return false;
      }
      if (filters.priceMin && plan.price_per_month_GBP < parseFloat(filters.priceMin)) {
        return false;
      }
      if (filters.priceMax && plan.price_per_month_GBP > parseFloat(filters.priceMax)) {
        return false;
      }
      return true;
    });
  }, [plans, filters]);

  const sortedPlans = useMemo(() => {
    if (!sortField || !sortDirection) return filteredPlans;

    return [...filteredPlans].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'brand':
          aValue = a.brand.toLowerCase();
          bValue = b.brand.toLowerCase();
          break;
        case 'contract':
          aValue = a.contract.toLowerCase();
          bValue = b.contract.toLowerCase();
          break;
        case 'data':
          // Extract numeric value from data string (e.g., "100GB" -> 100, "Unlimited" -> Infinity)
          aValue = a.data.toLowerCase().includes('unlimited') ? Infinity : parseFloat(a.data) || 0;
          bValue = b.data.toLowerCase().includes('unlimited') ? Infinity : parseFloat(b.data) || 0;
          break;
        case 'roaming':
          aValue = a.roaming.toLowerCase();
          bValue = b.roaming.toLowerCase();
          break;
        case 'speed':
          aValue = a.speed.toLowerCase();
          bValue = b.speed.toLowerCase();
          break;
        case 'price':
          aValue = a.price_per_month_GBP;
          bValue = b.price_per_month_GBP;
          break;
        case 'score':
          aValue = a.competitiveness_score;
          bValue = b.competitiveness_score;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredPlans, sortField, sortDirection]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ChevronsUpDown className="w-4 h-4 text-gray-400" />;
    }
    if (sortDirection === 'asc') {
      return <ChevronUp className="w-4 h-4 text-blue-600" />;
    }
    return <ChevronDown className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div>
      {/* Filter Controls */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <input
            type="text"
            placeholder="Brand..."
            value={filters.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Contract..."
            value={filters.contract}
            onChange={(e) => handleFilterChange('contract', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Data..."
            value={filters.data}
            onChange={(e) => handleFilterChange('data', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Roaming..."
            value={filters.roaming}
            onChange={(e) => handleFilterChange('roaming', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Speed..."
            value={filters.speed}
            onChange={(e) => handleFilterChange('speed', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-1">
            <input
              type="number"
              placeholder="Min £"
              value={filters.priceMin}
              onChange={(e) => handleFilterChange('priceMin', e.target.value)}
              className="w-1/2 px-2 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Max £"
              value={filters.priceMax}
              onChange={(e) => handleFilterChange('priceMax', e.target.value)}
              className="w-1/2 px-2 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-600">
          Showing {sortedPlans.length} of {plans.length} plans
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th
                className="text-left py-3 px-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => handleSort('brand')}
              >
                <div className="flex items-center gap-2">
                  Brand
                  <SortIcon field="brand" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => handleSort('contract')}
              >
                <div className="flex items-center gap-2">
                  Contract
                  <SortIcon field="contract" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => handleSort('data')}
              >
                <div className="flex items-center gap-2">
                  Data
                  <SortIcon field="data" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => handleSort('roaming')}
              >
                <div className="flex items-center gap-2">
                  Roaming
                  <SortIcon field="roaming" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => handleSort('speed')}
              >
                <div className="flex items-center gap-2">
                  Speed
                  <SortIcon field="speed" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center gap-2">
                  Price/Month
                  <SortIcon field="price" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 font-semibold text-gray-900 cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => handleSort('score')}
              >
                <div className="flex items-center gap-2">
                  Score
                  <SortIcon field="score" />
                </div>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Extras</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Notes</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Source</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlans.map((plan, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-900">{plan.brand}</td>
                <td className="py-4 px-4">
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{plan.contract}</span>
                </td>
                <td className="py-4 px-4 text-gray-700">{plan.data}</td>
                <td className="py-4 px-4 text-gray-700">{plan.roaming}</td>
                <td className="py-4 px-4 text-gray-700">{plan.speed}</td>
                <td className="py-4 px-4 font-bold text-gray-900">£{plan.price_per_month_GBP}</td>
                <td className="py-4 px-4 text-gray-700">{plan.competitiveness_score}</td>
                <td className="py-4 px-4 text-gray-600 text-sm">{plan.extras || 'None'}</td>
                <td className="py-4 px-4 text-gray-600 text-sm max-w-xs truncate" title={plan.notes}>{plan.notes}</td>
                <td className="py-4 px-4 text-gray-600 text-sm capitalize">{extractSourceName(plan.source)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
