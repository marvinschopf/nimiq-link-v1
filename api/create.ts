import { NowRequest, NowResponse } from "@vercel/node"
import faunadb from "faunadb"

const q: typeof faunadb.query = faunadb.query

const DEFAULT_SLUG_LENGTH: number = 3

const FAUNA_SECRET: string = process.env.FAUNA_SECRET || ""

const client: faunadb.Client = new faunadb.Client({
	secret: FAUNA_SECRET,
})

export default async (_req: NowRequest, res: NowResponse) => {
	let target: string = ""
	let wallet: string = ""
	let shares: number = 1
	if (_req.query && _req.query.target) target = _req.query.target.toString()
	if (_req.query && _req.query.wallet) wallet = _req.query.wallet.toString()
	if (_req.query && _req.query.shares)
		shares = parseInt(_req.query.shares.toString())
	if (_req.body && _req.body.target) target = _req.body.target.toString()
	if (_req.body && _req.body.wallet) wallet = _req.body.wallet.toString()
	if (_req.body && _req.body.shares)
		shares = parseInt(_req.body.shares.toString())
	if (target.length >= 1 && wallet.length >= 1 && shares > 0) {
		const slug = makeSlug(DEFAULT_SLUG_LENGTH)
		var createP = client.query(
			q.Create(q.Collection("links"), {
				data: {
					slug: slug,
					target: target,
					wallet: wallet,
					shares: shares,
				},
			})
		)
		await createP
		res.status(200).json({ slug, target, wallet, shares })
	} else {
		res.status(422).json({
			success: false,
			error: "PARAMETER_MISSING",
		})
	}
}

function makeSlug(length: number): string {
	let result: string = ""
	const characters: string = "abcdefghiklmnpqrstuvwxyz23456789"
	const charactersLength: number = characters.length
	for (let i: number = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		)
	}
	return result
}
