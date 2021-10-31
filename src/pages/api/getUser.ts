import { supabase } from "services/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user, error } = await supabase.auth.api.getUserByCookie(req);

  if (user) {
    res.status(200).json({ user });
  } else {
    res.status(200).json({ error });
  }
}
