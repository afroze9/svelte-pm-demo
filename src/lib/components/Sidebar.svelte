<script lang="ts">
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { isAuthenticated } from '../../store';
	import { sidebarLinks } from '../links';

	// Reactive
	$: tileSelected = (href: string) => $page.url.pathname?.includes(href);
</script>

<AppRail>
	{#if $isAuthenticated}
		{#each sidebarLinks as sidebarLink}
			<AppRailAnchor href={sidebarLink.href} selected={tileSelected(sidebarLink.href)}>
				<svelte:fragment slot="lead">
					<i class={`fa-solid ${sidebarLink.icon} text-2xl`} />
				</svelte:fragment>
				<span>{sidebarLink.label}</span>
			</AppRailAnchor>
		{/each}
	{/if}
</AppRail>
