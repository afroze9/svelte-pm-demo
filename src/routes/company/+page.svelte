<script lang="ts">
	import LayoutPage from '$lib/layouts/LayoutPage.svelte';
	import companyApi, { type CompanySummaryResponseModel } from '../../services/CompanyApi';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import ApiHelpers from '../../services/ApiHelpers';
	import Loader from '$lib/components/Loader.svelte';
	import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	let companies = writable<CompanySummaryResponseModel[]>([]);

	async function deleteCompany(id: number) {
		await companyApi.deleteCompany(id);
		companies.set($companies.filter((c) => c.id !== id));
	}

	onMount(async () => {
		let response = await companyApi.getCompanies();

		if (!ApiHelpers.isErrorReponse(response)) {
			companies.set(response);
		} else {
			toastStore.trigger({
				message: response.message,
				background: 'variant-filled-error'
			});
		}
	});
</script>

<LayoutPage>
	<header class="space-y-4">
		<div class="flex flex-row">
			<h1 class="h1">Companies</h1>
			<a href="/company/create" class="btn variant-filled ml-auto">Add Company</a>
		</div>
	</header>
	<hr />
	<section class="space-y-4">
		{#if $companies.length > 0}
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
									<a href={`company/${company.id}`}>
										<i class="fa-solid fa-pencil" />
									</a>
									<button
										on:click={() => deleteCompany(company.id)}
										on:keypress={() => deleteCompany(company.id)}
										class="ml-2 text-error-500"
									>
										<i class="fa-solid fa-trash" />
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{:else}
			<Loader />
		{/if}
	</section>
</LayoutPage>
