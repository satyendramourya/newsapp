'use client';
import Navbar from '@/components/navbar';
import TopHeading from '@/components/topheading';
import React, { useState } from 'react';

const NewsPage = () => {
	const [category, setCategory] = useState('general'); // default category

	// This function will be passed to the Search component for category updates
	const handleCategoryChange = (newCategory: string) => {
		setCategory(newCategory);
	};

	return (
		<div>
			<Navbar onCategoryChange={handleCategoryChange} />

			<TopHeading category={category} />
		</div>
	);
};

export default NewsPage;
