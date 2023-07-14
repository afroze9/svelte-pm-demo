<script lang="ts">
	import LayoutPage from '$lib/layouts/LayoutPage.svelte';
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';

	async function makeApiCall() {}

	type CompanySummaryResponseModel = {
		id: number;
		name: string;
		projectCount: number;
		tags: string[];
	};

	const companies: Array<CompanySummaryResponseModel> = [
		{
			id: 1,
			name: 'Tech Solutions',
			projectCount: 3,
			tags: ['software', 'development']
		},
		{
			id: 2,
			name: 'Innovative Systems',
			projectCount: 7,
			tags: ['technology', 'cloud', 'web']
		},
		{
			id: 3,
			name: 'Digital Enterprises',
			projectCount: 2,
			tags: ['data analytics', 'web', 'mobile']
		},
		{
			id: 4,
			name: 'Software Solutions',
			projectCount: 9,
			tags: ['AI', 'web', 'cybersecurity']
		},
		{
			id: 5,
			name: 'Data Analytics',
			projectCount: 6,
			tags: ['technology', 'data analytics']
		},
		{
			id: 6,
			name: 'Cloud Services',
			projectCount: 8,
			tags: ['cloud', 'web']
		},
		{
			id: 7,
			name: 'Mobile Technologies',
			projectCount: 4,
			tags: ['mobile', 'development']
		},
		{
			id: 8,
			name: 'Web Development',
			projectCount: 7,
			tags: ['web', 'development']
		},
		{
			id: 9,
			name: 'AI Innovators',
			projectCount: 9,
			tags: ['AI', 'development']
		},
		{
			id: 10,
			name: 'E-commerce Solutions',
			projectCount: 3,
			tags: ['e-commerce']
		},
		{
			id: 11,
			name: 'Cybersecurity',
			projectCount: 5,
			tags: ['security', 'cybersecurity']
		},
		{
			id: 12,
			name: 'Healthtech Solutions',
			projectCount: 6,
			tags: ['healthtech']
		},
		{
			id: 13,
			name: 'Financial Technologies',
			projectCount: 2,
			tags: ['financial tech']
		},
		{
			id: 14,
			name: 'Consulting Group',
			projectCount: 8,
			tags: ['consulting']
		},
		{
			id: 15,
			name: 'Social Media Solutions',
			projectCount: 5,
			tags: ['social media', 'web']
		},
		{
			id: 16,
			name: 'Game Studios',
			projectCount: 10,
			tags: ['game development']
		},
		{
			id: 17,
			name: 'Creative Design',
			projectCount: 1,
			tags: ['creative design']
		},
		{
			id: 18,
			name: 'Logistics Technologies',
			projectCount: 6,
			tags: ['logistics']
		},
		{
			id: 19,
			name: 'EdTech Solutions',
			projectCount: 4,
			tags: ['education', 'web']
		},
		{
			id: 20,
			name: 'Marketing Agency',
			projectCount: 7,
			tags: ['marketing']
		}
	];

	const table: TableSource = {
		head: ['Name', 'Projects', 'Tags'],
		body: tableMapperValues(companies, ['name', 'projectCount', 'tags'])
	};
</script>

<LayoutPage>
	<header class="space-y-4">
		<h1 class="h1">Companies</h1>
	</header>
	<hr />
	<section class="space-y-4" />
	<Table source={table} />
</LayoutPage>
