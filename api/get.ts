import { NowRequest, NowResponse } from "@vercel/node"
import faunadb from "faunadb"

const q: typeof faunadb.query = faunadb.query

const DEFAULT_SLUG_LENGTH: number = 3

const FAUNA_SECRET: string = process.env.FAUNA_SECRET || ""

const client: faunadb.Client = new faunadb.Client({
	secret: FAUNA_SECRET,
})

export default async (_req: NowRequest, res: NowResponse) => {
	let slug: string = ""
	if (_req.query && _req.query.slug) slug = _req.query.slug.toString()
	if (_req.body && _req.body.slug) slug = _req.body.slug
	if (slug.length >= 1) {
		const response: object = await client.query(
			q.Get(q.Match(q.Index("links_by_slug"), slug))
		)
		res.status(200).json(response)
	} else {
		res.status(422).json({
			success: false,
			error: "PARAMETER_MISSING",
		})
	}
}
