import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const minPrice = parseFloat(searchParams.get("minPrice"));
  const maxPrice = parseFloat(searchParams.get("maxPrice"));
  const minRating = parseFloat(searchParams.get("minRating"));

  const query = {};

  if (category) query.category = category;
  if (!isNaN(minPrice)) query.price = { ...query.price, $gte: minPrice };
  if (!isNaN(maxPrice)) query.price = { ...query.price, $lte: maxPrice };

  // Step 1: Fetch matching products
  const products = await Product.find(query).lean({ virtuals: true });

  // Step 2: Filter by averageRating manually
  const filteredProducts = !isNaN(minRating)
    ? products.filter((product) => {
        const sum = product.ratings.reduce((acc, r) => acc + r.value, 0);
        const avg = product.ratings.length ? sum / product.ratings.length : 0;
        return avg >= minRating;
      })
    : products;

  return Response.json(filteredProducts);
}
