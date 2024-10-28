import express, { NextFunction, Request, Response } from "express";
import { CatalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { RequestValidator } from "../utils/requestValidator";
import { CreateProductRequest, updateProductRequest } from "../dto/product.dto";

const router = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());

// endpoints
router.post("/products", async (req: Request, res: Response) => {
  try {
    const { errors, input } = await RequestValidator(
      CreateProductRequest,
      req.body
    );

    if (errors) res.status(400).json(errors);

    const data = await catalogService.createProduct(input);

    res.status(201).json(data);
  } catch (error) {
    const err = error as Error;

    res.status(500).json();
  }
});

router.patch("/products/:id", async (req: Request, res: Response) => {
  try {
    const { errors, input } = await RequestValidator(
      updateProductRequest,
      req.body
    );

    const id = parseInt(req.params.id) || 0;

    if (errors) res.status(400).json(errors);

    const data = await catalogService.updateProduct({ id, ...input });

    res.status(200).json(data);
  } catch (error) {
    const err = error as Error;

    res.status(500).json();
  }
});

router.get("/products", async (req: Request, res: Response) => {
  const limit = Number(req.query["limit"]);
  const offset = Number(req.query["offset"]);

  try {
    const data = await catalogService.getProducts(limit, offset);

    res.status(200).json(data);
  } catch (error) {
    const err = error as Error;

    res.status(500).json();
  }
});

router.get("/products/:id", async (req: Request, res: Response, next) => {
  try {
    const id = parseInt(req.params.id) || 0;

    const data = await catalogService.getProduct(id);

    res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
});

router.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id) || 0;

    const data = await catalogService.deleteProduct(id);

    res.status(200).json(data);
  } catch (error) {
    const err = error as Error;

    res.status(500).json();
  }
});
export default router;
