import { NowRequest, NowResponse } from "@vercel/node"

export default (_req: NowRequest, res: NowResponse) => {
	let target: string = ""
	let wallet: string = ""
	let shares: number = 1
	if (_req.query && _req.query.target) target = _req.query.target.toString()
	if (_req.query && _req.query.wallet) wallet = _req.query.wallet.toString()
	if (_req.query && _req.query.shares)
		shares = parseInt(_req.query.shares.toString())
	if (_req.body && _req.body.target) target = _req.body.target
	if (_req.body && _req.body.wallet) wallet = _req.body.wallet
	if (_req.body && _req.body.shares) shares = _req.body.shares
	if (target.length >= 1 && wallet.length >= 1 && shares > 0) {
		res.status(200).json({ target, wallet, shares })
	} else {
		res.status(422).json({
			success: false,
			error: "PARAMETER_MISSING",
		})
	}
}
