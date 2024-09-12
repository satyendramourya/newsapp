'use client';
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export type SearchProps = {
	onCategoryChange: (category: string) => void;
};

const Search: React.FC<SearchProps> = ({ onCategoryChange }) => {
	const [inputValue, setInputValue] = useState('');

	// Handle input change
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (inputValue) {
			onCategoryChange(inputValue); // Call the handler passed from the parent
		}
	};

	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-4 w-full'>
			<Input
				className='max-w-xs w-full'
				type='text'
				value={inputValue}
				onChange={handleInputChange}
				placeholder='Search category (e.g., technology, sports)'
			/>
			<Button type='submit'>Search</Button>
		</form>
	);
};

export default Search;
