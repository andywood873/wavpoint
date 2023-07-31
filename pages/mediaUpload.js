import dynamic from "next/dynamic"

// export const getServerSideProps = async () => {
// 	const subgraphApiUrl =
// 		"https://api.thegraph.com/subgraphs/name/nightfallsh4/wavpoint-zora-polygon-mumbai"
// 	const query = `
//     query{
//         drops {
//           name
//         }
        
//       }
//     `
// 	const data = await fetch(subgraphApiUrl, {
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify({ query: query }),
// 	}).then((res) => res.json())
// 	const date = new Date()

// 	const currentTime = date.getTime()
// 	let num = 0
// 	let currentNum
// 	console.log(data.data.drops)

// 	for (let i = 0; i < data.data.drops.length; i++) {
// 		const element = data.data.drops[i]
// 		const element2 = element.name.replace("WAVTHEORY", "")
// 		const changedNum = parseInt(element2)
// 		if (changedNum > num) {
// 			num = changedNum
// 		}
// 		currentNum = changedNum + 1
// 	}
// 	console.log(data)
// 	console.log(currentNum)

// 	return {
// 		props: { num:currentNum },
// 	}
// }

const UploadBody = dynamic(()=> import("../components/UploadBody").then((res)=> res.default), {ssr:false})

export default function mediaUpload({num}) {
	console.log(num)
	return <UploadBody data={num}/>
}