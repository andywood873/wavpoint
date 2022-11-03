import Head from "next/head"
import Link from "next/link"
import Header from "../components/Header"
import Popular from "../components/Popular"
import Recent from "../components/Recent"
import styles from "../styles/Home.module.css"

export default function Home() {
	return (
		<div className={styles.container}>
			{/* <h1>Hello World, Wavpoint</h1> */}
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
				<link
					href="https://fonts.googleapis.com/css2?family=Azeret+Mono&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<div className="container">
				<Header />
				<Popular />
				<Recent/>
			</div>
		</div>
	)
}
