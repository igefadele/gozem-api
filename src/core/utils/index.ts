/* 
=======
HELPERS
=======
*/
import { Request, Response } from 'express';

export function saveSessionAndRedirect( req: Request, res: Response, path: string) {
  req.session.save((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save session' });
    }
    res.redirect(path);
  });
}


// Function to check if any property of an object is empty or not provided
export function hasEmptyFields(data: { [x: string]: any; }) {
  for (let key in data) {
      if (data[key] === '' || data[key] === null || data[key] === undefined) {
          return true;
      }
  }
  return false;
}
