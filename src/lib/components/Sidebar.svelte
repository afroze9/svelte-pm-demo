<script lang="ts">
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	let currentTile: number = 0;
</script>

<AppRail>
	<AppRailAnchor href="/companies">
		<svelte:fragment slot="lead">
			<i class="fa-solid fa-building text-2xl" />
		</svelte:fragment>
		<span>Companies</span>
	</AppRailAnchor>
	<AppRailAnchor href="/projects">
		<svelte:fragment slot="lead">
			<i class="fa-solid fa-diagram-project text-2xl" />
		</svelte:fragment>
		<span>Projects</span>
	</AppRailAnchor>
</AppRail>
