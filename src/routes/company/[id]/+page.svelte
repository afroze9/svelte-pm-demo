<script lang="ts">
	import { page } from '$app/stores';
	import LayoutPage from '$lib/layouts/LayoutPage.svelte';
	import { writable } from 'svelte/store';
	import type { CompanyResponse, CompanySummaryResponseModel } from '../../../services/CompanyApi';
	import { onMount } from 'svelte';
	import { form, field } from 'svelte-forms';
	import { min, required } from 'svelte-forms/validators';
	import companyApi from '../../../services/CompanyApi';
	import ApiHelpers from '../../../services/ApiHelpers';
	import { ProgressRadial, toastStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	let id: number = +$page.params.id;
	let company = writable<CompanyResponse>();

	const name = field('name', '', [required(), min(5)], {
		validateOnChange: true
	});
	const companyForm = form(name);

	onMount(async () => {
		let response = await companyApi.getCompanyById(id);

		if (!ApiHelpers.isErrorReponse(response)) {
			company.set(response);
			name.set(response.name);
		} else {
			toastStore.trigger({
				message: response.message,
				background: 'variant-filled-error'
			});
		}
	});

	async function updateCompany() {
		if ($companyForm.valid) {
			let response = await companyApi.updateCompany(id, {
				id: id,
				name: $name.value
			});
			if (!ApiHelpers.isErrorReponse(response)) {
				goto('/company');
			} else {
				toastStore.trigger({
					message: response.message,
					background: 'variant-filled-error'
				});
			}
		}
	}

	$: getValidationClass = (checks: string[]): string => {
		return checks.some((check) => $companyForm.hasError(check)) ? 'input-error' : '';
	};
</script>

<LayoutPage>
	{#if $company}
		<h3 class="h3">{$company.name}</h3>

		<label class="label">
			<span>Name</span>
			<input
				class={`input ${getValidationClass(['name.required', 'name.min'])}`}
				type="text"
				placeholder="Company Name"
				bind:value={$name.value}
			/>
		</label>
		<div class="flex justify-end">
			<a class="btn variant-filled-error" href="/company">Cancel</a>
			<button
				type="button"
				class="btn variant-filled ml-4"
				disabled={!$companyForm.valid}
				on:click={updateCompany}>Update</button
			>
		</div>
		<h3 class="h3">Projects</h3>
		{#if $company.projects}
			{#each $company.projects as project}
				<div class="card p-1">
					<div class="flex">
						<div class="flex flex-col">
							<header class="card-header">{project.name}</header>
							<section class="p-4">
								<div>Tasks: {project.taskCount}</div>
							</section>
						</div>
						<div class="flex items-center justify-center ml-auto p-4">
							<a href={`/project/${project.id}`} class="btn variant-filled ml-4">View</a>
						</div>
					</div>
				</div>
			{/each}
		{:else}
			<p>No Projects</p>
		{/if}
	{:else}
		<div class="grid h-screen place-items-center"><ProgressRadial /></div>
	{/if}
</LayoutPage>
