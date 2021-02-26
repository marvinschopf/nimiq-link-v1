import { Component, Fragment, h } from "preact"
import Nimiq from "@nimiq/core-web"

type AppProps = {}

type AppState = {
	targetUrl: string
	wallet: string
}

export default class App extends Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props)
		this.state = {
			targetUrl: "",
			wallet: "",
		}
	}

	handleSubmit(event: Event) {}

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
						<div className="nq-card-body">
							<form onSubmit={this.handleSubmit}>
								<div className="row">
									<div className="col-xs-12 col-md-6">
										<label for="targetUrlInput">
											URL to shorten:
										</label>
										<input
											id="targetUrlInput"
											className="nq-input"
											placeholder=""
											value={this.state.targetUrl}
											onChange={(event: any) => {
												this.setState({
													targetUrl:
														event.target.value,
												})
											}}
										/>
									</div>
									<div className="col-xs-12 col-md-6">
										<label for="walletInput">
											NIM wallet address:
										</label>
										<input
											id="walletInput"
											className="nq-input"
											placeholder=""
											value={this.state.wallet}
											onChange={(event: any) => {
												this.setState({
													wallet: event.target.value,
												})
											}}
										/>
									</div>
								</div>
							</form>
						</div>
					</div>
				</main>
			</Fragment>
		)
	}
}
