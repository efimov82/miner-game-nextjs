// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { winnersData } from "../../src/mocks/topData";
import { Winner } from "../../src/models";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      getTopData(req, res);
      break;
    case "POST":
      saveNewTop(req, res);
      break;
    default:
      res.status(400);
  }
}

function getTopData(req: NextApiRequest, res: NextApiResponse<Winner[]>) {
  let sortedData = winnersData.sort(
    (a: Winner, b: Winner): number => {
      return b.timestamp > a.timestamp ? 1 : -1;
    }
  );

  if (req.query.count) {
    sortedData = sortedData.slice(0, Number(req.query.count));
  }

  res.status(200).json(sortedData);
}

function saveNewTop(req: NextApiRequest, res: NextApiResponse) {
  res.status(201);
  //TODO add
}
