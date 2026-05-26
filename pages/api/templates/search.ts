import { NextRequest, NextResponse } from 'next/server';

// Mock template database
const templates = [
  {
    id: '1',
    name: 'AI CRM Starter',
    description: 'Manage leads, pipeline and customer relationships with AI',
    category: 'business',
    difficulty: 'easy',
    rating: 4.8,
    uses: 2400,
    tags: ['crm', 'sales', 'ai'],
  },
  {
    id: '2',
    name: 'Content Platform',
    description: 'AI content generation and publishing apps',
    category: 'media',
    difficulty: 'medium',
    rating: 4.9,
    uses: 1890,
    tags: ['content', 'ai', 'publishing'],
  },
  {
    id: '3',
    name: 'Task Dashboard',
    description: 'Streamline workflows and processes with AI automation',
    category: 'productivity',
    difficulty: 'easy',
    rating: 4.7,
    uses: 3200,
    tags: ['tasks', 'workflow', 'dashboard'],
  },
];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q')?.toLowerCase() || '';
  const category = searchParams.get('category') || 'all';

  let results = templates;

  // Filter by search query
  if (query) {
    results = results.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.tags.some((tag) => tag.includes(query))
    );
  }

  // Filter by category
  if (category !== 'all') {
    results = results.filter((t) => t.category === category);
  }

  return NextResponse.json({
    success: true,
    data: results,
    count: results.length,
  });
}