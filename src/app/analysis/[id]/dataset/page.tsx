import { getAnalysisById } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SortableDatasetTable from '@/components/SortableDatasetTable';

// Force dynamic rendering and disable caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface CompetitiveDatasetPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CompetitiveDatasetPage({ params }: CompetitiveDatasetPageProps) {
  const { id } = await params;
  const analysis = await getAnalysisById(id);

  if (!analysis) {
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
          <h1 className="text-3xl font-bold mb-2">Dataset Analysis #{analysis.id.slice(0, 8)}</h1>
          <p className="text-blue-100">
            Complete Dataset & Raw Data Analysis
          </p>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="mb-8">

          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Full Competitive Dataset
                </h1>
                <p className="text-gray-600 mt-1">
                  Complete overview of all {analysis.full_competitive_dataset_all_plans?.length || 0} plans analyzed
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {analysis.llm_provider}
                </span>
                <span className="text-sm text-gray-500">
                  {analysis.currency}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full Dataset */}
        <div className="bg-white shadow-sm rounded-lg p-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            All Plans by Provider ({analysis.full_competitive_dataset_all_plans?.length || 0} plans)
          </h2>
          <SortableDatasetTable plans={analysis.full_competitive_dataset_all_plans || []} />
        </div>
      </main>
    </div>
  );
}
