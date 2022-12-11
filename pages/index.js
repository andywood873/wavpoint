'use client';
import dynamic from "next/dynamic";
import Head from "next/head"
import Link from "next/link";
import styles from "../styles/Home.module.css"
const Body = dynamic(() => import("../components/Body").then((res) => res.default),{ssr:false})
export default function Home() {
	
	return (
		<div className={styles.container}>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link
					href="https://fonts.googleapis.com/css2?family=Azeret+Mono&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<div>
				<Body/>
			</div>
		</div>
	)
}
