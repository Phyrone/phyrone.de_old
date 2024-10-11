<script lang="ts">
	import { GithubIcon, HomeIcon, NewspaperIcon } from 'lucide-svelte';

	import NavbarButton from './NavbarButton.svelte';
	import { siMastodon, siYoutube } from 'simple-icons';
	import LucidedSimpleIcon from '$lib/LucidedSimpleIcon.svelte';
</script>

<nav
	style="--navbar-padding: 0.3rem"
	class="sticky top-0 max-w-screen-lg mx-auto navbar min-h-10 z-30 bg-base-100 shadow-sm"
>
	<div class="navbar-start">
		<div class="join">
			<NavbarButton href="/">
				<HomeIcon />
				<svelte:fragment slot="expanded">Home</svelte:fragment>
			</NavbarButton>
			<NavbarButton href="/blog">
				<NewspaperIcon />
				<svelte:fragment slot="expanded">Blog</svelte:fragment>
			</NavbarButton>
		</div>
	</div>
	<div class="navbar-end">
		<div class="join">
			<a
				class="join-item btn btn-sm btn-primary rounded-sm"
				aria-label="GitHub"
				href="https://github.com/phyrone"
			>
				<GithubIcon strokeWidth={0} fill="currentcolor" />
			</a>
			<a
				class="join-item btn btn-sm btn-primary rounded-sm"
				aria-label="Mastodon"
				href="https://mastodon.social/@phyrone"
			>
				<LucidedSimpleIcon icon={siMastodon} fill="currentcolor" strokeWidth={0} />
			</a>
			<a
				class="join-item btn btn-sm btn-primary rounded-sm"
				aria-label="YouTube"
				href="https://www.youtube.com/@phyrone"
			>
				<LucidedSimpleIcon icon={siYoutube} fill="currentcolor" strokeWidth={0} />
			</a>
		</div>
	</div>
</nav>
