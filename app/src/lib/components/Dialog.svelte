<script lang="ts">
	import Icon from "./Icon.svelte";

	export let id: string;
	export let force: boolean = false;
</script>

<dialog {...$$restProps} {id} class="modal modal-bottom {$$props.class}">
	<form method="dialog" class="modal-box text-base-content max-w-screen-md mx-auto">
		<button class="btn btn-sm btn-circle btn-ghost absolute top-0 right-0">
			<Icon name="close" />
		</button>
		<div>
			<slot />
		</div>
		<div class="flex flex-col space-y-2 mt-2">
			<slot name="actions" />
		</div>
	</form>
	{#if !force}
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	{/if}
</dialog>
