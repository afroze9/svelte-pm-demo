<script lang="ts">
	import LayoutPage from '$lib/layouts/LayoutPage.svelte';
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import companyApi, { type CompanySummaryResponseModel } from '../../services/CompanyApi';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import ApiHelpers from '../../services/ApiHelpers';

	let companies = writable<CompanySummaryResponseModel[]>([]);

	onMount(async () => {
		let list = await companyApi.getCompanies();

		if (!ApiHelpers.isErrorReponse(list)) {
			companies.set(list);
		}
	});
</script>

<LayoutPage>
	<header class="space-y-4">
		<h1 class="h1">Companies</h1>
	</header>
	<hr />
	<section class="space-y-4" />

	<div class="table-container">
		<table class="table" role="grid">
			<thead class="table-head">
				<tr>
					<th>Name</th>
					<th>Projects</th>
					<th>Tags</th>
					<th />
				</tr>
			</thead>
			<tbody class="table-body">
				{#each $companies as company}
					<tr>
						<td>{company.name}</td>
						<td>{company.projectCount}</td>
						<td>{company.tags}</td>
						<td>
							<a href={`company/${company.id}`} class="text-secondary-500">
								<i class="fa-solid fa-pencil" />
							</a>
							<a href="/" class="ml-2 text-error-500">
								<i class="fa-solid fa-trash" />
							</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</LayoutPage>
