import { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "urql"

export default async function getNftName(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const subgraphApiUrl =
		"https://api.thegraph.com/subgraphs/name/nightfallsh4/wavpoint-zora-polygon-mumbai"
	const query = `
    query{
        drops {
          name
        }
        
      }
    `
	// const client = createClient({
	// 	url: subgraphApiUrl,
	// })


	const data = await fetch(subgraphApiUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ query: query }),
	}).then((res) => res.json())
	const date = new Date()

	// const data1:any = await client
	// 	.query(query, {})
	// 	.toPromise()
	// 	.then((result) => result)
	// const data:any = await data1.json()
	const currentTime = date.getTime()
    let num = 0
	let currentNum
	console.log(data.data.drops);
	
    for (let i = 0; i < data.data.drops.length; i++) {
        const element = data.data.drops[i];
        const element2 = element.name.replace("WAVTHEORY","")
		const changedNum = parseInt(element2)
		if (changedNum > num){
			num = changedNum
		}
		currentNum = changedNum + 1
    }
	console.log(data)
	console.log(currentNum);
	res
		.status(500)
		.json({ data: data.data, time: currentTime, currentNum: currentNum })
}
