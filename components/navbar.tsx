'use client';
import React from 'react';
import Search, { SearchProps } from './search';

const Navbar: React.FC<SearchProps> = ({ onCategoryChange }) => {
	return (
		<nav className='p-4'>
			<div className='flex flex-col w-full sm:flex-row gap-4 items-center justify-between mx-auto'>
				<h1 className='text-2xl'>ACONEWS</h1>

				<div className='max-w-[400px]'>
					<Search onCategoryChange={onCategoryChange} />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
