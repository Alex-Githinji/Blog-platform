import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const CreateBlog = async (req, res) => {
  try {
    const { title, summary, Author } = req.body;
    const blog = await prisma.blogs.create({
      data: {
        title: title,
        summary: summary,
        Author: Author,
      
      },
    });
    res.status(201).json({ success: true, message: "Blog created successfully", blog });
  } catch (e) {
    res.status(500).json({ success: false,  message: e.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;  

    const deletedBlog = await prisma.blogs.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({ success: true, message: "Blog deleted successfully", deletedBlog });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const deleteAllBlogs = async (req, res) => {
  try {
    const deletedBlogs = await prisma.blogs.deleteMany({});

    res.status(200).json({ success: true, message: "All blogs deleted successfully", deletedCount: deletedBlogs.count });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};


export const editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, Author } = req.body;

    const updatedBlog = await prisma.blogs.update({
      where: {
        id: id,
      }, 
      data: {
        title,
        content,
        Author,
      },
    });

    res.status(200).json({ success: true, message: "Blog updated successfully", updatedBlog });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};





