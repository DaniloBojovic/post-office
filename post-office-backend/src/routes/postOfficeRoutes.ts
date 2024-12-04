import express from "express";
import {
  addPostOffice,
  deletePostOffice,
  getAllPostOffices,
  getPostOfficeById,
  updatePostOffice,
} from "../controllers/postOfficeController";

const router = express.Router();

// Placeholder for route
// router.get("/", (req, res) => {
//   res.send("Post Office routes placeholder");
// });

router.get("/", getAllPostOffices);
router.get("/:id", getPostOfficeById);
router.post("/", addPostOffice);
router.put("/:id", updatePostOffice);
router.delete("/:id", deletePostOffice);

export default router;
