'use client';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from './ui/button';
import { AspectRatio } from './ui/aspect-ratio';
import { Calendar } from 'lucide-react';
import PaginationComponent from './PaginationComponent';

// Define the type for the articles (GNews API)
type TopHeadlines = {
	title: string;
	description: string;
	url: string;
	image: string;
	content: string;
	publishedAt: string;
	source: {
		name: string;
		url: string;
	};
};

type TopHeadingProps = {
	category: string;
};

const fetchTopHeadlines = async (
	category: string,
	page: number,
): Promise<{ articles: TopHeadlines[]; totalArticles: number }> => {
	const res = await fetch(
		`https://gnews.io/api/v4/top-headlines?q=${category}&lang=en&country=us&max=9&page=${page}&apikey=8f9b746d8684e15b399b81a8a240744b`,
	);
	if (!res.ok) {
		throw new Error('Failed to fetch top headlines');
	}
	return res.json();
};

const TopHeading: React.FC<TopHeadingProps> = ({ category }) => {
	const [currentPage, setCurrentPage] = useState(1);

	const { isLoading, error, data } = useQuery({
		queryKey: ['topHeadlines', category, currentPage],
		queryFn: () => fetchTopHeadlines(category, 2),
	});

	if (isLoading) return <div>Loading...</div>;
	if (error instanceof Error) return <div>Error: {error.message}</div>;

	const totalPages = Math.ceil((data?.totalArticles ?? 0) / 9); // Adjust the divisor based on your results per page

	console.log(data, totalPages, currentPage);

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold my-6'>Top Headlines - {category.toUpperCase()}</h1>
			<p>Total Articles: {data?.totalArticles ?? ''}</p>
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{data?.articles?.map((article, index) => (
					<Card key={index}>
						<CardHeader>
							<CardTitle>{article.title}</CardTitle>
						</CardHeader>
						<CardContent className='justify-between'>
							<AspectRatio ratio={16 / 9} className='bg-muted'>
								<Image src={article.image} fill alt={article.title} className='rounded-md object-cover' />
							</AspectRatio>
							<div>
								<p>
									{article.description}
									<span>
										<Button variant={'link'} className='inline px-4 text-blue-700'>
											<Link href={article.url} target='_blank' rel='noopener noreferrer'>
												Read more
											</Link>
										</Button>
									</span>
								</p>
							</div>

							<div className='flex items-center justify-between space-x-2 text-gray-500 text-sm'>
								<span className='flex gap-2 items-center justify-center'>
									<Calendar /> {new Date(article.publishedAt).toLocaleDateString()}
								</span>

								<Button asChild size={'lg'}>
									<Link href={article.source.url}>Visit</Link>
								</Button>
							</div>
							<p className='flex items-center justify-between space-x-2 text-gray-500 text-sm mx-auto'>
								{article.source.name}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
			<PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
		</div>
	);
};

export default TopHeading;
