import { postOffices } from "../data/dataStore";
import { PostOffice } from "../models/postOffice";

export class PostOfficeService {
  getAllPostOffices(): PostOffice[] {
    return postOffices;
  }

  getPostOfficeById(id: number): PostOffice | undefined {
    return postOffices.find((office) => office.id === id);
  }

  addPostOffice(newPostOffice: PostOffice): PostOffice {
    newPostOffice.id = postOffices.length ? postOffices[postOffices.length - 1].id + 1 : 1;
    postOffices.push(newPostOffice);
    return newPostOffice;
  }

  updatePostOffice(id: number, updatedPostOffice: Partial<PostOffice>): PostOffice | undefined {
    const postOffice = this.getPostOfficeById(id);
    if (postOffice) {
      Object.assign(postOffice, updatedPostOffice);
      return postOffice;
    }
    return undefined;
  }

  deletePostOffice(id: number): boolean {
    const index = postOffices.findIndex((office) => office.id === id);
    if (index !== -1) {
      postOffices.splice(index, 1);
      return true;
    }
    return false;
  }
}
