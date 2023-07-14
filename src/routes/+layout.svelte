<script lang="ts">
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';

	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	import { onMount } from 'svelte';
	import auth from '../auth/authService';
	import { isAuthenticated, user } from '../store';
	import type { Auth0Client } from '@auth0/auth0-spa-js';

	let auth0Client: Auth0Client;

	onMount(async () => {
		auth0Client = await auth.createClient();
		isAuthenticated.set(await auth0Client.isAuthenticated());
		user.set(await auth0Client.getUser());
	});

	function login() {
		auth.loginWithPopup(auth0Client);
	}

	function logout() {
		auth.logout(auth0Client);
	}
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
					<a class="btn btn-sm variant-ghost-surface" on:click={logout} on:keypress={logout}>
						Logout
					</a>
				{:else}
					<a class="btn btn-sm variant-ghost-surface" on:click={login} on:keypress={login}>
						Login
					</a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<Sidebar />
	</svelte:fragment>

	<slot />
</AppShell>
