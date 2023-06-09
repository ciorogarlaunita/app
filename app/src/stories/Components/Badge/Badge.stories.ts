import type { Meta, StoryObj } from "@storybook/svelte";
import Badge from "$lib/components/Badge.svelte";
import BadgeView from "./BadgeView.svelte";

const meta: Meta = {
	component: Badge,
	title: "Components/Badge",
	argTypes: {
		color: {
			options: ["primary", "secondary", "accent", "neutral"],
			control: { type: "radio" },
		},
	},
};

export default meta;

export const Primary: StoryObj = {
	render: ({ ...args }) => ({
		Component: BadgeView,
		props: args,
	}),
	args: {
		color: "primary",
	},
};

export const Secondary: StoryObj = {
	render: ({ ...args }) => ({
		Component: BadgeView,
		props: args,
	}),
	args: {
		color: "secondary",
	},
};

export const Accent: StoryObj = {
	render: ({ ...args }) => ({
		Component: BadgeView,
		props: args,
	}),
	args: {
		color: "accent",
	},
};

export const Neutral: StoryObj = {
	render: ({ ...args }) => ({
		Component: BadgeView,
		props: args,
	}),
	args: {
		color: "neutral",
	},
};

export const Outline: StoryObj = {
	render: ({ ...args }) => ({
		Component: BadgeView,
		props: args,
	}),
	args: {
		outline: true,
	},
};

export const AsButton: StoryObj = {
	render: ({ ...args }) => ({
		Component: BadgeView,
		props: args,
	}),
	args: {
		button: true,
	},
};

export const Large: StoryObj = {
	render: ({ ...args }) => ({
		Component: BadgeView,
		props: args,
	}),
	args: {
		large: true,
	},
};

export const WithIcon: StoryObj = {
	render: ({ ...args }) => ({
		Component: BadgeView,
		props: args,
	}),
	args: {
		icon: "info",
	},
};
