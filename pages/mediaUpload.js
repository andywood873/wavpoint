import dynamic from "next/dynamic"

// import UploadBody from "../components/UploadBody";
const UploadBody = dynamic(()=> import("../components/UploadBody").then((res)=> res.default), {ssr:false})

export default function mediaUpload() {
	return <UploadBody/>
}