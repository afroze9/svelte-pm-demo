<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import { AppShell, AppBar, LightSwitch, ProgressRadial, Toast } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { auth } from '../auth/authService';
	import { isAuthenticated, isLoading, user } from '../store';
	import Loader from '$lib/components/Loader.svelte';

	let { login, logout, initClient } = auth;

	onMount(async () => {
		await initClient();
	});
</script>

<svelte:head>
	<title>Nexus Project Management</title>
</svelte:head>

<!-- svelte-ignore a11y-missing-attribute -->
<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<a class="text-xl uppercase" href="/"><strong>Nexus</strong></a>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<LightSwitch />
				{#if $isAuthenticated}
					<span>{$user?.name}</span>
					<button class="btn btn-sm variant-filled" on:click={logout} on:keypress={logout}>
						Logout
					</button>
				{:else}
					<button class="btn btn-sm variant-filled" on:click={login} on:keypress={login}>
						Login
					</button>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<Sidebar />
	</svelte:fragment>

	{#if $isLoading}
		<Loader />
	{:else}
		<slot />
	{/if}
	<Toast />
</AppShell>
