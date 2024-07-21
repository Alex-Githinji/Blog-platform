import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const fetchBlogs = async (req, res) => {
    try {
      const blogs = await prisma.blogs.findMany();
      res.status(200).json({ success: true, blogs });
    } catch (e) {
      res.status(500).json({ success: false, message: e.message });
    }
  };