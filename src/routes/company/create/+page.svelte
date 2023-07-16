<script lang="ts">
	import LayoutPage from '$lib/layouts/LayoutPage.svelte';
	import { field, form, style } from 'svelte-forms';
	import { required, min } from 'svelte-forms/validators';
	import companyApi from '../../../services/CompanyApi';
	import ApiHelpers from '../../../services/ApiHelpers';
	import { goto } from '$app/navigation';
	import { toastStore } from '@skeletonlabs/skeleton';

	const name = field('name', '', [required(), min(5)], {
		validateOnChange: true,
		valid: false
	});
	const tags = field('tags', '', [required(), min(5)], {
		validateOnChange: true,
		valid: false
	});
	const companyForm = form(name, tags);

	async function createCompany() {
		if ($companyForm.valid) {
			let response = await companyApi.createCompany({
				name: $name.value,
				tags: $tags.value.split(',')
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
</script>

<LayoutPage>
	<header class="space-y-4">
		<div class="flex flex-row">
			<h1 class="h1">Companies</h1>
		</div>
	</header>
	<hr />
	<section class="space-y-4">
		<label class="label">
			<span>Name</span>
			<input
				class="input"
				type="text"
				placeholder="Company Name"
				bind:value={$name.value}
				use:style={{ field: name, valid: 'input-success', invalid: 'input-error' }}
			/>
		</label>
		<label class="label">
			<span>Tags</span>
			<input
				class="input"
				type="text"
				placeholder="Tags"
				bind:value={$tags.value}
				use:style={{ field: tags, valid: 'input-success', invalid: 'input-error' }}
			/>
		</label>
		<div class="flex justify-end">
			<a class="btn variant-filled-error" href="/company">Cancel</a>
			<button
				type="button"
				class="btn variant-filled ml-4"
				on:click={createCompany}
				disabled={!$companyForm.valid}>Create</button
			>
		</div>
	</section>
</LayoutPage>
