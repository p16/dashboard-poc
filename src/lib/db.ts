import { Client } from 'pg';

const client = new Client({
  connectionString: (
    process.env.DATABASE_URL ||
    process.env.NEON_DATABASE_URL ||
    'postgresql://postgres:postgres@localhost:5432/scraping_compare'
  ),
  ssl: (process.env.DATABASE_URL?.includes('sslmode=require') || process.env.NEON_DATABASE_URL?.includes('sslmode=require'))
    ? { rejectUnauthorized: false }
    : false
});

let isConnected = false;

export async function connectDB() {
  if (!isConnected) {
    await client.connect();
    isConnected = true;
  }
  return client;
}

export async function disconnectDB() {
  if (isConnected) {
    await client.end();
    isConnected = false;
  }
}

export interface SentimentData {
  sentiment: string;
  score: number;
  rationale: string;
}

export interface ProductBreakdown {
  brand: string;
  contract: string;
  data: string;
  roaming: string;
  price_per_month_GBP: number;
  extras: string;
  speed: string;
  notes: string;
  competitiveness_score: number;
  source_URL?: string;
}

export interface O2ProductAnalysis {
  product_name: string;
  data_tier: string;
  roaming_tier: string;
  product_breakdown: ProductBreakdown;
  comparable_products: ProductBreakdown[];
  o2_product_sentiments: string[];
  o2_product_changes: string[];
}

export interface FullDatasetPlan {
  brand: string;
  contract: string;
  data: string;
  roaming: string;
  price_per_month_GBP: number;
  extras: string;
  speed: string;
  notes: string;
  competitiveness_score: number;
  source_URL?: string;
}

export interface CompetitiveAnalysis {
  id: string;
  analysis_timestamp: string;
  currency: string;
  llm_provider: string;
  overall_competitive_sentiments: SentimentData[];
  o2_products_analysis: O2ProductAnalysis[];
  full_competitive_dataset_all_plans: FullDatasetPlan[];
  created_at: string;
  updated_at: string;
}

export async function getAllAnalyses(): Promise<CompetitiveAnalysis[]> {
  const db = await connectDB();
  const result = await db.query('SELECT * FROM competitive_analysis ORDER BY created_at DESC');
  return result.rows;
}

export async function getAnalysisById(id: string): Promise<CompetitiveAnalysis | null> {
  const db = await connectDB();
  const result = await db.query('SELECT * FROM competitive_analysis WHERE id = $1', [id]);
  return result.rows[0] || null;
}
