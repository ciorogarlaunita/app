<script lang="ts">
	import { onMount } from "svelte";
	import Container from "./Container.svelte";
	import { isIos } from "$lib/utils/device";
	import Icon from "./Icon.svelte";

	export let title: string;
	export let back: boolean = false;
	export let noNav: boolean = false;
	export let noHeading: boolean = false;
	export let themeColor: string = "";
	export let emphasizeButtons: boolean = false;
	export let favicon: string = "";
	export let actions: {
		href?: string;
		onClick?: () => void;
		icon?: string;
		img?: string;
	}[] = [];

	let headerRef: HTMLHeadingElement | undefined;

	let scrollTrigger = globalThis.scrollY > (headerRef?.offsetHeight ?? 56);

	const handleScroll = () => {
		scrollTrigger = globalThis.scrollY > (headerRef?.offsetHeight ?? 56);
	};

	onMount(() => {
		globalThis.addEventListener("scroll", handleScroll);

		return () => {
			globalThis.removeEventListener("scroll", handleScroll);
		};
	});

	const handleBack = () => {
		history.back();
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta
		name="theme-color"
		media="(prefers-color-scheme: light)"
		content={themeColor ? (scrollTrigger ? "#fbfdf8" : themeColor) : "#fbfdf8"}
	/>
	<meta
		name="theme-color"
		media="(prefers-color-scheme: dark)"
		content={themeColor ? (scrollTrigger ? "#191c1a" : themeColor) : "#191c1a"}
	/>
	{#if favicon}
		<link rel="icon" type="image/png" href={favicon} />
	{/if}
</svelte:head>

{#if !noNav}
	<nav
		class="navbar top-0 left-0 right-0 pt-[env(safe-area-inset-top)] fixed z-50 transition gap-1 {scrollTrigger &&
			isIos() &&
			'bg-base-100/80'}"
		class:bg-base-100={scrollTrigger && !isIos()}
		class:backdrop-blur-xl={scrollTrigger && isIos()}
		class:shadow-lg={scrollTrigger}
	>
		{#if back}
			<div class="flex-none">
				<button
					on:click={handleBack}
					class="btn btn-circle text-neutral-content"
					class:btn-neutral={!scrollTrigger && emphasizeButtons}
					class:btn-ghost={scrollTrigger || !emphasizeButtons}
				>
					<Icon name="arrow_back" />
				</button>
			</div>
		{/if}
		<div class="flex-1">
			<span
				class="text-xl transition text-neutral-content line-clamp-1"
				class:ml-4={!back}
				class:opacity-0={!scrollTrigger}
			>
				{title}
			</span>
		</div>
		<div class="flex-none">
			{#each actions as action}
				<svelte:element
					this={action.href ? "a" : "button"}
					href={action.href}
					on:click={action.onClick}
					class="btn btn-circle text-neutral-content"
					class:btn-neutral={!scrollTrigger && emphasizeButtons}
					class:btn-ghost={scrollTrigger || !emphasizeButtons}
				>
					{#if action.icon}
						<Icon name={action.icon} />
					{:else if action.img}
						<img src={action.img} alt="" class="w-8 h-8 rounded-full" />
					{/if}
				</svelte:element>
			{/each}
		</div>
	</nav>
{/if}

{#if !noHeading}
	<Container>
		<h1 bind:this={headerRef} class="text-6xl sm:text-7xl mb-2 pt-16">
			{title}
		</h1>
	</Container>
{/if}
