import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';

export function getSample(req, res) {
  res.success({
    status: StatusCodes.OK,
    info: ReasonPhrases.OK,
  });
}