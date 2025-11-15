"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Edit, Trash2, Upload } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProductStore } from "../store/productStore";

export default function AdminDashboard() {
  const { products, addProduct, deleteProduct,editProduct } = useProductStore();
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });

  // 🖼️ handle image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setNewProduct({ ...newProduct, image: previewUrl });
    }
  };

  // 🧾 handle product add
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.image) {
      alert("Please fill all fields");
      return;
    }

    addProduct({
      id: Date.now(),
      name: newProduct.name,
      price: Number(newProduct.price),
      category: newProduct.category,
      image: newProduct.image,
    });

    setNewProduct({ name: "", price: "", category: "", image: "" });
    setPreview(null);
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Admin Dashboard
        </h1>
        <Button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Card
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md"
          >
            <div className="relative w-full h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            <CardHeader className="pb-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {product.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {product.category}
              </p>
            </CardHeader>

            <CardContent className="flex justify-between items-center">
              <p className="text-blue-600 dark:text-blue-400 font-semibold">
                ₦{product.price.toLocaleString()}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="icon"
                onClick={() => editProduct(product)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => deleteProduct(product.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ➕ Add Product Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Product Name</Label>
              <Input
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                placeholder="Enter product name"
              />
            </div>

            <div>
              <Label>Price</Label>
              <Input
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                placeholder="Enter price"
              />
            </div>

            <div>
              <Label>Category</Label>
              <Input
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                placeholder="Enter category"
              />
            </div>

            <div>
              <Label>Image</Label>
              <div className="flex items-center gap-3">
                <Input type="file" accept="image/*" onChange={handleImageChange} />
                {preview && (
                  <Image
                    src={preview}
                    alt="preview"
                    width={50}
                    height={50}
                    className="rounded-lg object-cover"
                  />
                )}
              </div>
            </div>

            <Button
              onClick={handleAddProduct}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Add Product
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
