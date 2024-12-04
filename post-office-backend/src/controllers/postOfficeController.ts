import { error } from "console";
import { PostOfficeService } from "../services/postOfficeService";
import { Request, Response } from "express";
import { PostOffice } from "./../models/postOffice";

const postOfficeService = new PostOfficeService();

export const getAllPostOffices = (req: Request, res: Response) => {
  const postOffices = postOfficeService.getAllPostOffices();
  res.json(postOffices);
};

export const getPostOfficeById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const postOffice = postOfficeService.getPostOfficeById(id);
  if (postOffice) {
    res.json(postOffice);
  } else {
    res.status(404).json({ error: "Post Office not found" });
  }
};

export const addPostOffice = (req: Request, res: Response) => {
  const newPostOffice = req.body;
  const addedPostOffice = postOfficeService.addPostOffice(newPostOffice);
  res.status(201).json(addedPostOffice);
};

export const updatePostOffice = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const updatedPostOffice = postOfficeService.updatePostOffice(id, req.body);
  if (updatedPostOffice) {
    res.json(updatedPostOffice);
  } else {
    res.status(404).json({ error: "Post Office not found" });
  }
};

export const deletePostOffice = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const isDeleted = postOfficeService.deletePostOffice(id);
  if (isDeleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: "Post office not found" });
  }
};