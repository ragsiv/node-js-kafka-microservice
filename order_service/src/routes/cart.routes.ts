import express, { NextFunction, Request, Response } from "express";
import * as service from "../service/cart.service";
import * as repository from "../repository/cart.repository";
import { ValidateRequest } from "../utils/validator";
import { CartRequestInput, CartRequestSchema } from "../dto/cartRequest.dto";

const router = express.Router();
const repo = repository.CartRepository;

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // jwt
  const isValidUser = true;
  if (!isValidUser) {
    res.status(403).json({ error: "authorization error" });
  }
  next();
};

router.use(authMiddleware);

router.post(
  "/cart",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const err = ValidateRequest<CartRequestInput>(
        req.body,
        CartRequestSchema
      );

      if (err) {
        res.status(404).json({ err });
      }
      const input: CartRequestInput = req.body;

      const response = await service.CreateCart(
        {
          ...input,
          customerId: 4,
        },
        repo
      );

      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ error });
    }
  }
);

router.get("/cart", async (req: Request, res: Response, next: NextFunction) => {
  // comes from our auth user parsed from JWT
  const response = await service.GetCart(req.body.customerId, repo);

  res.status(200).json({ message: "create cart" });
});

router.patch(
  "/cart/:lineItemId",
  async (req: Request, res: Response, next: NextFunction) => {
    const lineItemId = req.params.id;
    const response = await service.EditCart(
      {
        id: +lineItemId,
        qty: req.body.qty,
      },
      repo
    );

    res.status(200).json({ message: "create cart" });
  }
);

router.delete(
  "/cart/:lineItemId",
  async (req: Request, res: Response, next: NextFunction) => {
    const lineItemId = req.params.id;
    const response = await service.DeleteCart(+lineItemId, repo);

    res.status(200).json({ message: "create cart" });
  }
);

export default router;
