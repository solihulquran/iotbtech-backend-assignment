import type { Request, Response } from "express";
import * as service from "../services/product.service.js";

export function getAllProducts(req: Request, res: Response) {
  const category = req.query.category;
  let products = service.findAllProducts();
  if (typeof category === "string") {
    products = products.filter((p) => p.category === category);
  }
  res.json(products);
}

export function getProductById(req: Request, res: Response) {
  const product = service.findProductById(Number(req.params.id));
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(product);
}

export function createProduct(req: Request, res: Response) {
  const { name, category, price, stock } = req.body ?? {};
  if (!name || typeof price !== "number") {
    res.status(400).json({ error: "name and price are required" });
    return;
  }
  const product = service.createProduct({ name, category, price, stock });
  res.status(201).json(product);
}

export function updateProduct(req: Request, res: Response) {
  const product = service.updateProduct(Number(req.params.id), req.body);
  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json(product);
}

export function deleteProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!service.deleteProduct(id)) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.json({ deleted: true, id });
}