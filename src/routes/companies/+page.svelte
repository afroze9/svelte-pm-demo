<script lang="ts">
	import LayoutPage from '$lib/layouts/LayoutPage.svelte';
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import companyApi, { type CompanySummaryResponseModel } from '../../services/CompanyApi';
	import { onMount } from 'svelte';
	import { writable, derived, get } from 'svelte/store';

	let companies = writable<CompanySummaryResponseModel[]>([]);

	onMount(async () => {
		let list = await companyApi.getCompanies();

		if (!companyApi.isErrorReponse(list)) {
			companies.set(list);
		}
	});

	$: table = (): TableSource => {
		return {
			head: ['Name', 'Projects', 'Tags'],
			body: tableMapperValues($companies, ['name', 'projectCount', 'tags'])
		};
	};
</script>

<LayoutPage>
	<header class="space-y-4">
		<h1 class="h1">Companies</h1>
	</header>
	<hr />
	<section class="space-y-4" />
	<Table source={table()} />
</LayoutPage>
