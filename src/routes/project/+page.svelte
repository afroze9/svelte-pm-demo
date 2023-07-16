<script lang="ts">
	import LayoutPage from '$lib/layouts/LayoutPage.svelte';

	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import ApiHelpers from '../../services/ApiHelpers';
	import type { ProjectResponse } from '../../services/ProjectApi';
	import projectApi from '../../services/ProjectApi';
	import Loader from '$lib/components/Loader.svelte';

	let projects = writable<ProjectResponse[]>([]);

	async function deleteProject(id: number) {
		await projectApi.deleteProject(id);
		projects.set($projects.filter((p) => p.id !== id));
	}

	onMount(async () => {
		let list = await projectApi.getProjects();

		if (!ApiHelpers.isErrorReponse(list)) {
			projects.set(list);
		}
	});
</script>

<LayoutPage>
	<header class="space-y-4">
		<div class="flex flex-row">
			<h1 class="h1">Projects</h1>
			<a href="/project/create" class="btn variant-filled ml-auto">Add Project</a>
		</div>
	</header>
	<hr />
	<section class="space-y-4" />

	{#if $projects.length > 0}
		<div class="table-container">
			<table class="table" role="grid">
				<thead class="table-head">
					<tr>
						<th>Name</th>
						<th>Todo Items</th>
						<th />
					</tr>
				</thead>
				<tbody class="table-body">
					{#each $projects as project}
						<tr>
							<td>{project.name}</td>
							<td>{project.todoItems.length}</td>
							<td>
								<a href={`project/${project.id}`}>
									<i class="fa-solid fa-pencil" />
								</a>
								<button
									on:click={() => deleteProject(project.id)}
									on:keypress={() => deleteProject(project.id)}
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
</LayoutPage>
