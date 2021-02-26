import { Component, Fragment, h } from "preact"
import Nimiq from "@nimiq/core-web"

export default class App extends Component {
	render() {
		return (
			<Fragment>
				<header id="top" className="nq-blue-bg">
					<h1 className="nq-h1">NIMIQ.link</h1>
					<p className="nq-label">
						URL shortener with NIMIQ integration
					</p>
				</header>
				<main>
					<div className="nq-card">
						<div className="nq-card-header">
							<h1 className="nq-h1">Create shortlink</h1>
						</div>
						<div className="nq-card-body"></div>
					</div>
				</main>
			</Fragment>
		)
	}
}
