import { NowRequest, NowResponse } from "@vercel/node"

export default (_req: NowRequest, res: NowResponse) => {
	if (
		(_req.body || _req.query) &&
		((_req.body.target && _req.body.wallet) ||
			(_req.query.target && _req.query.wallet))
	) {
		const target: string = _req.body.target || _req.query.target
		const wallet: string = _req.body.wallet || _req.query.wallet
		const shares: number = _req.body.shares || _req.query.shares || 1
		res.status(200).json({ target, wallet, shares })
	} else {
		res.status(422).json({
			success: false,
			error: "PARAMETER_MISSING",
		})
	}
}
