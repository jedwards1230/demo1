// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		return await createInquiry(req, res);
	} else {
		return res
			.status(405)
			.json({ message: "Method not allowed", success: false });
	}
}

async function createInquiry(req: NextApiRequest, res: NextApiResponse) {
	const body = req.body;
	/* body looks like this: `
	----------------------------187080329276215355962332
Content-Disposition: form-data; name="title"

RecipeTitle
----------------------------187080329276215355962332--
	`
	const title = body.title; // ! returns  undefined

	I need const title = "RecipeTitle"
	parse this from req.body
	*/
	const title = body.title;
	console.log("title", title);
	try {
		const newEntry = await prisma.recipe.create({
			data: {
				//id: body.id,
				title: title,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		});
		return res.status(200).json({ recipe: newEntry, success: true });
	} catch (error) {
		console.error("Request error", error);
		res.status(500).json({
			error: "Error creating question",
			success: false,
		});
	}
}
