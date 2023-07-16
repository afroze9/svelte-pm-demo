<script lang="ts">
	import LayoutPage from '$lib/layouts/LayoutPage.svelte';
	import { field, form, style } from 'svelte-forms';
	import { required, min } from 'svelte-forms/validators';
	import ApiHelpers from '../../../services/ApiHelpers';
	import { goto } from '$app/navigation';
	import projectApi, { Priority } from '../../../services/ProjectApi';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import type { CompanySummaryResponseModel } from '../../../services/CompanyApi';
	import companyApi from '../../../services/CompanyApi';
	import { toastStore } from '@skeletonlabs/skeleton';

	let companies = writable<CompanySummaryResponseModel[]>([]);

	const projectName = field('projectName', '', [min(5)], {
		validateOnChange: true
	});
	const companyId = field<number>('priority', 0, [required()], {
		validateOnChange: true,
		valid: false
	});
	const projectForm = form(projectName, companyId);

	async function createProject() {
		if ($projectForm.valid) {
			let response = await projectApi.createProject({
				name: $projectName.value,
				companyId: $companyId.value
			});
			if (!ApiHelpers.isErrorReponse(response)) {
				goto('/project');
			} else {
				toastStore.trigger({
					message: response.message,
					background: 'variant-filled-error'
				});
			}
		}
	}

	onMount(async () => {
		let list = await companyApi.getCompanies();

		if (!ApiHelpers.isErrorReponse(list)) {
			companies.set(list);
		}
	});

	$: getValidationClassForProject = (checks: string[]): string => {
		return checks.some((check) => $projectForm.hasError(check)) ? 'input-error' : '';
	};
</script>

<LayoutPage>
	<header class="space-y-4">
		<div class="flex flex-row">
			<h1 class="h1">Projects</h1>
		</div>
	</header>
	<hr />
	<section class="space-y-4">
		<label class="label">
			<span>Name</span>
			<input
				class="input"
				type="text"
				placeholder="Project Name"
				bind:value={$projectName.value}
				use:style={{ field: projectName, valid: 'input-success', invalid: 'input-error' }}
			/>
		</label>

		<label class="label">
			<span>Company</span>
			<select
				class={`select ${getValidationClassForProject(['companyId.required'])}`}
				bind:value={$companyId.value}
			>
				{#if $companies.length > 0}
					{#each $companies as company}
						<option value={company.id}>{company.name}</option>
					{/each}
				{/if}
			</select>
		</label>

		<div class="flex justify-end">
			<a class="btn variant-filled-error" href="/company">Cancel</a>
			<button
				type="button"
				class="btn variant-filled ml-4"
				on:click={createProject}
				disabled={!$projectForm.valid}>Create</button
			>
		</div>
	</section>
</LayoutPage>
