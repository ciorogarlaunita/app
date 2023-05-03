import {Avatar, Box, CardActionArea, CardContent, Chip, Container, List, ListItemAvatar, ListItemButton, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, Paper, Stack, Typography, useTheme} from "@suid/material";
import SettingsIcon from "@suid/icons-material/Settings";
import InstallIcon from "@suid/icons-material/InstallMobile";
import CardWithIcon from "../components/CardWithIcon";
import Header from "../components/Header";
import {createResource, createSignal, For, Show} from "solid-js";
import {modules} from "../lib/modules";
import {A, useRouteData} from "@solidjs/router";
import {isInstalled} from "../lib/device";
import SettingsDialog from "../components/SettingsDialog";
import {Business, VolunteeringProject} from "../types/SanitySchema";

import ArrowForwardIcon from "@suid/icons-material/ArrowForward";
import {sanityClient, urlFor} from "../lib/sanity";

export default function Home() {
	const theme = useTheme();
	const [settingsDialogOpen, setSettingsDialogOpen] = createSignal(false);
	const data = useRouteData<typeof HomeGetData>();

	return (
		<>
			<SettingsDialog
				open={settingsDialogOpen()}
				onClose={() => setSettingsDialogOpen(false)}
			/>
			<Header 
				title="Acasa"
				noHeading
				themeColor={theme.palette.background.default}
				actions={[
					{
						onClick: () => setSettingsDialogOpen(true),
						icon: SettingsIcon,
					}
				]}
			/>
			<Container
				sx={{
					marginTop: "env(safe-area-inset-top)",
					pb: 2
				}}
			>
				<Stack>
					<Box
						displayRaw="flex"
						gap={1}
						flexDirection="row"
						alignItems="center"
						my={2}
					>
						<Avatar
							src="/favicon-32x32.png"
							sx={{
								width: "32px",
								height: "32px",
							}}
						/>
						<Typography
							variant="h6"
						>
							Ciorogârla Unită
						</Typography>
					</Box>
					<Show when={!isInstalled()}>
						<A href="/install">
							<Paper variant="outlined" sx={{ backgroundColor: "transparent" }}>
								<ListItemButton>
									<ListItemIcon>
										<InstallIcon />
									</ListItemIcon>
									<ListItemText 
										primary="Instaleaza aplicatia"
										secondary="Pare ca nu ai instalat aplicatia. Apasa aici pentru acces mai usor."
									/>
								</ListItemButton>
							</Paper>
						</A>
					</Show>
					<BusinessSection businesses={data.businesses()}/>
					<ProjectsSection projects={data.projects()}/>
					<For each={modules}>
						{(module) => (
							<A href={module.disabled ? "" : module.path || ""}>
								<CardWithIcon 
									cardIcon={module.icon}
									disabled={module.disabled}
									sx={{
										opacity: module.disabled ? 0.5 : 1,
									}}
								>
									<CardActionArea disabled={module.disabled}>
										<CardContent>
											<Typography variant="h4">
												{module.name}
											</Typography>
											<Show when={module.disabled}>
												<Chip 
													size="small"
													variant="outlined"
													label="In curand"
												/>
											</Show>
											<Typography variant="body1" color="textSecondary">
												{module.description}
											</Typography>
										</CardContent>
									</CardActionArea>
								</CardWithIcon>
							</A>
						)}
					</For>
				</Stack>
			</Container>
		</>
	)
}

const fetcherBusinesses = async () => {
	const data = sanityClient.fetch(`*[_type == "business"] | order(_createdAt desc)[0...3]`)
		.catch(() => null);

	return data;
}


const fetcherProjects = async () => {
	const data = sanityClient.fetch(`*[_type == "volunteeringProject"] | order(_createdAt desc)[0...3]`)
		.catch(() => null);

	return data;
}

export function HomeGetData() {
	const [businesses] = createResource(fetcherBusinesses);
	const [projects] = createResource(fetcherProjects);

	return {
		businesses,
		projects
	}
}


function BusinessSection(props: { businesses: Business[] }) {
	return (
		<Show when={props.businesses}>
			<List>
				<ListSubheader
					disableSticky
				>
					Afaceri noi adaugate
				</ListSubheader>
				<For each={props.businesses}>
					{(business) => (
						<A href={`/businesses/${business.slug?.current}`}>
							<ListItemButton>
								<ListItemAvatar>
									<Avatar
										src={urlFor(business.logo).width(64).height(64).url()}
										variant="rounded"
									/>
								</ListItemAvatar>
								<ListItemText
									primary={business.name}
									secondary={business.description}
									secondaryTypographyProps={{ noWrap: true }}
								/>
							</ListItemButton>
						</A>
					)}
				</For>
				<A href="/businesses">
					<ListItemButton>
						<ListItemText
							primary="Mai multe"
						/>
						<ListItemSecondaryAction>
						<ArrowForwardIcon />
						</ListItemSecondaryAction>
					</ListItemButton>
				</A>
			</List>
		</Show>
	)
}


function ProjectsSection(props: { projects: VolunteeringProject[] }) {
	return (
		<Show when={props.projects}>
			<List>
				<ListSubheader
					disableSticky
				>
					Proiecte noi adaugate
				</ListSubheader>
				<For each={props.projects}>
					{(project) => (
						<A href={`/volunteering/${project.slug?.current}`}>
							<ListItemButton>
								<ListItemAvatar>
									<Avatar
										src={urlFor(project.image).width(64).height(64).url()}
										variant="rounded"
									/>
								</ListItemAvatar>
								<ListItemText
									primary={project.name}
									secondary={project.description}
									secondaryTypographyProps={{ noWrap: true }}
								/>
							</ListItemButton>
						</A>
					)}
				</For>
				<A href="/volunteering">
					<ListItemButton>
						<ListItemText
							primary="Mai multe"
						/>
						<ListItemSecondaryAction>
						<ArrowForwardIcon />
						</ListItemSecondaryAction>
					</ListItemButton>
				</A>
			</List>
		</Show>
	)
}
