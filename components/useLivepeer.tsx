import { useInterval } from "@chakra-ui/react"
import { useAsset, useCreateAsset, useUpdateAsset } from "@livepeer/react"
import { useEffect } from "react"

export default function useLivepeer(
	input: File,
	name: string,
	description: string,
	trackList: string,
) {
	const {
		mutate: createAsset,
		data: asset,
		status,
		progress,
		error,
	} = useCreateAsset(
		input
			? {
					sources: [
						{
							name: input.name,
							file: input,
							storage: {
								ipfs: true,
								metadata: {
									name: name,
									description: description,
									trackList: trackList,
								},
							},
						},
					] as const,
			  }
			: null,
	)
	// console.log(asset);
	const { data: asset2 } = useAsset({
		assetId: asset?.[0].id,
		enabled: asset?.[0].id?.length === 36,
		refetchInterval: (asset) =>
			asset?.storage?.status?.phase !== "ready" ? 5000 : false,
	})

	// const { mutate: updateAsset, status: updateStatus } = useUpdateAsset(
	// 	asset2
	// 		? {
	// 				assetId: asset?.[0].id,
	// 				storage: {
	// 					ipfs: true,
	// 					// metadata overrides can be added here
	// 					// see the source code behind this example
	// 					metadata: {
	// 						name: name,
	// 						description: description,
	// 						tracklist: trackList,
	// 					},
	// 				},
	// 		  }
	// 		: null,
	// )
	// async function makeAsset() {
	// 	return new Promise(async (resolve, reject) => {
	// 		console.log("Starting asset Creation")
	// 		createAsset()
	// 		useInterval(() => {
	// 			console.log("Checking if done")

	// 				if (asset?.[0].storage?.ipfs?.cid) {
	// 					resolve(asset?.[0].storage?.ipfs?.cid)
	// 				}
	// 				console.log("From timeout func")
	// 				console.log(asset)
	// 		},2000)
				
	// 		}
	// 	)
	// }
	useEffect(() => {
		if (progress?.[0].progress === 1) {
			console.log(asset)
			// console.log(updateStatus)
			console.log(status)
			// updateAsset?.()
		}
		console.log(progress)
	}, [asset, progress])
	useEffect(() => {
		if (progress?.[0].progress === 1) {
			console.log("Update Asset")
			console.log(asset2)
			console.log("Update Status")
			// console.log(updateStatus)
			// console.log(status)
			// updateAsset?.()
		}
		console.log(progress)
	}, [asset2])
	return {
		// updateAsset,
		// updateStatus,
		asset,
		createAsset,
		status,
		progress,
		asset2,
		// makeAsset,
	}
}
