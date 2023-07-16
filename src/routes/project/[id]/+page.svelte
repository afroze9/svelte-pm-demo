<script lang="ts">
	import { page } from '$app/stores';
	import LayoutPage from '$lib/layouts/LayoutPage.svelte';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { form, field, style } from 'svelte-forms';
	import { min, required } from 'svelte-forms/validators';
	import ApiHelpers from '../../../services/ApiHelpers';
	import { ProgressRadial, toastStore } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import projectApi, { Priority, type ProjectResponse } from '../../../services/ProjectApi';
	import taskApi from '../../../services/TaskApi';

	let id: number = +$page.params.id;
	let project = writable<ProjectResponse>();

	const projectName = field('projectName', '', [min(5)], {
		validateOnChange: true
	});
	const projectPriority = field<Priority>('priority', Priority.Medium, [required()], {
		validateOnChange: true
	});

	const taskName = field('taskName', '', [required(), min(5)], {
		validateOnChange: true,
		valid: false
	});
	const taskDescription = field('taskDescription', '', [required(), min(5)], {
		validateOnChange: true,
		valid: false
	});

	const projectForm = form(projectName, projectPriority);
	const taskForm = form(taskName, taskDescription);

	onMount(async () => {
		let fetchedProject = await projectApi.getProjectById(id);

		if (!ApiHelpers.isErrorReponse(fetchedProject)) {
			project.set(fetchedProject);
			projectName.set(fetchedProject.name);
			projectPriority.set(fetchedProject.priority ?? Priority.Medium);
		}
	});

	async function updateProject() {
		if ($projectForm.valid) {
			let response = await projectApi.updateProject(id, {
				id: id,
				name: $projectName.value,
				priority: $projectPriority.value,
				companyId: $project.companyId
			});
			if (!ApiHelpers.isErrorReponse(response)) {
				goto('/project');
			} else {
				console.error(response.message);
			}
		}
	}

	async function createTask() {
		if (!$projectForm.valid) {
			return;
		}

		let response = await taskApi.createTask(id, {
			title: $taskName.value,
			description: $taskDescription.value
		});

		if (!ApiHelpers.isErrorReponse(response)) {
			taskForm.reset();
			$project.todoItems = [...$project.todoItems, response];
		} else {
			toastStore.trigger({
				message: response.message,
				background: 'variant-filled-error'
			});
		}
	}

	async function completeTask(id: number) {
		let response = await taskApi.updateTodo(id, {
			markComplete: true,
			assignedToId: ''
		});

		if (!ApiHelpers.isErrorReponse(response)) {
			$project.todoItems = $project.todoItems.map((item) => {
				if (item.id === id) {
					return {
						...item,
						isCompleted: true
					};
				}
				return item;
			});
		} else {
			toastStore.trigger({
				message: response.message,
				background: 'variant-filled-error'
			});
		}
	}

	$: getValidationClassForProject = (checks: string[]): string => {
		return checks.some((check) => $projectForm.hasError(check)) ? 'input-error' : '';
	};

	$: getValidationClassForTask = (checks: string[]): string => {
		return checks.some((check) => $taskForm.hasError(check)) ? 'input-error' : '';
	};
</script>

<LayoutPage>
	{#if $project}
		<h3 class="h3">{$project.name}</h3>

		<label class="label">
			<span>Name</span>
			<input
				class={`input ${getValidationClassForProject(['projectName.min'])}`}
				type="text"
				placeholder="Project Name"
				bind:value={$projectName.value}
			/>
		</label>
		<label class="label">
			<span>Priority</span>
			<select
				class={`select ${getValidationClassForProject(['projectPriority.required'])}`}
				bind:value={$projectPriority.value}
			>
				<option value={Priority.Low}>Low</option>
				<option value={Priority.Medium}>Medium</option>
				<option value={Priority.High}>High</option>
				<option value={Priority.Critical}>Critical</option>
			</select>
		</label>
		<div class="flex justify-end">
			<a class="btn variant-filled-error" href="/project">Cancel</a>
			<button
				type="button"
				class="btn variant-filled ml-4"
				disabled={!$projectForm.valid}
				on:click={updateProject}>Update</button
			>
		</div>
		<h3 class="h3">Tasks</h3>
		<div class="w-full gap-4 flex flex-row">
			<div class="input-group w-full">
				<input
					type="text"
					class={`input ${getValidationClassForTask(['taskName.min'])}`}
					placeholder="Title"
					bind:value={$taskName.value}
				/>
			</div>
			<div class="input-group w-full">
				<input
					type="text"
					class={`input ${getValidationClassForTask(['taskDescription.min'])}`}
					placeholder="Description"
					bind:value={$taskDescription.value}
				/>
			</div>
			<button
				type="button"
				class="btn variant-filled"
				on:click={createTask}
				disabled={!$taskForm.valid}>Add</button
			>
		</div>
		{#if $project.todoItems}
			{#each $project.todoItems as todoItem}
				<div class="card p-1">
					<div class="flex">
						<div class="flex flex-col">
							<header class="card-header">
								<span class={`${todoItem.isCompleted ? 'line-through' : ''}`}>
									{todoItem.title}
								</span>
							</header>
							<section class="p-4">
								<span class={`${todoItem.isCompleted ? 'line-through' : ''}`}
									>{todoItem.description}</span
								>
							</section>
						</div>
						<div class="flex items-center justify-center ml-auto p-4">
							<button
								class="btn variant-filled ml-4"
								on:click={() => completeTask(todoItem.id)}
								on:keypress={() => completeTask(todoItem.id)}
								disabled={todoItem.isCompleted}>Complete</button
							>
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
